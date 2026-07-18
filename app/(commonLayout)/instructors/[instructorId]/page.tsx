export default async function InstructorDetailPage({ params }: { params: Promise<{ instructorId: string }> }) {
  const { instructorId } = await params
  return <div>Instructor Detail: {instructorId}</div>
}
