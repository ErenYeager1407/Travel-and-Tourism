/**
 * useRecommendation.js
 * Custom hook to handle state and actions for the travel recommendations feature.
 */

import { useState, useCallback } from 'react';
import { getRecommendations } from '../services/recommendationService';

// Default initial preferences
const INITIAL_PREFERENCES = {
    budget: 15000,
    duration: 5,
    interest: 'Nature',
    season: 'Winter',
    region: 'North',
    crowd: 'Medium',
    adventure: 'Medium',
    group: 'Friends'
};

export const useRecommendation = () => {
    const [preferences, setPreferences] = useState(INITIAL_PREFERENCES);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Update a specific preference key
    const updatePreference = useCallback((key, value) => {
        setPreferences((prev) => ({
            ...prev,
            [key]: value
        }));
    }, []);

    // Validate inputs and call the recommendations API
    const fetchRecommendationsList = useCallback(async () => {
        // Validate budget
        if (!preferences.budget || isNaN(preferences.budget) || preferences.budget <= 0) {
            setError('Please enter a valid budget greater than ₹0.');
            return false;
        }

        // Validate duration
        if (!preferences.duration || isNaN(preferences.duration) || preferences.duration < 1 || preferences.duration > 30) {
            setError('Please enter a travel duration between 1 and 30 days.');
            return false;
        }

        setLoading(true);
        setError(null);

        try {
            const data = await getRecommendations(preferences);
            setRecommendations(data);
            return true;
        } catch (err) {
            console.error('Failed to get recommendations in hook:', err);
            setError(err.message || 'Something went wrong while matching destinations. Please try again.');
            setRecommendations([]);
            return false;
        } finally {
            setLoading(false);
        }
    }, [preferences]);

    // Reset the form to initial defaults and clear list
    const resetForm = useCallback(() => {
        setPreferences(INITIAL_PREFERENCES);
        setRecommendations([]);
        setError(null);
        setLoading(false);
    }, []);

    return {
        preferences,
        updatePreference,
        recommendations,
        loading,
        error,
        fetchRecommendationsList,
        resetForm
    };
};

export default useRecommendation;
