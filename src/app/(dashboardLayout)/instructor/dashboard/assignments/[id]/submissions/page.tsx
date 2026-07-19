export default async function AssignmentSubmissionsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <div>Assignment Submissions: {id}</div>
}
