import React from 'react';

const ADVENTURE_OPTIONS = [
    { id: 'Low', label: 'Low', desc: 'Leisurely walks & sightseeing' },
    { id: 'Medium', label: 'Medium', desc: 'Light trekking & safaris' },
    { id: 'High', label: 'High', desc: 'Heavy trekking & water sports' }
];

/**
 * AdventureSelector Component
 * Grid selector for adventure intensity preference.
 */
export default function AdventureSelector({ value, onChange }) {
    return (
        <div className="bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/60 rounded-xl p-5 shadow-sm transition-all hover:border-gray-300 dark:hover:border-gray-600/80">
            <label className="block text-sm font-semibold text-gray-800 dark:text-gray-300 mb-1">
                Adventure Level
            </label>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                Prioritizes activity intensities (e.g. relaxing vs extreme)
            </p>
            <div className="grid grid-cols-1 gap-2">
                {ADVENTURE_OPTIONS.map((opt) => {
                    const isSelected = value?.toLowerCase() === opt.id.toLowerCase();
                    return (
                        <button
                            key={opt.id}
                            type="button"
                            onClick={() => onChange(opt.id)}
                            className={`flex flex-col p-2.5 rounded-lg border transition-all text-left ${
                                isSelected
                                    ? 'border-cyan-500 text-cyan-700 dark:text-white bg-cyan-50 dark:bg-cyan-500/10 shadow-sm'
                                    : 'bg-white dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-700'
                            }`}
                        >
                            <span className="font-bold text-xs mb-0.5">{opt.label}</span>
                            <span className={`text-[10px] leading-normal ${
                                isSelected ? 'text-cyan-600 dark:text-cyan-300' : 'text-gray-500 dark:text-gray-400'
                            }`}>
                                {opt.desc}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

