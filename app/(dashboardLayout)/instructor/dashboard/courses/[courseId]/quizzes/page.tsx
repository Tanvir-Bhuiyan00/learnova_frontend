export default async function CourseQuizzesPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params
  return <div>Course Quizzes: {courseId}</div>
}
