"use client"

import { refillEggs } from "@/actions/user-progress"
import { createStripeUrl } from "@/actions/user-subscription"
import { Button } from "@/components/ui/button"
import { POINTS_TO_REFILL } from "@/constants"
import Image from "next/image"
import { useTransition } from "react"
import { toast } from "sonner"

type Props = {
  eggs: number
  points: number
  hasActiveSubscription: boolean
}

export const Items = ({ eggs, points, hasActiveSubscription }: Props) => {
  const [pending, startTransition] = useTransition()

  const onRefillEggs = () => {
    if(pending || eggs === 5 || points < POINTS_TO_REFILL) {
      return
    }

    startTransition(() => {
      refillEggs().catch(() => toast.error('Something went wrong'))
    })
  }

  const onUpgrade = () => {
    startTransition(() => {
      createStripeUrl().then((response) => {
        if(response.data) {
          window.location.href = response.data
        }
      }).catch(() => toast.error('Something went wrong'))
    })
  }
 
  return (
    <ul className="w-full">
      <div className="w-full flex items-center p-4 gap-x-4 border-t-2">
        <Image src="/egg.png" alt="Egg" width={60} height={60} />
        <div className="flex-1">
          <p className="text-neutral-700 ml-5 text-base lg:text-xl font-bold">
            Collect egg
          </p>
        </div>
        <Button
          onClick={onRefillEggs}
          disabled={pending || eggs === 5 || points < POINTS_TO_REFILL}
        >
          {eggs === 5 ? (
            "full"
          ) : (
            <div className="flex items-center">
              <Image src="/points.png" alt="points" width={20} height={20} />
              <p className="ml-1.5">{POINTS_TO_REFILL}</p>
            </div>
          )}
        </Button>
      </div>
      <div className="flex items-center w-full pt-2 gap-x-4 border-t-2">
        <Image
          src="/practice-egg.jpeg"
          alt="Unlimited Egg"
          width={100}
          height={100}
        />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Unlimited eggs
          </p>
        </div>
        <Button onClick={onUpgrade} disabled={pending}>
          {hasActiveSubscription ? 'settings' : 'upgrade'}
        </Button>
      </div>
    </ul>
  )
}
