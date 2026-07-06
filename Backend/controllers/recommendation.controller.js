/**
 * recommendation.controller.js
 * Controller that handles incoming HTTP requests for recommendations.
 */

import { getRecommendations } from '../services/recommendation.service.js';

/**
 * Handle recommendation POST requests.
 * @route POST /api/recommend
 */
export const recommendDestinations = async (req, res) => {
    try {
        const {
            budget,
            duration,
            interest,
            season,
            region,
            crowd,
            adventure,
            group,
            threshold
        } = req.body;

        // Perform basic input validation
        const preferences = {};

        // Parse and validate budget (if provided)
        if (budget !== undefined && budget !== null) {
            const parsedBudget = Number(budget);
            if (isNaN(parsedBudget) || parsedBudget < 0) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid budget value. Budget must be a positive number."
                });
            }
            preferences.budget = parsedBudget;
        }

        // Parse and validate duration (if provided)
        if (duration !== undefined && duration !== null) {
            const parsedDuration = Number(duration);
            if (isNaN(parsedDuration) || parsedDuration < 0) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid duration value. Duration must be a positive number of days."
                });
            }
            preferences.duration = parsedDuration;
        }

        // Add remaining preferences if they are defined
        if (interest) preferences.interest = String(interest);
        if (season) preferences.season = String(season);
        if (region) preferences.region = String(region);
        if (crowd) preferences.crowd = String(crowd);
        if (adventure) preferences.adventure = String(adventure);
        if (group) preferences.group = String(group);

        // Optional custom score threshold (defaults to 40 if not set or invalid)
        let minScoreThreshold = 40;
        if (threshold !== undefined && threshold !== null) {
            const parsedThreshold = Number(threshold);
            if (!isNaN(parsedThreshold) && parsedThreshold >= 0 && parsedThreshold <= 100) {
                minScoreThreshold = parsedThreshold;
            }
        }

        // Call the service to compute recommendations
        const results = await getRecommendations(preferences, minScoreThreshold);

        // Return recommendations list
        return res.status(200).json(results);
    } catch (error) {
        console.error("Recommendation controller error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to process recommendations. Please try again later.",
            error: error.message
        });
    }
};

export default { recommendDestinations };
