import React, { useState, useEffect } from 'react';
import useRecommendation from '../hooks/useRecommendation';
import PreferenceForm from '../components/recommendation/PreferenceForm';
import RecommendationCard from '../components/recommendation/RecommendationCard';
import EmptyState from '../components/recommendation/EmptyState';
import LoadingRecommendations from '../components/recommendation/LoadingRecommendations';
import DetailsModal from '../components/shared/DetailsModal';

/**
 * RecommendationPage Component
 * Main page for the rule-based destination recommendations search.
 */
export default function RecommendationPage() {
    const {
        preferences,
        updatePreference,
        recommendations,
        loading,
        error,
        fetchRecommendationsList,
        resetForm
    } = useRecommendation();

    const [selectedDestination, setSelectedDestination] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleFormSubmit = async () => {
        const success = await fetchRecommendationsList();
        if (success) {
            setHasSearched(true);
            // Smooth scroll to results on mobile devices
            const resultsSection = document.getElementById('recommendation-results');
            if (resultsSection && window.innerWidth < 768) {
                resultsSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const handleFormReset = () => {
        resetForm();
        setHasSearched(false);
    };

    const handleViewDetails = (destination) => {
        setSelectedDestination(destination);
    };

    const handleBookNow = (destination) => {
        // Open details modal which has the booking buttons for flights and hotels
        setSelectedDestination(destination);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 py-8 sm:py-16">
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
                
                {/* Page Title Header */}
                <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
                    <h1 className="text-4xl md:text-5xl font-black mb-4">
                        Find Your Perfect <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Offbeat Trail</span>
                    </h1>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                        Input your preferences and let our rule-based matching engine recommend the best hidden gems in India custom-tailored to your budget, time, and style.
                    </p>
                </div>

                {/* Core Page Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Column: Questionnaire (Form) */}
                    <div className="lg:col-span-5 bg-gray-900 border border-gray-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-6">
                        <div className="border-b border-gray-800 pb-4">
                            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
                                🧭 Preferences Questionnaire
                            </h2>
                            <p className="text-xs text-gray-500 mt-1">
                                Customize your criteria to find exact matches
                            </p>
                        </div>
                        
                        <PreferenceForm
                            preferences={preferences}
                            onChange={updatePreference}
                            onSubmit={handleFormSubmit}
                            onReset={handleFormReset}
                            loading={loading}
                            error={error}
                        />
                    </div>

                    {/* Right Column: Matched Outputs */}
                    <div 
                        id="recommendation-results" 
                        className="lg:col-span-7 bg-gray-900 border border-gray-800 rounded-2xl p-4 sm:p-6 min-h-[600px] shadow-xl flex flex-col"
                    >
                        <div className="border-b border-gray-800 pb-4 mb-6">
                            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
                                ✨ Matched Destinations
                            </h2>
                            <p className="text-xs text-gray-500 mt-1">
                                High compatibility hidden gems sorted by matching score
                            </p>
                        </div>

                        {/* Loading Skeletons */}
                        {loading && <LoadingRecommendations />}

                        {/* Idle/Intro State */}
                        {!loading && !hasSearched && (
                            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                                <div className="p-4 bg-gray-800/40 rounded-full border border-gray-700 mb-6 text-cyan-400 animate-bounce">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Ready to explore?</h3>
                                <p className="text-sm text-gray-400 max-w-sm">
                                    Select your criteria on the left and click <strong>Find Destinations</strong> to run the matching engine.
                                </p>
                            </div>
                        )}

                        {/* Search Complete & Results Renders */}
                        {!loading && hasSearched && (
                            recommendations.length === 0 ? (
                                <div className="flex-1 flex items-center justify-center">
                                    <EmptyState onReset={handleFormReset} />
                                </div>
                            ) : (
                                <div className="flex-1 space-y-6">
                                    <div className="flex items-center justify-between text-xs text-gray-400 font-semibold px-1">
                                        <span>Showing {recommendations.length} compatible matches</span>
                                        <span>Highest score: {recommendations[0]?.score}%</span>
                                    </div>
                                    <div className="grid grid-cols-1 gap-6">
                                        {recommendations.map((dest) => (
                                            <RecommendationCard
                                                key={dest._id}
                                                destination={dest}
                                                onViewDetails={handleViewDetails}
                                                onBookNow={handleBookNow}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )
                        )}

                    </div>

                </div>

            </div>

            {/* Existing Modal Integration */}
            {selectedDestination && (
                <DetailsModal
                    destination={selectedDestination}
                    onClose={() => setSelectedDestination(null)}
                />
            )}
        </div>
    );
}
