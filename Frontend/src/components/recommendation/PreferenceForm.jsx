import React from 'react';
import BudgetSlider from './BudgetSlider';
import DurationSelector from './DurationSelector';
import InterestSelector from './InterestSelector';
import RegionSelector from './RegionSelector';
import CrowdSelector from './CrowdSelector';
import AdventureSelector from './AdventureSelector';
import SeasonSelector from './SeasonSelector';
import TravelGroupSelector from './TravelGroupSelector';

/**
 * PreferenceForm Component
 * Layout container for preference selection forms.
 */
export default function PreferenceForm({
    preferences,
    onChange,
    onSubmit,
    onReset,
    loading,
    error
}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Row 1: Budget and Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <BudgetSlider
                    value={preferences.budget}
                    onChange={(val) => onChange('budget', val)}
                />
                <DurationSelector
                    value={preferences.duration}
                    onChange={(val) => onChange('duration', val)}
                />
            </div>

            {/* Row 2: Travel Group */}
            <TravelGroupSelector
                value={preferences.group}
                onChange={(val) => onChange('group', val)}
            />

            {/* Row 3: Core Interest */}
            <InterestSelector
                value={preferences.interest}
                onChange={(val) => onChange('interest', val)}
            />

            {/* Row 4: Geographical Region */}
            <RegionSelector
                value={preferences.region}
                onChange={(val) => onChange('region', val)}
            />

            {/* Row 5: Season */}
            <SeasonSelector
                value={preferences.season}
                onChange={(val) => onChange('season', val)}
            />

            {/* Row 6: Crowd and Adventure Preference */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <CrowdSelector
                    value={preferences.crowd}
                    onChange={(val) => onChange('crowd', val)}
                />
                <AdventureSelector
                    value={preferences.adventure}
                    onChange={(val) => onChange('adventure', val)}
                />
            </div>

            {/* Validation/API error display */}
            {error && (
                <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs font-semibold animate-shake">
                    ⚠️ {error}
                </div>
            )}

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:flex-1 py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-cyan-800 disabled:to-blue-900 disabled:cursor-not-allowed text-white font-extrabold text-sm rounded-xl shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 hover:-translate-y-0.5 disabled:translate-y-0 transition-all text-center flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Calculating Recommendations...
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Find Destinations
                        </>
                    )}
                </button>
                <button
                    type="button"
                    onClick={onReset}
                    disabled={loading}
                    className="w-full sm:w-auto px-5 py-3 border border-gray-700 hover:border-gray-500 bg-gray-900/60 hover:bg-gray-800 disabled:opacity-50 text-gray-300 font-bold text-xs rounded-xl transition-all"
                >
                    Reset Form
                </button>
            </div>
        </form>
    );
}
