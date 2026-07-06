/**
 * scoreCalculator.js
 * Utility file to dynamically map database fields and compute the recommendation scores.
 */

// State to region mapping dictionary for Indian states
const STATE_TO_REGION = {
    // Northeast
    'arunachal pradesh': 'Northeast',
    'assam': 'Northeast',
    'manipur': 'Northeast',
    'meghalaya': 'Northeast',
    'mizoram': 'Northeast',
    'nagaland': 'Northeast',
    'sikkim': 'Northeast',
    'tripura': 'Northeast',

    // North
    'jammu & kashmir': 'North',
    'jammu and kashmir': 'North',
    'himachal pradesh': 'North',
    'punjab': 'North',
    'uttarakhand': 'North',
    'haryana': 'North',
    'delhi': 'North',
    'uttar pradesh': 'North',
    'rajasthan': 'North',
    'ladakh': 'North',
    'madhya pradesh': 'North', // Central mapped to North

    // South
    'andhra pradesh': 'South',
    'karnataka': 'South',
    'kerala': 'South',
    'tamil nadu': 'South',
    'telangana': 'South',
    'puducherry': 'South',
    'lakshadweep': 'South',
    'andaman and nicobar islands': 'South',

    // East
    'bihar': 'East',
    'jharkhand': 'East',
    'odisha': 'East',
    'orissa': 'East',
    'west bengal': 'East',
    'chhattisgarh': 'East', // Central/Eastern mapped to East

    // West
    'goa': 'West',
    'gujarat': 'West',
    'maharashtra': 'West',
    'daman and diu': 'West',
    'dadra and nagar haveli': 'West'
};

/**
 * Dynamically maps a state name to a region (North, South, East, West, Northeast).
 * @param {string} state - The state name.
 * @returns {string} The corresponding region name, or 'North' as a fallback.
 */
export const getRegionFromState = (state) => {
    if (!state) return 'North';
    const normalizedState = state.toLowerCase().trim();
    return STATE_TO_REGION[normalizedState] || 'North';
};

/**
 * Derives the adventure level of a destination dynamically from its activities.
 * - High: if activities include "Adventure" or "Water Sports"
 * - Medium: if activities include "Trekking", "Camping", or "Wildlife"
 * - Low: otherwise
 * @param {string[]} activities - Array of activities.
 * @returns {string} Low, Medium, or High.
 */
export const getAdventureLevelFromActivities = (activities = []) => {
    const normalized = activities.map(act => act.toLowerCase().trim());
    if (normalized.includes('adventure') || normalized.includes('water sports')) {
        return 'High';
    }
    if (normalized.includes('trekking') || normalized.includes('camping') || normalized.includes('wildlife')) {
        return 'Medium';
    }
    return 'Low';
};

/**
 * Normalizes user travel group preferences to match the database values.
 * e.g., 'Couples' or 'couple' -> 'Couple'
 * @param {string} group - User input travel group.
 * @returns {string} Normalized group string.
 */
export const normalizeTravelGroup = (group) => {
    if (!group) return '';
    const normalized = group.toLowerCase().trim();
    if (normalized === 'couples' || normalized === 'couple') return 'Couple';
    if (normalized === 'solo') return 'Solo';
    if (normalized === 'friends') return 'Friends';
    if (normalized === 'family') return 'Family';
    return group;
};

/**
 * Retrieves the budget of the destination, preferring estimatedTripCost over basePrice.
 * @param {object} destination - Mongoose destination document.
 * @returns {number} The budget cost.
 */
export const getDestinationBudget = (destination) => {
    if (destination.estimatedTripCost && destination.estimatedTripCost > 0) {
        return destination.estimatedTripCost;
    }
    return destination.basePrice || 0;
};

/**
 * Computes recommendation score and list of matched rules for a single destination.
 * @param {object} destination - Mongoose destination document.
 * @param {object} preferences - User preferences.
 * @param {array} scoringRules - List of scoring rule definitions.
 * @returns {object} Object with { score, matchedRules }
 */
export const calculateScore = (destination, preferences, scoringRules) => {
    let totalScore = 0;
    const matchedRules = [];

    for (const rule of scoringRules) {
        const isMatched = rule.evaluate(destination, preferences);
        if (isMatched) {
            totalScore += rule.weight;
            matchedRules.push(rule.name);
        }
    }

    // Clamp score to maximum 100
    totalScore = Math.min(totalScore, 100);

    return {
        score: totalScore,
        matchedRules
    };
};
