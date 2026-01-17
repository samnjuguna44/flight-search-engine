import { useState } from 'react';
import { Search, Calendar, Users, RotateCcw } from 'lucide-react';
import AirportAutocomplete from './AirportAutocomplete';

const SearchForm = ({ onSearch, isLoading, onClear }) => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    adults: 1,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validating that we have IATA codes
    if (!formData.origin || !formData.destination) {
      alert('Please select both origin and destination airports');
      return;
    }

    onSearch(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAirportChange = (field, iataCode) => {
    setFormData({
      ...formData,
      [field]: iataCode,
    });
  };

  // Clearing all form data
  const handleClear = () => {
    setFormData({
      origin: '',
      destination: '',
      departureDate: '',
      returnDate: '',
      adults: 1,
    });

    // Calling the parent's onClear if provided
    if (onClear) {
      onClear();
    }
  };

  // Checking if the form has any values (for enabling/disabling the Clear button)
  const hasFormValues = () => {
    return (
        formData.origin !== '' ||
        formData.destination !== '' ||
        formData.departureDate !== '' ||
        formData.returnDate !== ''
    );
  };

  return (
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Search Flights</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Origin - Autocomplete Section */}
            <AirportAutocomplete
                value={formData.origin}
                onChange={(iataCode) => handleAirportChange('origin', iataCode)}
                placeholder="e.g., London, New York, Paris"
                label="From"
            />

            {/* Destination - Autocomplete Section */}
            <AirportAutocomplete
                value={formData.destination}
                onChange={(iataCode) => handleAirportChange('destination', iataCode)}
                placeholder="e.g., London, New York, Paris"
                label="To"
            />

            {/* Departure Date Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline w-4 h-4 mr-1" />
                Departure Date
              </label>
              <input
                  type="date"
                  name="departureDate"
                  value={formData.departureDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Return Date Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline w-4 h-4 mr-1" />
                Return Date
              </label>
              <input
                  type="date"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleChange}
                  min={formData.departureDate || new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Adults Input Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="inline w-4 h-4 mr-1" />
                Adults
              </label>
              <input
                  type="number"
                  name="adults"
                  value={formData.adults}
                  onChange={handleChange}
                  min="1"
                  max="9"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Buttons Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search Button */}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                  <span>Searching...</span>
              ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Search Flights
                  </>
              )}
            </button>

            {/* Clear Button - Disabled when the form is empty */}
            {onClear && (
                <button
                    type="button"
                    onClick={handleClear}
                    disabled={!hasFormValues()}
                    className="w-full bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed text-gray-700 font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Clear Search
                </button>
            )}
          </div>
        </form>
      </div>
  );
};

export default SearchForm;