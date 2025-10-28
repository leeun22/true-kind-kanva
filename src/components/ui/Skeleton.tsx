export function Skeleton() {
  return (
    <div className="flex gap-8">
      <div className="w-72 h-96 bg-gray-200 rounded-lg animate-pulse" />
      <div className="flex-1">
        <div className="h-8 w-64 bg-gray-200 rounded mb-4 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-200 h-96 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}
