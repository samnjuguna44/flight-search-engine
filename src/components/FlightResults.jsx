import { Plane, Clock, Calendar, TrendingDown, Zap, Coffee } from 'lucide-react';
import { format } from 'date-fns';

const FlightResults = ({ flights, isLoading }) => {
    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center py-20">
                <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 absolute top-0"></div>
                </div>
                <p className="mt-6 text-gray-600 animate-pulse">Searching for the best flights...</p>
                <Plane className="w-8 h-8 text-blue-500 mt-4 animate-bounce-slow" />
            </div>
        );
    }

    if (!flights || flights.length === 0) {
        return (
            <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
                <div className="relative inline-block">
                    <Plane className="w-24 h-24 mx-auto mb-6 text-gray-300 animate-float" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 blur-xl"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No Flights Found</h3>
                <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
        );
    }

    const formatDuration = (duration) => {
        const match = duration.match(/PT(\d+H)?(\d+M)?/);
        const hours = match[1] ? match[1].replace('H', 'h ') : '';
        const minutes = match[2] ? match[2].replace('M', 'm') : '';
        return hours + minutes;
    };

    const formatTime = (dateTime) => {
        return format(new Date(dateTime), 'HH:mm');
    };

    const formatDate = (dateTime) => {
        return format(new Date(dateTime), 'MMM dd');
    };

    // Getting the best deal badge
    const getBestDealIndex = () => {
        if (!flights.length) return -1;
        return flights.reduce((bestIdx, flight, idx, arr) =>
                parseFloat(flight.price.total) < parseFloat(arr[bestIdx].price.total) ? idx : bestIdx
            , 0);
    };

    const bestDealIndex = getBestDealIndex();

    return (
        <div className="space-y-6">
            {/* Results Header Section*/}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                            {flights.length} Flight{flights.length !== 1 ? 's' : ''} Available
                        </h3>
                        <p className="text-blue-100 text-sm sm:text-base">
                            Sorted by best value for your journey
                        </p>
                    </div>
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                        <TrendingDown className="w-5 h-5" />
                        <span className="text-sm font-semibold">Best Prices</span>
                    </div>
                </div>
            </div>

            {/* Flight Cards Section*/}
            {flights.map((flight, index) => {
                const outbound = flight.itineraries[0];
                const firstSegment = outbound.segments[0];
                const lastSegment = outbound.segments[outbound.segments.length - 1];
                const stops = outbound.segments.length - 1;
                const price = flight.price.total;
                const currency = flight.price.currency;
                const isBestDeal = index === bestDealIndex;

                return (
                    <div
                        key={flight.id || index}
                        className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 sm:p-8 transform hover:-translate-y-1 ${
                            isBestDeal ? 'ring-4 ring-green-400' : ''
                        }`}
                        style={{
                            animation: `slide-up 0.5s ease-out ${index * 0.1}s both`
                        }}
                    >
                        {/* Best Deal Badge Section*/}
                        {isBestDeal && (
                            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-bounce-slow">
                                <Zap className="w-4 h-4" />
                                <span className="font-bold text-sm">Best Deal</span>
                            </div>
                        )}

                        {/* Airline Header */}
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-md">
                                    {firstSegment.carrierCode}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800 text-lg">
                                        {firstSegment.carrierCode} {firstSegment.number}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {firstSegment.aircraft?.code || 'Aircraft'}
                                    </p>
                                </div>
                            </div>

                            {/* Nonstop Badge */}
                            {stops === 0 && (
                                <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                    <Zap className="w-3 h-3" />
                                    Nonstop
                                </div>
                            )}
                        </div>

                        {/* Flight Route */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-6">
                            {/* Departure */}
                            <div className="flex-1">
                                <p className="text-4xl sm:text-5xl font-bold text-gray-800 mb-1">
                                    {formatTime(firstSegment.departure.at)}
                                </p>
                                <p className="text-lg font-semibold text-gray-600 mb-1">
                                    {firstSegment.departure.iataCode}
                                </p>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Calendar className="w-4 h-4" />
                                    {formatDate(firstSegment.departure.at)}
                                </div>
                            </div>

                            {/* Journey Info - Center */}
                            <div className="flex-1 flex flex-col items-center justify-center px-4 py-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                                {/* Plane Animation Line */}
                                <div className="relative w-full flex items-center justify-center mb-3">
                                    <div className="h-0.5 bg-gradient-to-r from-blue-300 via-purple-300 to-blue-300 w-full"></div>
                                    <div className="absolute bg-white p-2 rounded-full shadow-md">
                                        <Plane className="w-5 h-5 text-blue-600 transform rotate-90" />
                                    </div>
                                </div>

                                <p className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {formatDuration(outbound.duration)}
                                </p>

                                <div className="flex items-center gap-2">
                                    {stops === 0 ? (
                                        <span className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      Direct Flight
                    </span>
                                    ) : (
                                        <span className="text-xs font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded-full flex items-center gap-1">
                      <Coffee className="w-3 h-3" />
                                            {stops} stop{stops > 1 ? 's' : ''}
                    </span>
                                    )}
                                </div>
                            </div>

                            {/* Arrival */}
                            <div className="flex-1 text-left sm:text-right">
                                <p className="text-4xl sm:text-5xl font-bold text-gray-800 mb-1">
                                    {formatTime(lastSegment.arrival.at)}
                                </p>
                                <p className="text-lg font-semibold text-gray-600 mb-1">
                                    {lastSegment.arrival.iataCode}
                                </p>
                                <div className="flex items-center gap-2 text-sm text-gray-500 sm:justify-end">
                                    <Calendar className="w-4 h-4" />
                                    {formatDate(lastSegment.arrival.at)}
                                </div>
                            </div>
                        </div>

                        {/* Layover Details */}
                        {stops > 0 && (
                            <div className="mb-6 p-4 bg-orange-50 rounded-xl border-l-4 border-orange-400">
                                <p className="text-sm text-orange-800 font-medium flex items-center gap-2">
                                    <Coffee className="w-4 h-4" />
                                    Layover{stops > 1 ? 's' : ''}: {' '}
                                    {outbound.segments.slice(0, -1).map((seg, i) => (
                                        <span key={i} className="font-bold">
                      {seg.arrival.iataCode}
                                            {i < stops - 1 ? ', ' : ''}
                    </span>
                                    ))}
                                </p>
                            </div>
                        )}

                        {/* Price & CTA */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t-2 border-gray-100">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                                    Total Price
                                </p>
                                <p className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    {currency} {parseFloat(price).toFixed(2)}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    per person • All taxes included
                                </p>
                            </div>

                            <button className="w-full sm:w-auto group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Select Flight
                  <Plane className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </span>
                                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-xl transition-opacity"></div>
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default FlightResults;