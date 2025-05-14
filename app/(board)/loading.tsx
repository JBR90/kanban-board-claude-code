export default function BoardLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="h-8 w-40 rounded-md bg-gray-200 animate-pulse" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {/* Loading skeletons for columns */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div 
            key={i} 
            className="flex flex-col bg-gray-50 rounded-lg p-4 min-h-[500px] w-full border"
          >
            <div className="flex items-center justify-between pb-4 border-b mb-4">
              <div className="h-6 w-24 rounded-md bg-gray-200 animate-pulse" />
              <div className="h-5 w-5 rounded-full bg-gray-200 animate-pulse" />
            </div>
            
            <div className="flex flex-col gap-2">
              {Array.from({ length: i + 1 }).map((_, j) => (
                <div 
                  key={j} 
                  className="bg-white p-4 rounded-md shadow-sm border h-20 flex flex-col gap-2 animate-pulse"
                >
                  <div className="h-4 w-3/4 rounded-md bg-gray-200" />
                  <div className="h-8 w-full rounded-md bg-gray-100" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}