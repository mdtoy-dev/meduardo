"use server"

import { POINTS_TO_REFILL } from "@/constants"
import db from "@/db/drizzle"
import {
  getCourseById,
  getUserProgress,
  getUserSubscription,
} from "@/db/queries"
import { challengeProgress, challenges, userProgress } from "@/db/schema"
import { auth, currentUser } from "@clerk/nextjs"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const upsertUserProgress = async (courseId: number) => {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId || !user) {
    throw new Error("Unauthorized")
  }

  const course = await getCourseById(courseId)

  if (!course) {
    throw new Error("Course not found")
  }

  if (!course.units.length || !course.units[0].lessons.length) {
    throw new Error("Course is empty")
  }

  const existingUserProgress = await getUserProgress()

  if (existingUserProgress) {
    await db.update(userProgress).set({
      activeCourseId: courseId,
      userName: user.firstName || "User",
      userImageSrc: user.imageUrl || "/meduardo-logo.svg",
    })

    revalidatePath("/courses")
    revalidatePath("/learn")
    redirect("/learn")
  }

  await db.insert(userProgress).values({
    userId,
    activeCourseId: courseId,
    userName: user.firstName || "User",
    userImageSrc: user.imageUrl || "/meduardo-logo.svg",
  })

  revalidatePath("/courses")
  revalidatePath("/learn")
  redirect("/learn")
}

export const reduceEggs = async (challengeId: number) => {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  const currentUserProgress = await getUserProgress()
  const userSubscription = await getUserSubscription()

  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeId)
    ),
  })

  const isPractice = !!existingChallengeProgress

  if (isPractice) {
    return { error: "practice" }
  }

  if (!currentUserProgress) {
    throw new Error("User progress not found")
  }

  if (userSubscription?.isActive) {
    return { error: "subscription" }
  }

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  })

  if (!challenge) {
    throw new Error("Challenge not found")
  }

  const lessonId = challenge.lessonId

  if (currentUserProgress.eggs === 0) {
    return { error: "eggs" }
  }

  await db
    .update(userProgress)
    .set({
      eggs: Math.max(currentUserProgress.eggs - 1, 0),
    })
    .where(eq(userProgress.userId, userId))

  revalidatePath("/shop")
  revalidatePath("/learn")
  revalidatePath("/quests")
  revalidatePath("/leaderboard")
  revalidatePath(`/lesson/${lessonId}`)
}

export const refillEggs = async () => {
  const currentUserProgress = await getUserProgress()

  if (!currentUserProgress) {
    throw new Error("User progress not found.")
  }

  if (currentUserProgress.eggs === 5) {
    throw new Error("Eggs are already full")
  }

  if (currentUserProgress.points < POINTS_TO_REFILL) {
    throw new Error("Not enough points")
  }

  await db
    .update(userProgress)
    .set({
      eggs: 5,
      points: currentUserProgress.points - POINTS_TO_REFILL,
    })
    .where(eq(userProgress.userId, currentUserProgress.userId))

  revalidatePath("/shop")
  revalidatePath("/learn")
  revalidatePath("/quests")
  revalidatePath("/leaderboard")
}
