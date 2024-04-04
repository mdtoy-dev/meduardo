import Link from "next/link"
import { Button } from "./ui/button"
import Image from "next/image"
import { InfinityIcon } from "lucide-react"
import { courses } from "@/db/schema"

type Props = {
  activeCourse: typeof courses.$inferSelect
  eggs: number
  points: number
  hasActiveSubscription: boolean
}

export const UserProgress = ({
  activeCourse,
  points,
  eggs,
  hasActiveSubscription,
}: Props) => {
  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      <div className="flex align-baseline">
        <Link href="/courses">
          <Button variant="ghost" size="xl">
            <Image
              src={activeCourse.imageSrc}
              alt={activeCourse.title}
              className="rounded-md border -m-6"
              width={200}
              height={200}
            />
          </Button>
        </Link>
        <Link href="/shop">
          <Button variant="ghost" size="xl" className="text-orange-500">
            <Image
              src="/points.png"
              height={100}
              width={100}
              alt="points"
              className="m-2"
            />
            <p className="text-xl ml-1">{points}</p>
          </Button>
        </Link>
        <Link href="/shop">
          <Button variant="ghost" size="xl" className="text-rose-500">
            <Image
              src="/egg.png"
              height={130}
              width={130}
              alt="eggs"
              className="-m-2"
            />
            {hasActiveSubscription ? (
              <p className="text-xl"><InfinityIcon className="h-6 w-6 stroke-[3] ml-2.5" /></p>
            ) : (
              <p className="text-xl">{eggs}</p>
            )}
          </Button>
        </Link>
      </div>
    </div>
  )
}
