import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"
import { InfinityIcon } from "lucide-react"

export const Promo = () => {
  return (
    <div className="border-2 rounded-xl p-4 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-x-6">
          <Image src="/pro.png" alt="Pro" width={80} height={80} />
          <h3 className="font-bold text-lg">Upgrade to Pro</h3>
          <InfinityIcon className="text-rose-500 ml-1"/>
        </div>
        <p className="text-muted-foreground text-center">Get unlimited eggs and more!</p>
      </div>
      <Button variant="super" className="w-full" size="lg" asChild>
        <Link href="/shop">Upgrade today</Link>
      </Button>
    </div>
  )
}
