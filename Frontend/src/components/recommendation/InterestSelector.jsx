import React from 'react';

// SVG Icons for each interest category
const INTERESTS = [
    {
        id: 'Nature',
        label: 'Nature',
        description: 'Serene landscapes, forests, rivers, and scenic valleys',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
        )
    },
    {
        id: 'Adventure',
        label: 'Adventure',
        description: 'Trekking, rafting, water sports, and thrill-seeking',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
        )
    },
    {
        id: 'Historical',
        label: 'Historical',
        description: 'Ancient monuments, forts, ruins, and heritage tours',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
        )
    },
    {
        id: 'Spiritual',
        label: 'Spiritual',
        description: 'Temples, monasteries, sacred sites, and meditation centers',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
            </svg>
        )
    },
    {
        id: 'Wildlife',
        label: 'Wildlife',
        description: 'National parks, animal reserves, bird watching, and safaris',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
        )
    },
    {
        id: 'Beach',
        label: 'Beach',
        description: 'Sun, sand, ocean views, and relaxing shores',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M5 12a7 7 0 0114 0" />
            </svg>
        )
    },
    {
        id: 'Hill Station',
        label: 'Hill Station',
        description: 'Cool weather, misty peaks, and panoramic view points',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
        )
    },
    {
        id: 'Culture',
        label: 'Culture',
        description: 'Local music, dances, arts, cuisines, and festivals',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    }
];

/**
 * InterestSelector Component
 * Grid based selector for interest categories with custom description cards.
 */
export default function InterestSelector({ value, onChange }) {
    return (
        <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-300">
                Core Travel Interest
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {INTERESTS.map((item) => {
                    const isSelected = value?.toLowerCase() === item.id.toLowerCase();
                    return (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => onChange(item.id)}
                            className={`flex flex-col text-left p-4 rounded-xl border transition-all duration-300 ${
                                isSelected
                                    ? 'bg-gradient-to-br from-cyan-600 to-blue-700 border-cyan-400 text-white shadow-lg shadow-cyan-500/10 scale-[1.02]'
                                    : 'bg-gray-800/40 border-gray-700/60 text-gray-300 hover:border-gray-600/80 hover:bg-gray-800/60'
                            }`}
                        >
                            <div className={`p-2 rounded-lg w-fit mb-3 ${
                                isSelected ? 'bg-white/20 text-white' : 'bg-gray-700 text-cyan-400'
                            }`}>
                                {item.icon}
                            </div>
                            <span className="font-bold text-sm mb-1">{item.label}</span>
                            <span className={`text-[11px] leading-relaxed hidden sm:block ${
                                isSelected ? 'text-cyan-100' : 'text-gray-400'
                            }`}>
                                {item.description}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
