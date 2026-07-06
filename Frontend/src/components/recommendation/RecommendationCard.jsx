import React from 'react';
import ScoreBadge from './ScoreBadge';
import MatchReasonChip from './MatchReasonChip';

/**
 * RecommendationCard Component
 * Displays a matched destination, its score, why it was matched, details, and call to action.
 */
export default function RecommendationCard({ destination, onViewDetails, onBookNow }) {
    const imageUrl = destination.images && destination.images.length > 0
        ? destination.images[0]
        : 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800';

    const title = destination.name;
    const location = destination.city && destination.state
        ? `${destination.city}, ${destination.state}`
        : destination.state;
    const budget = destination.estimatedTripCost || destination.basePrice || 0;
    const duration = destination.tripDuration || 2;

    return (
        <div className="bg-gray-800/40 border border-gray-700/60 rounded-2xl overflow-hidden hover:border-cyan-500/50 shadow-md hover:shadow-cyan-500/5 transition-all duration-300 flex flex-col sm:flex-row gap-4 p-4">
            
            {/* Image Section */}
            <div className="w-full sm:w-48 h-48 sm:h-auto relative rounded-xl overflow-hidden flex-shrink-0 group">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 bg-cyan-950/80 backdrop-blur-sm border border-cyan-500/30 text-cyan-300 font-extrabold text-xs px-2.5 py-1 rounded-lg">
                    ₹{budget.toLocaleString('en-IN')}
                </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                    {/* Header: Name and Compatibility */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                        <div>
                            <h3 className="text-xl font-extrabold text-white leading-tight">
                                {title}
                            </h3>
                            <span className="text-xs text-gray-400 font-medium">
                                {location}
                            </span>
                        </div>
                        <div className="flex-shrink-0">
                            <ScoreBadge score={destination.score} />
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-300 leading-relaxed line-clamp-3 mb-4">
                        {destination.description}
                    </p>
                </div>

                {/* Footer: Rules & Buttons */}
                <div className="space-y-4">
                    {/* Why Recommended (Rules) */}
                    {destination.matchedRules && destination.matchedRules.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 items-center">
                            <span className="text-[10px] text-gray-500 uppercase tracking-wider font-extrabold mr-1">
                                Highlights:
                            </span>
                            {destination.matchedRules.map((rule, idx) => (
                                <MatchReasonChip key={idx} rule={rule} />
                            ))}
                        </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-2 pt-1">
                        <button
                            type="button"
                            onClick={() => onViewDetails(destination)}
                            className="w-full sm:flex-1 lg:w-full xl:flex-1 px-4 py-2.5 border border-gray-700 bg-gray-900/60 hover:bg-gray-800 hover:text-white text-gray-300 font-bold text-xs rounded-xl transition-all duration-200"
                        >
                            View Details
                        </button>
                        <button
                            type="button"
                            onClick={() => onBookNow(destination)}
                            className="w-full sm:flex-1 lg:w-full xl:flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-cyan-500/10 hover:shadow-cyan-500/20 hover:-translate-y-0.5 transition-all duration-200"
                        >
                            Book Now (₹{budget.toLocaleString('en-IN')})
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
