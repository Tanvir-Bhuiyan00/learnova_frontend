export default async function TakeQuizPage({ params }: { params: Promise<{ courseId: string; quizId: string }> }) {
  const { courseId, quizId } = await params
  return <div>Take Quiz: {quizId} for Course: {courseId}</div>
}
