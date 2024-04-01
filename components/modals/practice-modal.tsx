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
import { usePracticeModal } from "@/store/use-practice-modal"

export const PracticeModal = () => {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const { isOpen, close } = usePracticeModal()

  useEffect(() => setIsClient(true), [])

  if (!isClient) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center w-full justify-center">
            <Image src="/practice-egg.jpeg" alt="Egg" height={200} width={200} />
          </div>
          <DialogTitle className="text-center font-bold text-2xl">
            Practice lesson
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Use practice lessons to regain eggs and points. You cannot lose eggs or points in practice lessons.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              className="w-full"
              variant="primary"
              size="lg"
              onClick={close}
            >
              I understand
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
