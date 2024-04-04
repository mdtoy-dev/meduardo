'use client'

import { Button } from "@/components/ui/button"
import { lessons } from "@/db/schema"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

type Props = {
  courseName: string | undefined
  unitName: string | undefined
  lessonNames: string[]
  contents: (string | null)[]
}

const Content = ({ courseName, unitName, lessonNames, contents }: Props) => {
  const [topic, setTopic] = useState<string>(lessonNames[0])
  const [content, setContent] = useState<string | null>(contents[0])


  const handleClick = (index: number) => {
    setTopic(lessonNames[index])
    setContent(contents[index])
  }

  return (
    <>
      <div className="sticky top-0 bg-white pb-3 pt-3 flex items-center justify-between border-b-2 text-neutral-700 lg:z-50">
        <Link href="/learn">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-5 w-5 stroke-2 text-neutral-400" />
          </Button>
        </Link>
        <h1 className="font-bold text-lg">
          {courseName} -{" "}
          <span className="text-indigo-600 font-semibold">{unitName}</span>
        </h1>
        <div />
      </div>
      <div className="flex w-full flex-wrap">
        {lessonNames.map((lesson, index) => (
          <Button
            variant={topic === lesson ? "super" : "default"}
            onClick={() => handleClick(index)}
            key={index}
          >
            {lesson}
          </Button>
        ))}
      </div>
      <div className="lg:px-[256px] h-full pt-[25px] lg:pt-0">
        <div className="max-w-[1056px] mx-auto lg:pt-6 h-full">
          <p className="px-2">{content}</p>
        </div>
      </div>
    </>
  )
}
export default Content
