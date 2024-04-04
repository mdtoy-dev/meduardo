import { getLessonsFromUnit, getUnits, getUserProgress } from "@/db/queries"
import Content from "./content"

type Props = {
  params: {
    contentTitle: string
  }
}

const ContentPage = async ({ params }: Props) => {

  const userProgressData = getUserProgress()
  const unitsData = getUnits()
  const lessonsData = getLessonsFromUnit(params)

  const [userProgress, lessons, units] = await Promise.all([
    userProgressData,
    lessonsData,
    unitsData
  ])
  
   const unit = (await units).find(
     (unit: { title: string }) => unit.title === params.contentTitle
   )

  const contents = unit!.lessons.map((lesson) => lesson.content)
    

  return (
    <Content courseName={userProgress?.activeCourse?.title} unitName={unit?.description} lessonNames={lessons} contents={contents} />
  )
}
export default ContentPage
