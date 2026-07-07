import React from 'react';

/**
 * MatchReasonChip Component
 * Renders reasons/rules why a destination was recommended as styled badges.
 */
export default function MatchReasonChip({ rule }) {
    // Determine badge style dynamically based on the rule name
    let badgeClass = 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700';
    const cleanRule = rule.toLowerCase();

    if (cleanRule.includes('budget')) {
        badgeClass = 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20';
    } else if (cleanRule.includes('season')) {
        badgeClass = 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/20';
    } else if (cleanRule.includes('interest')) {
        badgeClass = 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20';
    } else if (cleanRule.includes('offbeat') || cleanRule.includes('bonus')) {
        badgeClass = 'bg-fuchsia-50 dark:bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-200 dark:border-fuchsia-500/20';
    } else if (cleanRule.includes('region')) {
        badgeClass = 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-500/20';
    } else if (cleanRule.includes('crowd')) {
        badgeClass = 'bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-500/20';
    } else if (cleanRule.includes('adventure')) {
        badgeClass = 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/20';
    }

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badgeClass} transition-transform hover:scale-105 select-none`}>
            <span className="w-1 h-1 rounded-full bg-current mr-1.5 animate-pulse"></span>
            {rule}
        </span>
    );
}
