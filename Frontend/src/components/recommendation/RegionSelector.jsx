import React from 'react';

const REGIONS = [
    { id: 'North', label: 'North India', desc: 'Himalayas, culture, Delhi, Uttarakhand' },
    { id: 'South', label: 'South India', desc: 'Beaches, temples, backwaters, Kerala' },
    { id: 'East', label: 'East India', desc: 'Heritage, mountains, Bengal, Odisha' },
    { id: 'West', label: 'West India', desc: 'Deserts, heritage, beaches, Goa, Gujarat' },
    { id: 'Northeast', label: 'Northeast India', desc: 'Offbeat trails, waterfalls, Sikkim' }
];

/**
 * RegionSelector Component
 * Segmented/grid selector for geographical regions in India.
 */
export default function RegionSelector({ value, onChange }) {
    return (
        <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-300">
                Preferred Region
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                {REGIONS.map((region) => {
                    const isSelected = value?.toLowerCase() === region.id.toLowerCase();
                    return (
                        <button
                            key={region.id}
                            type="button"
                            onClick={() => onChange(region.id)}
                            className={`flex flex-col p-3 text-center justify-center items-center rounded-xl border transition-all duration-200 last:col-span-2 sm:last:col-span-1 lg:last:col-span-2 xl:last:col-span-1 ${
                                isSelected
                                    ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md shadow-cyan-500/5'
                                    : 'bg-gray-800/40 border-gray-700/60 text-gray-400 hover:border-gray-600/80 hover:text-white'
                            }`}
                        >
                            <span className="font-bold text-xs mb-1">{region.label}</span>
                            <span className="text-[10px] text-gray-500 leading-tight hidden sm:block">
                                {region.desc}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
