/**
 * testRecommend.js
 * Verification script to test the recommendation engine API.
 */

const testRecommendationAPI = async () => {
    const url = 'http://localhost:5000/api/recommend';
    
    // We choose a test payload that matches some attributes of our database destinations (like Chopta)
    // Chopta has: state: Uttarakhand (Region: North), estimatedTripCost: 7200, tripDuration: 5, 
    // activities: ["Water Sports", "Religious", "Shopping"], bestSeasons: ["Spring", "Monsoon"],
    // suitableFor: ["Family", "Solo", "Couple", "Friends"], crowdLevel: "Medium", offbeatScore: 74
    const payload = {
        budget: 10000,
        duration: 5,
        interest: "Water Sports",
        season: "Spring",
        region: "North",
        crowd: "Medium",
        adventure: "High", // Water sports maps to High adventure!
        group: "Solo",
        threshold: 20 // Lower threshold for testing
    };

    console.log('Sending preference payload to recommendation API...');
    console.log(JSON.stringify(payload, null, 2));
    console.log('--------------------------------------------------');

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        console.log(`Response Status: ${response.status}`);
        
        if (!response.ok) {
            const errText = await response.text();
            console.error('API Error Response:', errText);
            return;
        }

        const recommendations = await response.json();
        console.log(`Success! Found ${recommendations.length} recommended destinations.`);
        console.log('--------------------------------------------------');
        
        recommendations.forEach((rec, idx) => {
            console.log(`${idx + 1}. Destination: ${rec.name} (${rec.city}, ${rec.state})`);
            console.log(`   Score: ${rec.score}/100`);
            console.log(`   Matched Rules:`, JSON.stringify(rec.matchedRules));
            console.log(`   Budget: ₹${rec.estimatedTripCost} | Duration: ${rec.tripDuration} days`);
            console.log(`   Crowd Level: ${rec.crowdLevel}`);
            console.log('--------------------------------------------------');
        });
        
    } catch (error) {
        console.error('Failed to query API:', error.message);
    }
};

testRecommendationAPI();
