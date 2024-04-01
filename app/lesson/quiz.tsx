"use client"

import { challengeOptions, challenges, userSubscription } from "@/db/schema"
import { useState, useTransition } from "react"
import { Header } from "./header"
import { QuestionBubble } from "./question-bubble"
import { Challenge } from "./challenge"
import { Footer } from "./footer"
import { upsertChallengeProgress } from "@/actions/challenge-progress"
import { toast } from "sonner"
import { reduceEggs } from "@/actions/user-progress"
import { useAudio, useWindowSize, useMount } from "react-use"
import Image from "next/image"
import { ResultCard } from "./result-card"
import { useRouter } from "next/navigation"
import Confetti from "react-confetti"
import { useEggsModal } from "@/store/use-eggs-modal"
import { usePracticeModal } from "@/store/use-practice-modal"

type Props = {
  initalLessonId: number
  initialPercentage: number
  initialEggs: number
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean
    challengeOptions: (typeof challengeOptions.$inferSelect)[]
  })[]
  userSubscription: typeof userSubscription.$inferSelect & {
    isActive: boolean
  } | null
}

export const Quiz = ({
  initalLessonId,
  initialPercentage,
  initialEggs,
  initialLessonChallenges,
  userSubscription,
}: Props) => {
  const { open: openEggsModal } = useEggsModal()
  const { open: openPracticeModal } = usePracticeModal()

  useMount(() => {
    if(initialPercentage === 100) {
      openPracticeModal()
    }
  })

  const { width, height } = useWindowSize()

  const router = useRouter()

  const [finishAudio] = useAudio({ src: "/finish.mp3", autoPlay: true })
  const [correctAudio, _c, correctControls] = useAudio({ src: "/correct.wav" })
  const [incorrectAudio, _i, incorrectControls] = useAudio({
    src: "/incorrect.wav",
  })
  const [pending, startTransition] = useTransition()

  const [lessonId] = useState(initalLessonId)
  const [eggs, setEggs] = useState(initialEggs)
  const [percentage, setPercentage] = useState(() => {
    return initialPercentage === 100 ? 0 : initialPercentage
  })
  const [challenges] = useState(initialLessonChallenges)
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed
    )
    return uncompletedIndex === -1 ? 0 : uncompletedIndex
  })

  const [selectedOption, setSelectedOption] = useState<number>()
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none")

  const challenge = challenges[activeIndex]
  const options = challenge?.challengeOptions ?? []

  const onNext = () => {
    setActiveIndex((current) => current + 1)
  }

  const onSelect = (id: number) => {
    if (status !== "none") return

    setSelectedOption(id)
  }

  const onContinue = () => {
    if (!selectedOption) return

    if (status === "wrong") {
      setStatus("none")
      setSelectedOption(undefined)
      return
    }

    if (status === "correct") {
      onNext()
      setStatus("none")
      setSelectedOption(undefined)
      return
    }

    const correctOption = options.find((option) => option.correct)

    if (!correctOption) return

    if (correctOption && correctOption.id === selectedOption) {
      startTransition(() => {
        upsertChallengeProgress(challenge.id)
          .then((response) => {
            if (response?.error === "eggs") {
              openEggsModal()
              return
            }

            correctControls.play()
            setStatus("correct")
            setPercentage((prev) => prev + 100 / challenges.length)

            if (initialPercentage === 100) {
              setEggs((prev) => Math.min(prev + 1, 5))
            }
          })
          .catch(() => toast.error("Something went wrong. Please try again."))
      })
    } else {
      startTransition(() => {
        reduceEggs(challenge.id)
          .then((response) => {
            if (response?.error === "eggs") {
              openEggsModal()
              return
            }

            incorrectControls.play()
            setStatus("wrong")

            if (!response?.error) {
              setEggs((prev) => Math.max(prev - 1, 0))
            }
          })
          .catch(() => toast.error("Something went wrong. Please try again."))
      })
    }
  }

  // todo: remove true
  if (!challenge) {
    return (
      <>
        {finishAudio}
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          tweenDuration={10000}
        />
        <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
          <Image
            src="finish.svg"
            alt="Finish"
            className="hidden lg:block"
            height={400}
            width={400}
          />
          <Image
            src="finish.svg"
            alt="Finish"
            className="lg:hidden block"
            height={200}
            width={200}
          />
          <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
            Great job! <br /> You&apos;ve completed the lesson
          </h1>
          <div className="flex items-center gap-x-4 w-full">
            <ResultCard variant="points" value={challenges.length * 10} />
            <ResultCard variant="eggs" value={eggs} />
          </div>
        </div>
        <Footer
          lessonId={lessonId}
          status="completed"
          onCheck={() => router.push("/learn")}
        />
      </>
    )
  }

  const title =
    challenge.type === "ASSIST"
      ? "Select the relevant answer"
      : challenge.question

  return (
    <>
      {correctAudio}
      {incorrectAudio}
      <Header
        eggs={eggs}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />
      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
            <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
              {title}
            </h1>
            <div>
              {challenge.type === "ASSIST" && (
                <QuestionBubble question={challenge.question} />
              )}
              <Challenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={pending}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer
        disabled={pending || !selectedOption}
        status={status}
        onCheck={onContinue}
      />
    </>
  )
}
