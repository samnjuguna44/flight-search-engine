import axios from 'axios';

const API_KEY = import.meta.env.VITE_AMADEUS_API_KEY;
const API_SECRET = import.meta.env.VITE_AMADEUS_API_SECRET;
const BASE_URL = 'https://test.api.amadeus.com/v1';

let accessToken = null;
let tokenExpiry = null;

// Getting the access token
const getAccessToken = async () => {
    if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
        return accessToken;
    }

    try {
        const response = await axios.post(
            'https://test.api.amadeus.com/v1/security/oauth2/token',
            new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: API_KEY,
                client_secret: API_SECRET,
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        accessToken = response.data.access_token;
        tokenExpiry = Date.now() + (response.data.expires_in * 1000);
        return accessToken;
    } catch (error) {
        console.error('Error getting access token:', error);
        throw error;
    }
};

// Function to search for flights
export const searchFlights = async (searchParams) => {
    try {
        const token = await getAccessToken();
        const response = await axios.get(`${BASE_URL}/shopping/flight-offers`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                originLocationCode: searchParams.origin,
                destinationLocationCode: searchParams.destination,
                departureDate: searchParams.departureDate,
                returnDate: searchParams.returnDate,
                adults: searchParams.adults || 1,
                max: 50,
            },
        });

        return response.data.data;
    } catch (error) {
        console.error('Error searching flights:', error.response?.data || error);
        throw error;
    }
};