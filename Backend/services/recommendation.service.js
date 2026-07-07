/**
 * recommendation.service.js
 * Service handling recommendation retrieval, filtering, scoring, and sorting.
 */

import Destination from '../models/Destination.js';
import { hardFilters, scoringRules } from '../utils/ruleEngine.js';
import { calculateScore, getDestinationBudget } from '../utils/scoreCalculator.js';

/**
 * Gets rule-based recommendations for a user based on preferences.
 * @param {object} preferences - User preferences from the client.
 * @param {number} [preferences.budget] - Max budget limit.
 * @param {number} [preferences.duration] - Max travel duration in days.
 * @param {string} [preferences.interest] - Travel interest (e.g., Nature, Adventure).
 * @param {string} [preferences.season] - Travel season (e.g., Winter, Summer).
 * @param {string} [preferences.region] - Preferred region (e.g., Northeast, South).
 * @param {string} [preferences.crowd] - Preferred crowd level (e.g., Low, Medium, High).
 * @param {string} [preferences.adventure] - Preferred adventure level (e.g., Low, Medium, High).
 * @param {string} [preferences.group] - Travel group type (e.g., Solo, Couples, Friends, Family).
 * @param {number} [threshold=40] - Minimum recommendation score threshold.
 * @returns {Promise<array>} Recommended destinations with scores and matched rules.
 */
export const getRecommendations = async (preferences, threshold = 40) => {
    // 1. Fetch all destinations from the database
    const destinations = await Destination.find().populate('hotels').populate('flights').lean();

    // 2. Apply hard filtering
    const candidates = destinations.filter(dest => {
        return hardFilters.every(filter => {
            try {
                return filter.evaluate(dest, preferences);
            } catch (err) {
                console.error(`Error applying filter ${filter.name} on ${dest.name}:`, err);
                return false; // Safely exclude on error
            }
        });
    });

    // 3. Calculate score for each candidate and build the response
    const recommendations = candidates.map(dest => {
        const { score, matchedRules } = calculateScore(dest, preferences, scoringRules);
        
        // Post-process matched rules to match the requested output format:
        // Translate "Interest Match" -> e.g. "Nature Interest"
        const formattedMatchedRules = matchedRules.map(ruleName => {
            if (ruleName === 'Interest Match' && preferences.interest) {
                // Capitalize interest (e.g., nature -> Nature)
                const interestClean = preferences.interest.trim();
                const capitalizedInterest = interestClean.charAt(0).toUpperCase() + interestClean.slice(1).toLowerCase();
                return `${capitalizedInterest} Interest`;
            }
            return ruleName;
        });

        return {
            _id: dest._id,
            name: dest.name,
            city: dest.city,
            state: dest.state,
            description: dest.description,
            images: dest.images,
            coordinates: dest.coordinates,
            estimatedTripCost: getDestinationBudget(dest, preferences),
            tripDuration: dest.tripDuration,
            bestSeasons: dest.bestSeasons,
            crowdLevel: dest.crowdLevel,
            score,
            matchedRules: formattedMatchedRules
        };
    });

    // 4. Sort destinations in descending order of score
    // 5. Filter by threshold (keep only score > threshold)
    const filteredRecommendations = recommendations
        .filter(rec => rec.score > threshold)
        .sort((a, b) => b.score - a.score);

    return filteredRecommendations;
};
export default { getRecommendations };
