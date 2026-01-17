import { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  CreditCard,
  Calendar,
  Lock,
  CheckCircle,
  Plane,
  Sparkles,
} from 'lucide-react';

const BookingForm = ({ flight, onClose, onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(4); // Move to the success step
    setTimeout(() => {
      onComplete();
    }, 3000);
  };

  const isStep1Valid =
    formData.firstName && formData.lastName && formData.email && formData.phone;
  const isStep2Valid =
    formData.cardNumber && formData.expiryDate && formData.cvv;

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>

      {/* Modal Section */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full animate-slide-up">
          {/* Progress Bar Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                      step >= s
                        ? 'bg-white text-blue-600'
                        : 'bg-blue-400 text-white'
                    }`}
                  >
                    {step > s ? <CheckCircle className="w-6 h-6" /> : s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 transition-all ${
                        step > s ? 'bg-white' : 'bg-blue-400'
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
            <div className="text-white text-center">
              <p className="text-sm opacity-90">
                {step === 1
                  ? 'Passenger Information'
                  : step === 2
                    ? 'Payment Details'
                    : step === 3
                      ? 'Review & Confirm'
                      : 'Booking Confirmed!'}
              </p>
            </div>
          </div>

          {/* Content Section*/}
          <div className="p-8">
            {/* Step 1: Passenger Information Section */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Passenger Details
                  </h3>
                  <p className="text-gray-600">
                    Please enter your information as it appears on your ID
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <User className="inline w-4 h-4 mr-1" />
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="John"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <User className="inline w-4 h-4 mr-1" />
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Mail className="inline w-4 h-4 mr-1" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="john.doe@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Phone className="inline w-4 h-4 mr-1" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={onClose}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleNextStep}
                    disabled={!isStep1Valid}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-3 px-6 rounded-xl transition-all"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Payment Information Section */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Payment Information
                  </h3>
                  <p className="text-gray-600">
                    Your payment is secure and encrypted
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <CreditCard className="inline w-4 h-4 mr-1" />
                    Card Number *
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    required
                    maxLength="19"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Calendar className="inline w-4 h-4 mr-1" />
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      required
                      placeholder="MM/YY"
                      maxLength="5"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Lock className="inline w-4 h-4 mr-1" />
                      CVV *
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      required
                      maxLength="3"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="123"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Billing Address *
                  </label>
                  <input
                    type="text"
                    name="billingAddress"
                    value={formData.billingAddress}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="123 Main St, City, Country"
                  />
                </div>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 flex items-start gap-3">
                  <Lock className="w-5 h-5 text-blue-600 mt-0.5" />
                  <p className="text-sm text-blue-800">
                    Your payment information is encrypted and secure. We use
                    industry-standard SSL encryption.
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handlePrevStep}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNextStep}
                    disabled={!isStep2Valid}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-3 px-6 rounded-xl transition-all"
                  >
                    Review Booking
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review & Confirm Section */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Review Your Booking
                  </h3>
                  <p className="text-gray-600">
                    Please verify all details before confirming
                  </p>
                </div>

                {/* Passenger Details Section */}
                <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                  <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    Passenger Information
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Name</p>
                      <p className="font-semibold text-gray-800">
                        {formData.firstName} {formData.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Email</p>
                      <p className="font-semibold text-gray-800">
                        {formData.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Phone</p>
                      <p className="font-semibold text-gray-800">
                        {formData.phone}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Flight Details Section */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
                  <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Plane className="w-5 h-5 text-blue-600" />
                    Flight Details
                  </h4>
                  <div className="text-sm space-y-2">
                    <p>
                      <span className="text-gray-600">Flight:</span>{' '}
                      <span className="font-semibold">
                        {flight.itineraries[0].segments[0].carrierCode}{' '}
                        {flight.itineraries[0].segments[0].number}
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-600">Route:</span>{' '}
                      <span className="font-semibold">
                        {flight.itineraries[0].segments[0].departure.iataCode} →{' '}
                        {
                          flight.itineraries[0].segments[
                            flight.itineraries[0].segments.length - 1
                          ].arrival.iataCode
                        }
                      </span>
                    </p>
                    <p className="text-2xl font-bold text-blue-600 mt-4">
                      {flight.price.currency}{' '}
                      {parseFloat(flight.price.total).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Payment Method Section */}
                <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                  <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    Payment Method
                  </h4>
                  <p className="text-sm font-semibold text-gray-800">
                    Card ending in {formData.cardNumber.slice(-4)}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl"
                  >
                    Confirm & Pay
                  </button>
                </form>
              </div>
            )}

            {/* Step 4: Success Section */}
            {step === 4 && (
              <div className="text-center py-12 animate-fade-in">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-green-400 opacity-20 blur-3xl animate-pulse"></div>
                  <CheckCircle className="w-32 h-32 text-green-500 relative animate-bounce-slow" />
                </div>

                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  Booking Confirmed! 🎉
                </h3>
                <p className="text-gray-600 mb-6">
                  Your flight has been successfully booked.
                  <br />
                  Confirmation details have been sent to{' '}
                  <span className="font-semibold">{formData.email}</span>
                </p>

                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200 mb-6">
                  <p className="text-sm text-gray-600 mb-2">
                    Booking Reference
                  </p>
                  <p className="text-3xl font-bold text-blue-600 tracking-wider">
                    {Math.random().toString(36).substr(2, 6).toUpperCase()}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                  <p>Have a wonderful flight!</p>
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
