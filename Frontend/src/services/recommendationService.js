/**
 * recommendationService.js
 * API client functions for the travel destination recommendation engine.
 */

import api from '../lib/api';

/**
 * Fetch recommendations from the backend server based on user preferences.
 * @param {object} preferences - User preference inputs.
 * @param {number} preferences.budget - Maximum budget.
 * @param {number} preferences.duration - Maximum travel duration in days.
 * @param {string} preferences.interest - User travel interest.
 * @param {string} preferences.season - Preferred travel season.
 * @param {string} preferences.region - Preferred region in India.
 * @param {string} preferences.crowd - Preferred crowd level (Low, Medium, High).
 * @param {string} preferences.adventure - Preferred adventure level (Low, Medium, High).
 * @param {string} preferences.group - Preferred travel group (Solo, Couples, Friends, Family).
 * @returns {Promise<Array>} Array of recommended destinations.
 */
export const getRecommendations = async (preferences) => {
    try {
        const response = await api.post('/api/recommend', preferences);
        return response.data;
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        throw new Error(
            error.response?.data?.message || 
            error.message || 
            'Failed to get recommendations. Please check your connection and try again.'
        );
    }
};

export default { getRecommendations };
