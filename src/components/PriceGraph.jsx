import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { TrendingDown, TrendingUp, DollarSign } from 'lucide-react';

const PriceGraph = ({ flights }) => {
  if (!flights || flights.length === 0) {
    return null;
  }

  // Preparing data for the graph - group by price ranges
  const prepareGraphData = () => {
    const prices = flights
      .map((f) => parseFloat(f.price.total))
      .sort((a, b) => a - b);

    // Creating price buckets
    const minPrice = Math.floor(Math.min(...prices) / 50) * 50;
    const maxPrice = Math.ceil(Math.max(...prices) / 50) * 50;
    const bucketSize = (maxPrice - minPrice) / 10;

    const buckets = {};
    for (let i = 0; i <= 10; i++) {
      const bucketStart = minPrice + i * bucketSize;
      buckets[Math.round(bucketStart)] = 0;
    }

    // Counting flights in each bucket
    prices.forEach((price) => {
      const bucketKey =
        Math.floor((price - minPrice) / bucketSize) * bucketSize + minPrice;
      const roundedKey = Math.round(bucketKey);
      if (buckets[roundedKey] !== undefined) {
        buckets[roundedKey]++;
      }
    });

    return Object.keys(buckets).map((key) => ({
      price: `$${key}`,
      priceValue: parseInt(key),
      flights: buckets[key],
    }));
  };

  const graphData = prepareGraphData();
  const prices = flights.map((f) => parseFloat(f.price.total));
  const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-4 py-3 rounded-lg shadow-xl border-2 border-blue-200">
          <p className="text-sm font-semibold text-gray-800 mb-1">
            Price Range: {payload[0].payload.price}+
          </p>
          <p className="text-lg font-bold text-blue-600">
            {payload[0].value} flight{payload[0].value !== 1 ? 's' : ''}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 animate-fade-in">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <TrendingDown className="w-6 h-6 text-blue-600" />
            Price Distribution
          </h3>
          <div className="flex items-center gap-2 text-sm">
            <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full font-semibold">
              {flights.length} flights shown
            </div>
          </div>
        </div>

        {/* Price Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {/* Lowest Price Section */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-green-600" />
              <p className="text-xs font-semibold text-green-700 uppercase tracking-wide">
                Lowest Price
              </p>
            </div>
            <p className="text-3xl font-bold text-green-700">
              ${minPrice.toFixed(2)}
            </p>
          </div>

          {/* Average Price Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-blue-600" />
              <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                Average Price
              </p>
            </div>
            <p className="text-3xl font-bold text-blue-700">
              ${avgPrice.toFixed(2)}
            </p>
          </div>

          {/* Highest Price Section */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border-2 border-orange-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-orange-600" />
              <p className="text-xs font-semibold text-orange-700 uppercase tracking-wide">
                Highest Price
              </p>
            </div>
            <p className="text-3xl font-bold text-orange-700">
              ${maxPrice.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Graph Section */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={graphData}>
            <defs>
              <linearGradient id="colorFlights" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
            <XAxis
              dataKey="price"
              stroke="#6366f1"
              style={{ fontSize: '12px', fontWeight: '600' }}
            />
            <YAxis
              stroke="#6366f1"
              style={{ fontSize: '12px', fontWeight: '600' }}
              label={{
                value: 'Number of Flights',
                angle: -90,
                position: 'insideLeft',
                style: { fill: '#6366f1', fontWeight: '600' },
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="flights"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorFlights)"
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>

        <p className="text-center text-sm text-gray-600 mt-4">
          Price range distribution across all available flights
        </p>
      </div>
    </div>
  );
};

export default PriceGraph;
