import React from 'react';

/**
 * EmptyState Component
 * Displays a friendly vector empty state when no recommendations match the user's search criteria.
 */
export default function EmptyState({ onReset }) {
    return (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-gray-800/25 border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl max-w-md mx-auto my-12 shadow-sm animate-fade-in">
            {/* SVG Compass Illustration */}
            <svg
                className="w-24 h-24 text-gray-450 dark:text-gray-500 mb-6 animate-pulse"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
                <circle cx="12" cy="11" r="3" strokeWidth={1.5} />
            </svg>
            
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Matching Destinations</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                We couldn't find any offbeat trails matching your exact filters. Your strict budget, trip duration, or group suitability might be too restrictive.
            </p>
            
            <div className="text-left w-full bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-850 rounded-xl p-4 mb-6 space-y-2 text-xs text-gray-650 dark:text-gray-400">
                <p className="font-bold text-gray-800 dark:text-gray-300">💡 Suggestions to get matches:</p>
                <ul className="list-disc pl-4 space-y-1">
                    <li>Increase your maximum budget limit</li>
                    <li>Add 1-2 extra travel days</li>
                    <li>Try a different interest category (like Nature)</li>
                    <li>Switch the travel group (e.g. to Family or Solo)</li>
                </ul>
            </div>
            
            {onReset && (
                <button
                    type="button"
                    onClick={onReset}
                    className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-full text-sm font-semibold shadow-md shadow-cyan-500/10 transition hover:-translate-y-0.5"
                >
                    Reset Preference Form
                </button>
            )}
        </div>
    );
}
