import EmptyState from "@/components/EmptyState"

const Page = async () => {
  return (
    <div className="hidden md:block md:pl-80 h-screen">
      <EmptyState />
    </div>
  )
}

export default Page
