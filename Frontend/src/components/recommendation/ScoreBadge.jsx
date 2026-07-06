import React from 'react';

/**
 * ScoreBadge Component
 * Renders the recommendation match percentage inside a premium circular progress ring.
 */
export default function ScoreBadge({ score }) {
    // Circle SVG calculations
    const radius = 24;
    const strokeWidth = 4.5;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    // Define colors based on score value
    let colorClass = 'text-sky-400';
    let ringColorClass = 'stroke-sky-400';
    let bgRingClass = 'stroke-gray-700';

    if (score >= 80) {
        colorClass = 'text-emerald-400';
        ringColorClass = 'stroke-emerald-400';
    } else if (score >= 50) {
        colorClass = 'text-amber-400';
        ringColorClass = 'stroke-amber-400';
    }

    return (
        <div className="flex items-center gap-3 bg-gray-900/60 rounded-full pl-2 pr-4 py-1.5 border border-gray-800/80 shadow-inner">
            <div className="relative flex items-center justify-center w-14 h-14">
                <svg className="w-full h-full transform -rotate-95">
                    {/* Background Circle */}
                    <circle
                        cx="28"
                        cy="28"
                        r={radius}
                        className={`${bgRingClass}`}
                        strokeWidth={strokeWidth}
                        fill="transparent"
                    />
                    {/* Progress Circle */}
                    <circle
                        cx="28"
                        cy="28"
                        r={radius}
                        className={`transition-all duration-1000 ease-out ${ringColorClass}`}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        fill="transparent"
                    />
                </svg>
                <div className="absolute font-black text-xs text-white">
                    {score}%
                </div>
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                    Compatibility
                </span>
                <span className={`text-xs font-black leading-tight ${colorClass}`}>
                    {score >= 80 ? 'Perfect Match' : score >= 50 ? 'Strong Match' : 'Good Match'}
                </span>
            </div>
        </div>
    );
}
