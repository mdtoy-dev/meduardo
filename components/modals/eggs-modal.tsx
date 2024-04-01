"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { useEggsModal } from "@/store/use-eggs-modal"

export const EggsModal = () => {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const { isOpen, close } = useEggsModal()

  useEffect(() => setIsClient(true), [])

  const onClick = () => {
    close()
    router.push('/store')
  }

  if (!isClient) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center w-full justify-center">
            <Image
              src="/meduardo-bad.png"
              alt="Meduardo bad"
              height={200}
              width={200}
            />
          </div>
          <DialogTitle className="text-center font-bold text-2xl">
            You cracked all the eggs!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Get Pro for unlimited eggs, or purchase them in the store
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              className="w-full"
              variant="primary"
              size="lg"
              onClick={onClick}
            >
              Get unlimited eggs
            </Button>
            <Button
              className="w-full"
              variant="primaryOutline"
              size="lg"
              onClick={close}
            >
              No thanks
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
