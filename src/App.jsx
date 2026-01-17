import { useState } from 'react';
import SearchForm from './components/SearchForm';
import FlightResults from './components/FlightResults';
import FilterPanel from './components/FilterPanel';
import PriceGraph from './components/PriceGraph';
import { searchFlights } from './services/amadeusApi';
import { Plane } from 'lucide-react';

function App() {
    const [flights, setFlights] = useState([]);
    const [filteredFlights, setFilteredFlights] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filters, setFilters] = useState({
        maxPrice: Infinity,
        stops: 'all',
        airlines: [],
    });

    const handleSearch = async (searchParams) => {
        setIsLoading(true);
        try {
            const results = await searchFlights(searchParams);
            setFlights(results);
            setFilteredFlights(results);
        } catch (error) {
            console.error('Search error:', error);
            alert('Error searching flights. Please check your search parameters and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);

        let filtered = [...flights];

        // Filtering by price
        if (newFilters.maxPrice !== Infinity) {
            filtered = filtered.filter(f => parseFloat(f.price.total) <= newFilters.maxPrice);
        }

        // Filtering by stops
        if (newFilters.stops !== 'all') {
            const maxStops = parseInt(newFilters.stops);
            filtered = filtered.filter(f => {
                const stops = f.itineraries[0].segments.length - 1;
                return stops <= maxStops;
            });
        }

        // Filtering by airlines
        if (newFilters.airlines.length > 0) {
            filtered = filtered.filter(f =>
                newFilters.airlines.includes(f.itineraries[0].segments[0].carrierCode)
            );
        }

        setFilteredFlights(filtered);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Animated Background Pattern */}
            <div className="fixed inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-20 left-10 animate-float">
                    <Plane className="w-24 h-24 text-blue-400 transform rotate-45" />
                </div>
                <div className="absolute top-40 right-20 animate-float-delay">
                    <Plane className="w-32 h-32 text-purple-400 transform -rotate-12" />
                </div>
                <div className="absolute bottom-40 left-1/4 animate-float-slow">
                    <Plane className="w-20 h-20 text-indigo-400 transform rotate-90" />
                </div>
            </div>

            {/* Header Section*/}
            <header className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    <div className="flex items-center justify-center gap-4 animate-fade-in">
                        <Plane className="w-10 h-10 sm:w-12 sm:h-12 animate-bounce-slow" />
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                            SkySearch
                        </h1>
                    </div>
                    <p className="text-center mt-3 text-blue-100 text-sm sm:text-base animate-fade-in-delay">
                        Find your perfect flight at the best price
                    </p>
                </div>
                {/* Wave decoration */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg className="w-full h-6 sm:h-8" viewBox="0 0 1200 40" preserveAspectRatio="none">
                        <path d="M0,20 Q300,0 600,20 T1200,20 L1200,40 L0,40 Z" fill="rgb(239, 246, 255)" />
                    </svg>
                </div>
            </header>

            {/* Main Content Section*/}
            <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search Form */}
                <div className="animate-slide-up">
                    <SearchForm onSearch={handleSearch} isLoading={isLoading} />
                </div>

                {/* Results Section */}
                {flights.length > 0 && (
                    <div className="mt-8 animate-fade-in">
                        {/* Price Graph */}
                        <div className="mb-8">
                            <PriceGraph flights={filteredFlights} />
                        </div>

                        {/* Filter & Results Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                            {/* Filters - Sidebar on desktop, top on mobile */}
                            <div className="lg:col-span-1">
                                <FilterPanel
                                    flights={flights}
                                    filters={filters}
                                    onFilterChange={handleFilterChange}
                                />
                            </div>

                            {/* Flight Results Section*/}
                            <div className="lg:col-span-3">
                                <FlightResults flights={filteredFlights} isLoading={isLoading} />
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Footer Section */}
            <footer className="relative mt-20 bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-sm text-gray-400">
                        © 2026 SkySearch. Powered by Amadeus API.
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default App;