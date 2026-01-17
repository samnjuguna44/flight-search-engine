import { useState, useEffect } from 'react';
import { Filter, DollarSign, Plane, Building2 } from 'lucide-react';

const FilterPanel = ({ flights, filters, onFilterChange }) => {
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice);
  const [selectedStops, setSelectedStops] = useState(filters.stops);
  const [selectedAirlines, setSelectedAirlines] = useState(filters.airlines);

  // Getting unique airlines from flights
  const airlines = [
    ...new Set(flights.map((f) => f.itineraries[0].segments[0].carrierCode)),
  ];

  // Getting price ranges
  const prices = flights.map((f) => parseFloat(f.price.total));
  const minPrice = Math.min(...prices);
  const maxPriceAvailable = Math.max(...prices);

  useEffect(() => {
    onFilterChange({
      maxPrice,
      stops: selectedStops,
      airlines: selectedAirlines,
    });
  }, [maxPrice, selectedStops, selectedAirlines]);

  const handleAirlineToggle = (airline) => {
    if (selectedAirlines.includes(airline)) {
      setSelectedAirlines(selectedAirlines.filter((a) => a !== airline));
    } else {
      setSelectedAirlines([...selectedAirlines, airline]);
    }
  };

  const resetFilters = () => {
    setMaxPrice(Infinity);
    setSelectedStops('all');
    setSelectedAirlines([]);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Filter className="w-5 h-5 text-blue-600" />
          Filters
        </h3>
        <button
          onClick={resetFilters}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          Reset All
        </button>
      </div>

      {/* Price Filter Section */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
          <DollarSign className="w-4 h-4 text-green-600" />
          Max Price
        </label>

        <div className="space-y-3">
          <input
            type="range"
            min={minPrice}
            max={maxPriceAvailable}
            step="10"
            value={maxPrice === Infinity ? maxPriceAvailable : maxPrice}
            onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
            className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              ${minPrice.toFixed(0)}
            </span>
            <span className="text-lg font-bold text-blue-600">
              {maxPrice === Infinity ? 'Any' : `$${maxPrice.toFixed(0)}`}
            </span>
            <span className="text-sm text-gray-600">
              ${maxPriceAvailable.toFixed(0)}
            </span>
          </div>
        </div>
      </div>

      {/* Stops Filter Section */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
          <Plane className="w-4 h-4 text-purple-600" />
          Number of Stops
        </label>

        <div className="space-y-2">
          {['all', '0', '1', '2'].map((stop) => (
            <label
              key={stop}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <input
                type="radio"
                name="stops"
                value={stop}
                checked={selectedStops === stop}
                onChange={(e) => setSelectedStops(e.target.value)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 font-medium">
                {stop === 'all'
                  ? 'Any number of stops'
                  : stop === '0'
                    ? 'Nonstop only'
                    : `Up to ${stop} stop${stop > 1 ? 's' : ''}`}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Airlines Filter Section */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
          <Building2 className="w-4 h-4 text-orange-600" />
          Airlines
        </label>

        <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
          {airlines.sort().map((airline) => {
            const count = flights.filter(
              (f) => f.itineraries[0].segments[0].carrierCode === airline
            ).length;

            return (
              <label
                key={airline}
                className="flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedAirlines.includes(airline)}
                    onChange={() => handleAirlineToggle(airline)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shadow-md">
                      {airline}
                    </div>
                    <span className="text-sm text-gray-700 font-medium">
                      {airline}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full font-semibold">
                  {count}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Active Filters Count */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 text-center border-2 border-blue-100">
          <p className="text-sm text-blue-800 font-bold">
            {selectedAirlines.length +
              (selectedStops !== 'all' ? 1 : 0) +
              (maxPrice !== Infinity ? 1 : 0)}{' '}
            active filter
            {selectedAirlines.length +
              (selectedStops !== 'all' ? 1 : 0) +
              (maxPrice !== Infinity ? 1 : 0) !==
            1
              ? 's'
              : ''}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
