import { useState, useEffect, useRef } from 'react';
import { MapPin, Plane, Search } from 'lucide-react';
import axios from 'axios';

const AirportAutocomplete = ({ value, onChange, placeholder, label, icon: Icon = MapPin }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const wrapperRef = useRef(null);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

    // NEW: Reset query when value is cleared from parent
    useEffect(() => {
        if (value === '') {
            setQuery('');
            setIsSelected(false);
            setSuggestions([]);
            setIsOpen(false);
        }
    }, [value]);

    // Closing the dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Searching airports as user types with proper debounce
    useEffect(() => {
        // Don't search if user has already selected an airport
        if (isSelected) {
            return;
        }

        const searchAirports = async () => {
            if (query.length < 3) {
                setSuggestions([]);
                setIsOpen(false);
                return;
            }

            setIsLoading(true);
            try {
                console.log('Searching for:', query);
                const response = await axios.get(`${API_URL}/airports`, {
                    params: { keyword: query }
                });

                console.log('Results:', response.data.data?.length || 0);
                setSuggestions(response.data.data || []);
                setIsOpen(true);
            } catch (error) {
                console.error('Error searching airports:', error);
                setSuggestions([]);
            } finally {
                setIsLoading(false);
            }
        };

        // Debounce: wait 500ms after user stops typing
        const timeoutId = setTimeout(searchAirports, 500);

        // Cleanup: cancel the previous timeout when query changes
        return () => clearTimeout(timeoutId);
    }, [query, API_URL, isSelected]);

    const handleSelect = (location) => {
        const displayText = `${location.name} (${location.iataCode})`;
        setQuery(displayText);
        onChange(location.iataCode);
        setIsOpen(false);
        setIsSelected(true);
        setSuggestions([]);
    };

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setQuery(newValue);
        setIsSelected(false);

        // If a user clears the input, clear the parent value too
        if (newValue === '') {
            onChange('');
            setSuggestions([]);
            setIsOpen(false);
            setIsSelected(false);
        }
    };

    const handleFocus = () => {
        // Only reopen dropdown if user hasn't selected and there are suggestions
        if (!isSelected && query.length >= 3 && suggestions.length > 0) {
            setIsOpen(true);
        }
    };

    return (
        <div ref={wrapperRef} className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                <Icon className="inline w-4 h-4 mr-1" />
                {label}
            </label>

            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    placeholder={placeholder}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {isLoading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
                    ) : isSelected ? (
                        <div className="text-green-500">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                    ) : (
                        <Search className="w-5 h-5 text-gray-400" />
                    )}
                </div>
            </div>

            {/* Suggestions Dropdown Section */}
            {isOpen && suggestions.length > 0 && !isSelected && (
                <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-xl border border-gray-200 max-h-64 overflow-y-auto custom-scrollbar">
                    {suggestions.map((location) => (
                        <button
                            key={location.id}
                            onClick={() => handleSelect(location)}
                            type="button"
                            className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
                        >
                            <div className="flex items-start gap-3">
                                <div className="bg-blue-100 rounded-lg p-2 mt-1">
                                    {location.subType === 'AIRPORT' ? (
                                        <Plane className="w-4 h-4 text-blue-600" />
                                    ) : (
                                        <MapPin className="w-4 h-4 text-blue-600" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-800">
                                        {location.name}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {location.address?.cityName && `${location.address.cityName}, `}
                                        {location.address?.countryName}
                                    </p>
                                    <p className="text-xs text-blue-600 font-bold mt-1">
                                        {location.iataCode}
                                    </p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {/* No results message Section */}
            {isOpen && !isLoading && query.length >= 3 && suggestions.length === 0 && !isSelected && (
                <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-xl border border-gray-200 px-4 py-3">
                    <p className="text-sm text-gray-600">
                        No airports found for "{query}". Try using the full city name or airport code.
                    </p>
                </div>
            )}

            {/* Hint when typing */}
            {query.length > 0 && query.length < 3 && !isSelected && (
                <div className="absolute z-50 w-full mt-1 bg-blue-50 rounded-lg border border-blue-200 px-4 py-2">
                    <p className="text-xs text-blue-700">
                        Type at least 3 characters to search...
                    </p>
                </div>
            )}
        </div>
    );
};

export default AirportAutocomplete;