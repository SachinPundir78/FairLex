import React from 'react'

const ArticelDetailLoadingScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-white-50 to-yellow-100 dark:from-black dark:to-black">
      <div className="text-center flex flex-col items-center">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 dark:border-yellow-400 mb-4"></div>

        {/* Loading Text */}
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Loading Article...
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Please wait while we prepare your article.
        </p>
      </div>
    </div>
  );
}

export default ArticelDetailLoadingScreen