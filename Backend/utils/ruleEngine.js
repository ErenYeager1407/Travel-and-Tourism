/**
 * ruleEngine.js
 * Extensible rule definitions for hard filtering and preference scoring.
 */

import { 
    getRegionFromState, 
    getAdventureLevelFromActivities, 
    normalizeTravelGroup, 
    getDestinationBudget 
} from './scoreCalculator.js';

/**
 * Hard filtering rules. A destination must pass ALL hard filters to be considered.
 */
export const hardFilters = [
    {
        name: 'Budget Limit',
        evaluate: (destination, preferences) => {
            if (preferences.budget === undefined || preferences.budget === null) return true;
            const destCost = getDestinationBudget(destination);
            return destCost <= preferences.budget;
        }
    },
    {
        name: 'Duration Limit',
        evaluate: (destination, preferences) => {
            if (preferences.duration === undefined || preferences.duration === null) return true;
            // Use tripDuration as recommendedDuration
            const duration = destination.tripDuration || 0;
            return duration <= preferences.duration;
        }
    },
    {
        name: 'Travel Group Suitability',
        evaluate: (destination, preferences) => {
            if (!preferences.group) return true;
            if (!destination.suitableFor || destination.suitableFor.length === 0) return false;
            
            const normalizedUserGroup = normalizeTravelGroup(preferences.group).toLowerCase();
            
            return destination.suitableFor.some(group => {
                const normalizedDestGroup = normalizeTravelGroup(group).toLowerCase();
                return normalizedDestGroup === normalizedUserGroup;
            });
        }
    }
];

/**
 * Scoring rules. These are applied to destinations that passed the hard filters.
 * Max score is 100.
 */
export const scoringRules = [
    {
        name: 'Interest Match',
        weight: 30,
        evaluate: (destination, preferences) => {
            if (!preferences.interest) return false;
            const interest = preferences.interest.toLowerCase().trim();
            
            const hasActivity = destination.activities && destination.activities.some(act => act.toLowerCase().trim() === interest);
            const hasTag = destination.tags && destination.tags.some(tag => tag.toLowerCase().trim() === interest);
            
            return hasActivity || hasTag;
        }
    },
    {
        name: 'Budget Match',
        weight: 20,
        evaluate: (destination, preferences) => {
            if (preferences.budget === undefined || preferences.budget === null) return false;
            const destCost = getDestinationBudget(destination);
            return destCost <= preferences.budget;
        }
    },
    {
        name: 'Season Match',
        weight: 15,
        evaluate: (destination, preferences) => {
            if (!preferences.season) return false;
            const season = preferences.season.toLowerCase().trim();
            
            const hasBestSeason = destination.bestSeason && destination.bestSeason.toLowerCase().trim() === season;
            const hasBestSeasons = destination.bestSeasons && destination.bestSeasons.some(s => s.toLowerCase().trim() === season);
            
            return hasBestSeason || hasBestSeasons;
        }
    },
    {
        name: 'Crowd Match',
        weight: 10,
        evaluate: (destination, preferences) => {
            if (!preferences.crowd) return false;
            const crowd = preferences.crowd.toLowerCase().trim();
            
            return destination.crowdLevel && destination.crowdLevel.toLowerCase().trim() === crowd;
        }
    },
    {
        name: 'Adventure Match',
        weight: 10,
        evaluate: (destination, preferences) => {
            if (!preferences.adventure) return false;
            const userAdventure = preferences.adventure.toLowerCase().trim();
            const destAdventure = getAdventureLevelFromActivities(destination.activities).toLowerCase();
            
            return destAdventure === userAdventure;
        }
    },
    {
        name: 'Region Match',
        weight: 5,
        evaluate: (destination, preferences) => {
            if (!preferences.region) return false;
            const userRegion = preferences.region.toLowerCase().trim();
            const destRegion = getRegionFromState(destination.state).toLowerCase();
            
            return destRegion === userRegion;
        }
    },
    {
        name: 'Offbeat Bonus',
        weight: 10,
        evaluate: (destination, preferences) => {
            const isOffbeatByScore = destination.offbeatScore !== undefined && destination.offbeatScore >= 70;
            const isOffbeatByTag = destination.tags && destination.tags.some(tag => tag.toLowerCase().trim() === 'offbeat');
            const isOffbeatByPopularity = destination.popularity && destination.popularity.toLowerCase().trim() === 'offbeat';
            
            return isOffbeatByScore || isOffbeatByTag || isOffbeatByPopularity;
        }
    }
];
