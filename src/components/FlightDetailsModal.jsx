import {
  X,
  Plane,
  Clock,
  Calendar,
  User,
  CreditCard,
  CheckCircle,
  MapPin,
} from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';
import BookingForm from './BookingForm';

const FlightDetailsModal = ({ flight, onClose }) => {
  const [showBookingForm, setShowBookingForm] = useState(false)

  if (!flight) return null;

  const outbound = flight.itineraries[0];
  const firstSegment = outbound.segments[0];
  const lastSegment = outbound.segments[outbound.segments.length - 1];
  const stops = outbound.segments.length - 1;

  const formatTime = (dateTime) => format(new Date(dateTime), 'HH:mm');
  const formatDate = (dateTime) =>
    format(new Date(dateTime), 'EEEE, MMMM dd, yyyy');
  const formatDuration = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?/);
    const hours = match[1] ? match[1].replace('H', 'h ') : '';
    const minutes = match[2] ? match[2].replace('M', 'm') : '';
    return hours + minutes;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop Section */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Section */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>

          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-t-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                <Plane className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Flight Details</h2>
                <p className="text-blue-100 mt-1">Review your selection</p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            {/* Flight Route Summary */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-6 border-2 border-blue-100">
              <div className="flex items-center justify-between mb-4">
                <div className="text-center flex-1">
                  <p className="text-4xl font-bold text-gray-800 mb-2">
                    {firstSegment.departure.iataCode}
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatTime(firstSegment.departure.at)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(firstSegment.departure.at)}
                  </p>
                </div>

                <div className="flex-1 px-4">
                  <div className="relative">
                    <div className="h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 w-full"></div>
                    <Plane className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-blue-600 bg-white rounded-full p-1" />
                  </div>
                  <p className="text-center text-sm text-gray-600 mt-2">
                    {formatDuration(outbound.duration)}
                  </p>
                </div>

                <div className="text-center flex-1">
                  <p className="text-4xl font-bold text-gray-800 mb-2">
                    {lastSegment.arrival.iataCode}
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatTime(lastSegment.arrival.at)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(lastSegment.arrival.at)}
                  </p>
                </div>
              </div>

              <div className="flex justify-center gap-4 flex-wrap">
                <div className="bg-white px-4 py-2 rounded-full text-sm font-semibold text-gray-700 shadow-sm">
                  {stops === 0
                    ? '✈️ Direct Flight'
                    : `🛬 ${stops} Stop${stops > 1 ? 's' : ''}`}
                </div>
                <div className="bg-white px-4 py-2 rounded-full text-sm font-semibold text-gray-700 shadow-sm">
                  {firstSegment.carrierCode} {firstSegment.number}
                </div>
              </div>
            </div>

            {/* Detailed Segments */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Flight Itinerary
              </h3>

              <div className="space-y-4">
                {outbound.segments.map((segment, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-xl p-4 border-l-4 border-blue-500"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-bold text-gray-800 text-lg">
                          Flight {segment.carrierCode} {segment.number}
                        </p>
                        <p className="text-sm text-gray-600">
                          Operated by {segment.carrierCode}
                        </p>
                      </div>
                      <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                        Segment {index + 1}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Departure</p>
                        <p className="font-bold text-gray-800">
                          {segment.departure.iataCode}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatTime(segment.departure.at)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(segment.departure.at)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Arrival</p>
                        <p className="font-bold text-gray-800">
                          {segment.arrival.iataCode}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatTime(segment.arrival.at)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(segment.arrival.at)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatDuration(segment.duration)}
                      </span>
                      {segment.aircraft?.code && (
                        <span>Aircraft: {segment.aircraft.code}</span>
                      )}
                    </div>

                    {/* Layover info Section*/}
                    {index < outbound.segments.length - 1 && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-orange-600 font-semibold flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Layover at {segment.arrival.iataCode}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Price Breakdown Section */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 mb-6 border-2 border-green-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-green-600" />
                Price Breakdown
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Base Fare</span>
                  <span className="font-semibold text-gray-800">
                    {flight.price.currency}{' '}
                    {(parseFloat(flight.price.total) * 0.8).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Taxes & Fees</span>
                  <span className="font-semibold text-gray-800">
                    {flight.price.currency}{' '}
                    {(parseFloat(flight.price.total) * 0.2).toFixed(2)}
                  </span>
                </div>
                <div className="border-t-2 border-green-300 pt-3 flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-800">
                    Total Price
                  </span>
                  <span className="text-3xl font-bold text-green-600">
                    {flight.price.currency}{' '}
                    {parseFloat(flight.price.total).toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  <User className="w-3 h-3 inline mr-1" />
                  Price per person • All taxes included
                </p>
              </div>
            </div>

            {/* Important Info Section */}
            <div className="bg-blue-50 rounded-xl p-4 mb-6 border-l-4 border-blue-500">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                What's Included
              </h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✓ Seat selection available at check-in</li>
                <li>✓ 1 carry-on bag and 1 personal item</li>
                <li>✓ Standard checked baggage (fees may apply)</li>
                <li>✓ In-flight entertainment</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 px-6 rounded-xl transition-colors"
              >
                Back to Results
              </button>
              <button
                  onClick={() => setShowBookingForm(true)}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Proceed to Book
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
          <BookingForm
              flight={flight}
              onClose={() => setShowBookingForm(false)}
              onComplete={() => {
                setShowBookingForm(false);
                onClose();
              }}
          />
      )}
    </div>
  );
};

export default FlightDetailsModal;
