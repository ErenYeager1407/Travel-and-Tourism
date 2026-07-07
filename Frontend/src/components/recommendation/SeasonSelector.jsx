import React from 'react';

const SEASONS = [
    {
        id: 'Spring',
        label: 'Spring',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707" />
            </svg>
        )
    },
    {
        id: 'Summer',
        label: 'Summer',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
        )
    },
    {
        id: 'Monsoon',
        label: 'Monsoon',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
        )
    },
    {
        id: 'Autumn',
        label: 'Autumn',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
        )
    },
    {
        id: 'Winter',
        label: 'Winter',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707" />
            </svg>
        )
    }
];

/**
 * SeasonSelector Component
 * Seasonal preference selector.
 */
export default function SeasonSelector({ value, onChange }) {
    return (
        <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-800 dark:text-gray-300">
                Travel Season
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                {SEASONS.map((season) => {
                    const isSelected = value?.toLowerCase() === season.id.toLowerCase();
                    return (
                        <button
                            key={season.id}
                            type="button"
                            onClick={() => onChange(season.id)}
                            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border transition-all duration-200 text-xs font-semibold last:col-span-2 sm:last:col-span-1 lg:last:col-span-2 xl:last:col-span-1 ${
                                isSelected
                                    ? 'bg-cyan-500 border-cyan-500 text-white shadow-md'
                                    : 'bg-white dark:bg-gray-800/40 border-gray-200 dark:border-gray-700/60 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-900 dark:hover:text-white'
                            }`}
                        >
                            <span className={isSelected ? 'text-white' : 'text-cyan-600 dark:text-cyan-400'}>
                                {season.icon}
                            </span>
                            {season.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
