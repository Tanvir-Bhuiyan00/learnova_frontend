export default async function CourseCurriculumPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params
  return <div>Course Curriculum: {courseId}</div>
}
