// import "dotenv/config"
// import { neon } from "@neondatabase/serverless"
// import { drizzle } from "drizzle-orm/neon-http"

// import * as schema from "../db/schema"

// const sql = neon(process.env.DATABASE_URL!)
// const db = drizzle(sql, { schema })

// const main = async () => {
//   try {
//     console.log("Seeding database")

//     await db.delete(schema.courses)
//     await db.delete(schema.userProgress)
//     await db.delete(schema.units)
//     await db.delete(schema.lessons)
//     await db.delete(schema.challenges)
//     await db.delete(schema.challengeOptions)
//     await db.delete(schema.challengeProgress)
//     await db.delete(schema.userSubscription)

//     await db.insert(schema.courses).values([
//       {
//         id: 1,
//         title: "Cell Biology",
//         imageSrc: "/cell-biology.jpg",
//       },
//       {
//         id: 2,
//         title: "Biochemistry",
//         imageSrc: "/biochemistry.jpg",
//       },
//       {
//         id: 3,
//         title: "Microbiology",
//         imageSrc: "/microbiology.jpg",
//       },
//       {
//         id: 4,
//         title: "Physiology",
//         imageSrc: "/physiology.jpg",
//       },
//       {
//         id: 5,
//         title: "Pharmacology",
//         imageSrc: "/pharmacology.jpg",
//       },
//       {
//         id: 6,
//         title: "Anatomy",
//         imageSrc: "/anatomy.jpg",
//       },
//       {
//         id: 7,
//         title: "Immunology",
//         imageSrc: "/immunology.jpg",
//       },
//     ])

//     await db.insert(schema.units).values([
//       {
//         id: 1,
//         courseId: 1,
//         title: "Unit 1",
//         description: "Learn the basics of Cell Biology",
//         order: 1,
//       },
//     ])

//     await db.insert(schema.lessons).values([
//       {
//         id: 1,
//         unitId: 1,
//         order: 1,
//         title: "Introduction to cell",
//       },
//       {
//         id: 2,
//         unitId: 1,
//         order: 2,
//         title: "Eukaryotic cells",
//       },
//       {
//         id: 3,
//         unitId: 1,
//         order: 3,
//         title: "Endoplasmic reticulum and Golgi bodies",
//       },
//       {
//         id: 4,
//         unitId: 1,
//         order: 4,
//         title: "Mitochondria and Chloroplast",
//       },
//       {
//         id: 5,
//         unitId: 1,
//         order: 5,
//         title: "Cell structure and functions",
//       },
//     ])

//     await db.insert(schema.challenges).values([
//       {
//         id: 1,
//         lessonId: 1,
//         type: "SELECT",
//         order: 1,
//         question: "What is the most basic unit of life?",
//       },
//       {
//         id: 2,
//         lessonId: 1,
//         type: "ASSIST",
//         order: 2,
//         question: "Ribosomes produces -> ?",
//       },
//     ])
//     await db.insert(schema.challenges).values([
//       {
//         id: 3,
//         lessonId: 2,
//         type: "SELECT",
//         order: 1,
//         question: "What is the most basic unit of life?",
//       },
//       {
//         id: 4,
//         lessonId: 2,
//         type: "ASSIST",
//         order: 2,
//         question: "Ribosomes produces -> ?",
//       },
//     ])

//     await db.insert(schema.challengeOptions).values([
//       {
//         challengeId: 1,
//         imageSrc: "/cell-biology.jpg",
//         correct: true,
//         text: "Cell",
//       },
//       {
//         challengeId: 1,
//         imageSrc: "/dna.jpg",
//         correct: false,
//         text: "DNA",
//       },
//       {
//         challengeId: 1,
//         imageSrc: "/protein.jpg",
//         correct: false,
//         text: "Protein",
//       },
//     ])

//     await db.insert(schema.challengeOptions).values([
//       {
//         challengeId: 2,
//         correct: false,
//         text: "Cell membrane",
//       },
//       {
//         challengeId: 2,
//         correct: false,
//         text: "RNA",
//       },
//       {
//         challengeId: 2,
//         correct: true,
//         text: "Protein",
//       },
//     ])
//   } catch (error) {
//     console.log(error)
//     throw new Error("Failed to seed the database")
//   }
// }

// main()
