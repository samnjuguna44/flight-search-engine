const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.AMADEUS_API_KEY;
const API_SECRET = process.env.AMADEUS_API_SECRET;

let accessToken = null;
let tokenExpiry = null;

// Getting the Amadeus token
async function getAccessToken() {
    if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
        return accessToken;
    }

    try {
        console.log('🔑 Requesting new access token...');

        const response = await axios.post(
            'https://test.api.amadeus.com/v1/security/oauth2/token',
            new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: API_KEY,
                client_secret: API_SECRET,
            }),
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }
        );

        accessToken = response.data.access_token;
        tokenExpiry = Date.now() + response.data.expires_in * 1000;
        console.log('✅ Access token obtained successfully');
        return accessToken;
    } catch (error) {
        console.error('❌ Token error:', error.response?.data || error.message);
        throw error;
    }
}

// Searching flights endpoint
app.get('/api/flights', async (req, res) => {
    console.log('🔍 Flight search request:', req.query);

    try {
        const token = await getAccessToken();
        console.log('📡 Calling Amadeus Flight Offers API...');

        const response = await axios.get(
            'https://test.api.amadeus.com/v2/shopping/flight-offers',
            {
                headers: { Authorization: `Bearer ${token}` },
                params: req.query,
            }
        );

        console.log('✅ Amadeus data received:', response.data.data.length, 'flights');
        res.json(response.data);
    } catch (error) {
        console.error('❌ Amadeus API Error:', error.response?.data || error.message);
        res.status(500).json({
            error: 'Failed to fetch flights',
            details: error.response?.data || error.message
        });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
    console.log(`🔍 Flight search endpoint: http://localhost:${PORT}/api/flights`);
});