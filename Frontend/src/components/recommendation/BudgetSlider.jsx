import React from 'react';

/**
 * BudgetSlider Component
 * Allows user to specify their maximum budget using a slider or text input.
 */
export default function BudgetSlider({ value, onChange }) {
    const minBudget = 1000;
    const maxBudget = 50000;
    const step = 500;

    const handleSliderChange = (e) => {
        onChange(Number(e.target.value));
    };

    const handleInputChange = (e) => {
        let val = Number(e.target.value);
        if (val > maxBudget) val = maxBudget;
        onChange(val);
    };

    return (
        <div className="bg-gray-800/40 border border-gray-700/60 rounded-xl p-5 shadow-sm transition-all hover:border-gray-600/80">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-300">
                        Max Budget Limit (INR)
                    </label>
                    <span className="text-xs text-gray-400">
                        Excludes locations exceeding this price
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-gray-400 font-medium">₹</span>
                    <input
                        type="number"
                        min={minBudget}
                        max={maxBudget}
                        value={value || minBudget}
                        onChange={handleInputChange}
                        className="w-24 px-3 py-1 bg-gray-900 border border-gray-700 rounded-lg text-white font-bold text-right focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                    />
                </div>
            </div>
            
            <input
                type="range"
                min={minBudget}
                max={maxBudget}
                step={step}
                value={value || minBudget}
                onChange={handleSliderChange}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500 focus:outline-none"
            />
            
            <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
                <span>₹1,000 (Budget)</span>
                <span className="text-cyan-400 font-semibold">₹{value?.toLocaleString('en-IN')} Selected</span>
                <span>₹50,000 (Luxury)</span>
            </div>
        </div>
    );
}
