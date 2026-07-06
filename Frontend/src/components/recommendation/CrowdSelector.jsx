import React from 'react';

const CROWD_OPTIONS = [
    { id: 'Low', label: 'Low Crowd', desc: 'Quiet, offbeat & peaceful', color: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5' },
    { id: 'Medium', label: 'Medium Crowd', desc: 'Moderate bustle & vibes', color: 'border-amber-500/30 text-amber-400 bg-amber-500/5' },
    { id: 'High', label: 'High Crowd', desc: 'Lively, popular & buzzing', color: 'border-blue-500/30 text-blue-400 bg-blue-500/5' }
];

/**
 * CrowdSelector Component
 * Toggle options for selecting crowd level preferences.
 */
export default function CrowdSelector({ value, onChange }) {
    return (
        <div className="bg-gray-800/40 border border-gray-700/60 rounded-xl p-5 shadow-sm transition-all hover:border-gray-600/80">
            <label className="block text-sm font-semibold text-gray-300 mb-1">
                Crowd Level Preference
            </label>
            <p className="text-xs text-gray-400 mb-4">
                Helps prioritize tourist-heavy vs secluded destinations
            </p>
            <div className="grid grid-cols-3 gap-3">
                {CROWD_OPTIONS.map((opt) => {
                    const isSelected = value?.toLowerCase() === opt.id.toLowerCase();
                    return (
                        <button
                            key={opt.id}
                            type="button;`"
                            onClick={() => onChange(opt.id)}
                            className={`flex flex-col p-3 rounded-lg border transition-all text-left ${
                                isSelected
                                    ? `border-cyan-400 text-white bg-cyan-500/10 shadow-sm`
                                    : 'bg-gray-900/50 border-gray-800 text-gray-400 hover:border-gray-700'
                            }`}
                        >
                            <span className="font-bold text-xs mb-0.5">{opt.label}</span>
                            <span className="text-[10px] text-gray-500">{opt.desc}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
