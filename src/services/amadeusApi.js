import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const searchFlights = async (searchParams) => {
  try {
    const response = await axios.get(`${BASE_URL}/flights`, {
      params: {
        originLocationCode: searchParams.origin.toUpperCase(),
        destinationLocationCode: searchParams.destination.toUpperCase(),
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
