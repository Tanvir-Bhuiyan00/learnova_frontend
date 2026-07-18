export default async function CourseLearnPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params
  return <div>Course Learn: {courseId}</div>
}
