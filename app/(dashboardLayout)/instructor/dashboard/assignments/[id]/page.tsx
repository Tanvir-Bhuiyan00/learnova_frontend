export default async function AssignmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <div>Assignment Detail: {id}</div>
}
