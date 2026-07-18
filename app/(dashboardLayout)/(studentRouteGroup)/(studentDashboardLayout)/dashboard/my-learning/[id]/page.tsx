export default async function MyLearningDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <div>My Learning Detail: {id}</div>
}
