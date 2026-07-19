export default async function QuizDetailPage({ params }: { params: Promise<{ courseId: string; quizId: string }> }) {
  const { courseId, quizId } = await params
  return <div>Quiz Detail: {quizId} for Course: {courseId}</div>
}
