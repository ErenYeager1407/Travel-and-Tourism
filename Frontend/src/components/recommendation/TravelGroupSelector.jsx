import React from 'react';

const GROUPS = [
    { id: 'Solo', label: 'Solo Traveler', desc: 'Indulge in solitude & self-discovery' },
    { id: 'Couples', label: 'Couple / Duo', desc: 'Romantic getaways & partners' },
    { id: 'Friends', label: 'Friends Group', desc: 'Active sports, fun & memories' },
    { id: 'Family', label: 'Family Vacation', desc: 'Safe, relaxing & bonding spots' }
];

/**
 * TravelGroupSelector Component
 * Grid based option selector for travel group categories.
 */
export default function TravelGroupSelector({ value, onChange }) {
    return (
        <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-800 dark:text-gray-300">
                Travel Group
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3">
                {GROUPS.map((group) => {
                    const isSelected = value?.toLowerCase() === group.id.toLowerCase();
                    return (
                        <button
                            key={group.id}
                            type="button"
                            onClick={() => onChange(group.id)}
                            className={`flex flex-col p-4 rounded-xl border text-left transition-all duration-200 ${
                                isSelected
                                    ? 'bg-gradient-to-br from-cyan-600 to-blue-700 border-cyan-400 text-white shadow-lg shadow-cyan-500/10'
                                    : 'bg-white dark:bg-gray-800/40 border-gray-200 dark:border-gray-700/60 text-gray-700 dark:text-gray-300 hover:border-gray-355 dark:hover:border-gray-600/80 hover:bg-gray-50 dark:hover:bg-gray-800/60'
                            }`}
                        >
                            <span className="font-bold text-xs mb-1">{group.label}</span>
                            <span className={`text-[10px] leading-tight hidden sm:block ${
                                isSelected ? 'text-cyan-100' : 'text-gray-500 dark:text-gray-400'
                            }`}>
                                {group.desc}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
