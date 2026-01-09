export default function BookingLoading() {
  return (
    <div className="min-h-screen bg-bg-light py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="h-10 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
        </div>
        
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <div className="space-y-6">
            <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-32 bg-gray-200 rounded-2xl animate-pulse"></div>
              <div className="h-32 bg-gray-200 rounded-2xl animate-pulse"></div>
              <div className="h-32 bg-gray-200 rounded-2xl animate-pulse"></div>
              <div className="h-32 bg-gray-200 rounded-2xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
