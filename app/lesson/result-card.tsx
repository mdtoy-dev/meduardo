import { cn } from "@/lib/utils"
import Image from "next/image"

type Props = {
  value: number
  variant: "points" | "eggs"
}

export const ResultCard = ({ value, variant }: Props) => {
  const imageSrc = variant === 'eggs' ? '/egg.png' : '/points.png'

  return (
    <div
      className={cn(
        "rounded-2xl border-2 w-full",
        variant === "points" && "bg-orange-400 border-orange-400",
        variant === "eggs" && "bg-rose-400 border-rose-400"
      )}
    >
      <div
        className={cn(
          "p-1.5 text-white rounded-t-xl font-bold text-center uppercase text-xs",
          variant === "eggs" && "bg-rose-500",
          variant === "points" && "bg-orange-500"
        )}
      >
        {variant === "eggs" ? "Eggs Left" : "Total Points"}
      </div>
      <div
        className={cn(
          "rounded-2xl bg-white items-center flex justify-center p-6 font-bold text-lg",
          variant === "points" && "text-orange-500",
          variant === "eggs" && "text-rose-500"
        )}
      >
        <Image src={imageSrc} alt='Icon' height={50} width={50} className="mr-1.5" />
        {value}
      </div>
    </div>
  )
}
