export default function DashboardViewerWelcome() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 text-center">
        <svg
          className="mx-auto h-12 w-12 text-blue-500 mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9.75 17L15 12l-5.25-5M21 12H3"
          />
        </svg>
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          Welcome to Your Dashboards Viewer
        </h2>
        <p className="text-gray-600">
          You don’t have permission to manage users, but feel free to explore your dashboards!
        </p>
      </div>
    </div>
  );
}
