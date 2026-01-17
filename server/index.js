const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS configuration - Update with your actual frontend URL after deployment
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://flight-search-engine-wk6c.vercel.app',
    'https://flight-search-engine-wk6c-d3cgmuwa4-samnjuguna44s-projects.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
}));

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

// Health checking endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Flight Search API is running',
    endpoints: {
      flights: '/api/flights',
      airports: '/api/airports',
    }
  });
});

// Airport/City searching endpoint
app.get('/api/airports', async (req, res) => {
  const { keyword } = req.query;

  if (!keyword || keyword.length < 2) {
    return res.json({ data: [] });
  }

  try {
    const token = await getAccessToken();

    const response = await axios.get(
        'https://test.api.amadeus.com/v1/reference-data/locations',
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            keyword: keyword,
            subType: 'CITY,AIRPORT',
            'page[limit]': 10
          },
        }
    );

    console.log(`✅ Found ${response.data.data.length} locations for "${keyword}"`);
    res.json(response.data);
  } catch (error) {
    console.error('❌ Airport search error:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to search airports',
      details: error.response?.data || error.message,
    });
  }
});


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

    console.log(
        '✅ Amadeus data received:',
        response.data.data.length,
        'flights'
    );
    res.json(response.data);
  } catch (error) {
    console.error(
        '❌ Amadeus API Error:',
        error.response?.data || error.message
    );
    res.status(500).json({
      error: 'Failed to fetch flights',
      details: error.response?.data || error.message,
    });
  }
});

// For Vercel serverless deployment
const PORT = process.env.PORT || 3001;

// Only listening if not in Vercel environment
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
    console.log(
        `🔍 Flight search endpoint: http://localhost:${PORT}/api/flights`
    );
    console.log(`✈️  Airport search endpoint: http://localhost:${PORT}/api/airports`);
  });
}

// Export for Vercel
module.exports = app;