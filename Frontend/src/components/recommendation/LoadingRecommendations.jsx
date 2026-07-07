import React from 'react';

/**
 * LoadingRecommendations Component
 * Renders animated skeleton placeholder cards during API query execution.
 */
export default function LoadingRecommendations() {
    return (
        <div className="space-y-6 w-full animate-pulse">
            <div className="flex items-center justify-between mb-4">
                <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((item) => (
                    <div 
                        key={item} 
                        className="bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/60 rounded-2xl overflow-hidden p-4 flex flex-col sm:flex-row gap-4"
                    >
                        {/* Image Skeleton */}
                        <div className="w-full sm:w-44 h-40 bg-gray-200 dark:bg-gray-700 rounded-xl flex-shrink-0"></div>
                        
                        {/* Content Skeleton */}
                        <div className="flex-1 flex flex-col justify-between py-1 space-y-3">
                            <div>
                                <div className="flex justify-between items-start gap-2 mb-2">
                                    <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                    <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                                </div>
                                <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                                <div className="space-y-2">
                                    <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                                    <div className="h-3 w-5/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                </div>
                            </div>
                            
                            {/* Badges & Buttons Skeleton */}
                            <div className="space-y-3">
                                <div className="flex flex-wrap gap-2">
                                    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                                    <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                                    <div className="h-4 w-14 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                                </div>
                                <div className="flex gap-2 pt-2">
                                    <div className="h-9 flex-1 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                                    <div className="h-9 flex-1 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
