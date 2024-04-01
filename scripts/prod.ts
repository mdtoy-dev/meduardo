import "dotenv/config"
import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"

import * as schema from "../db/schema"

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql, { schema })

const main = async () => {
  try {
    console.log("Seeding database")

    // Delete all existing data
    await Promise.all([
      db.delete(schema.userProgress),
      db.delete(schema.challenges),
      db.delete(schema.units),
      db.delete(schema.lessons),
      db.delete(schema.courses),
      db.delete(schema.challengeOptions),
      db.delete(schema.userSubscription),
    ])

    // Insert courses
    const courses = await db
      .insert(schema.courses)
      .values([{ title: "Biochemistry", imageSrc: "/biochemistry.jpg" }])
      .returning()

    // For each course, insert units
    for (const course of courses) {
      const units = await db
        .insert(schema.units)
        .values([
          {
            courseId: course.id,
            title: "Unit 1",
            description: "Biomolecules",
            order: 1,
          },
          {
            courseId: course.id,
            title: "Unit 2",
            description: "Cells",
            order: 2,
          },
        ])
        .returning()

      // For each unit, insert lessons
      for (const unit of units) {
        const lessons = await db
          .insert(schema.lessons)
          .values([
            { unitId: unit.id, title: "Amino acids and proteins", order: 1 },
            {
              unitId: unit.id,
              title: "Enzyme structure and function",
              order: 2,
            },
            { unitId: unit.id, title: "Enzyme kinetics", order: 3 },
            { unitId: unit.id, title: "DNA", order: 4 },
            { unitId: unit.id, title: "Genetics", order: 5 },
          ])
          .returning()

        // For each lesson, insert challenges
        for (const lesson of lessons) {
          const challenges = await db
            .insert(schema.challenges)
            .values([
              {
                lessonId: lesson.id,
                type: "SELECT",
                question:
                  'A polypeptide with a net positive charge at physiologic pH (~7.4) most likely contains amino acids with R groups of what type?"?',
                order: 1,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question:
                  'The unique cyclic structure of which of the following amino acids plays a central role in the formation of alpha helices and beta sheets?"?',
                order: 2,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question:
                  'The alpha helix is an example of which of the following structural properties of proteins?"?',
                order: 3,
              },
            ])
            .returning()

          // For each challenge, insert challenge options
          for (const challenge of challenges) {
            if (challenge.order === 1) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Acidic R groups",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Basic R groups",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Aliphatic R groups",
                },
              ])
            }

            if (challenge.order === 2) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Arginine",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Proline",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Lysine",
                },
              ])
            }

            if (challenge.order === 3) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "tertiary structure",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "primary structure",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "secondary structure",
                },
              ])
            }
          }
        }
      }
    }
    console.log("Database seeded successfully")
  } catch (error) {
    console.error(error)
    throw new Error("Failed to seed database")
  }
}

main()
