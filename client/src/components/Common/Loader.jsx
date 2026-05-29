const Loader = ({ size = 'md', fullScreen = false, text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24'
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center">
      <div className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizeClasses[size]}`}></div>
      {text && <p className="mt-4 text-gray-600">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

// Skeleton loader for transactions
export const TransactionSkeleton = () => {
  return (
    <div className="animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center justify-between p-4 border-b">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
      ))}
    </div>
  );
};

// Skeleton loader for charts
export const ChartSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-64 bg-gray-200 rounded-lg"></div>
    </div>
  );
};

// Skeleton loader for cards
export const CardSkeleton = () => {
  return (
    <div className="animate-pulse bg-white rounded-lg shadow-md p-6">
      <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
      <div className="h-8 bg-gray-200 rounded w-32 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-40"></div>
    </div>
  );
};

export default Loader;