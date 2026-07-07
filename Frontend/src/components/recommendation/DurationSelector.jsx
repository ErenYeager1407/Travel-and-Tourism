import React from 'react';

/**
 * DurationSelector Component
 * Allows user to specify the maximum travel days they have available.
 */
export default function DurationSelector({ value, onChange }) {
    const minDays = 1;
    const maxDays = 15;

    const handleSliderChange = (e) => {
        onChange(Number(e.target.value));
    };

    const setQuickDuration = (days) => {
        onChange(days);
    };

    return (
        <div className="bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/60 rounded-xl p-5 shadow-sm transition-all hover:border-gray-300 dark:hover:border-gray-600/80">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-800 dark:text-gray-300">
                        Available Travel Days
                    </label>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        Limits recommendations to trips taking this long or less
                    </span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1 text-cyan-600 dark:text-cyan-400 font-bold text-sm">
                    {value} {value === 1 ? 'Day' : 'Days'}
                </div>
            </div>

            <input
                type="range"
                min={minDays}
                max={maxDays}
                value={value || minDays}
                onChange={handleSliderChange}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500 focus:outline-none mb-4"
            />

            <div className="flex flex-wrap gap-2 mt-2">
                <button
                    type="button"
                    onClick={() => setQuickDuration(2)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                        value === 2 
                            ? 'bg-cyan-500 border-cyan-500 text-white' 
                            : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-white'
                    }`}
                >
                    Weekend (2d)
                </button>
                <button
                    type="button"
                    onClick={() => setQuickDuration(4)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                        value === 4 
                            ? 'bg-cyan-500 border-cyan-500 text-white' 
                            : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-white'
                    }`}
                >
                    Ext. Weekend (4d)
                </button>
                <button
                    type="button"
                    onClick={() => setQuickDuration(7)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                        value === 7 
                            ? 'bg-cyan-500 border-cyan-500 text-white' 
                            : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-white'
                    }`}
                >
                    1 Week (7d)
                </button>
                <button
                    type="button"
                    onClick={() => setQuickDuration(10)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                        value === 10 
                            ? 'bg-cyan-500 border-cyan-500 text-white' 
                            : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-white'
                    }`}
                >
                    10 Days
                </button>
            </div>
        </div>
    );
}
