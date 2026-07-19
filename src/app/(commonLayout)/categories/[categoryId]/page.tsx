export default async function CategoryDetailPage({ params }: { params: Promise<{ categoryId: string }> }) {
  const { categoryId } = await params
  return <div>Category Detail: {categoryId}</div>
}
