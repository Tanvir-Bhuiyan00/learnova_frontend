export default async function EditCoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params
  return <div>Edit Course: {courseId}</div>
}
