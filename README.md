# ✈️ SkySearch - Flight Search Engine

A modern, responsive flight search application built with React and powered by the Amadeus API. This project demonstrates advanced frontend development skills, real-time data filtering, interactive visualizations, and exceptional UX design.

![SkySearch Banner](https://img.shields.io/badge/Status-Live-success) ![React](https://img.shields.io/badge/React-18.x-blue) ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.x-38bdf8)

## 🌟 Features

### Core Functionality
- **✈️ Real-time Flight Search**: Search flights between any two airports using IATA codes
- **📊 Live Price Graph**: Interactive price distribution chart using Recharts that updates instantly with filters
- **🎯 Advanced Filtering System**:
    - Filter by maximum price with real-time slider
    - Filter by number of stops (Nonstop, 1 stop, 2 stops)
    - Filter by multiple airlines simultaneously
    - All filters update both the flight list AND price graph in real-time
- **📱 Fully Responsive Design**: Optimized layouts for mobile, tablet, and desktop devices
- **🎨 Modern UI/UX**: Beautiful gradients, animations, and intuitive user flows

### Extra Polish Features
- **🎫 Interactive Flight Details Modal**: Comprehensive flight information with:
    - Complete itinerary breakdown with all segments
    - Layover information and timing
    - Price breakdown (base fare + taxes)
    - What's included section
- **💳 Multi-step Booking Flow**:
    - Step 1: Passenger information collection
    - Step 2: Secure payment details entry
    - Step 3: Review and confirmation
    - Step 4: Booking success with reference number
    - Progress indicator showing current step
- **🏆 Best Deal Badge**: Automatically highlights the cheapest flight
- **⚡ Loading States**: Smooth loading animations and skeleton screens
- **🎭 Micro-interactions**: Hover effects, transitions, and delightful animations throughout

## 🚀 Live Demo

**Live Application**: [Your Vercel URL here]

**Demo Video**: [Your Loom Video URL here]

## 🛠️ Technology Stack

### Frontend
- **React 18.x** - Modern React with Hooks
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Composable charting library for React
- **Lucide React** - Beautiful & consistent icon set
- **date-fns** - Modern JavaScript date utility library
- **Axios** - Promise-based HTTP client

### Backend
- **Node.js + Express** - RESTful API server
- **Amadeus API** - Real flight data from Amadeus Self-Service API (Test Environment)

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Amadeus API credentials ([Get them here](https://developers.amadeus.com/))

### 1. Clone the Repository
```bash
git clone https://github.com/samnjuguna44/flight-search-engine.git
cd flight-search-engine
```

### 2. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd server
npm install
```

### 3. Environment Configuration

**Frontend `.env` file (root directory):**
```env
VITE_API_URL=http://localhost:3001/api
```

**Backend `server/.env` file:**
```env
AMADEUS_API_KEY=your_api_key_here
AMADEUS_API_SECRET=your_api_secret_here
```

### 4. Run the Application

**Option A: Run Backend and Frontend Separately**

Terminal 1 (Backend):
```bash
cd server
node index.js
```

Terminal 2 (Frontend):
```bash
npm run dev
```

**Option B: Run Both Together** (if you set up concurrently):
```bash
npm start
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3001`

## 📖 Usage Guide

### Searching for Flights

1. **Enter Origin**: Airport code (e.g., NBO for Nairobi)
2. **Enter Destination**: Airport code (e.g., LHR for London)
3. **Select Dates**: Departure and optional return date
4. **Number of Passengers**: Adults traveling
5. **Click Search**: View real-time results

### Using Filters

- **Price Filter**: Drag the slider to set maximum price
- **Stops Filter**: Select nonstop only, 1 stop max, or 2 stops max
- **Airlines Filter**: Check/uncheck airlines to filter
- Watch the graph and results update in real-time!

### Booking a Flight

1. Click **"Select Flight"** on any result
2. Review detailed flight information in the modal
3. Click **"Proceed to Book"**
4. Fill in passenger details (Step 1)
5. Enter payment information (Step 2)
6. Review all details (Step 3)
7. Confirm the booking and receive the reference number (Step 4)

## 🏗️ Project Structure
```
flight-search-engine/
├── public/                 # Static assets
├── server/                 # Backend Express server
│   ├── index.js           # Main server file with API routes
│   ├── .env               # Backend environment variables
│   └── package.json       # Backend dependencies
├── src/
│   ├── components/        # React components
│   │   ├── SearchForm.jsx          # Flight search form
│   │   ├── FlightResults.jsx       # Flight cards display
│   │   ├── FilterPanel.jsx         # Filtering sidebar
│   │   ├── PriceGraph.jsx          # Price distribution chart
│   │   ├── FlightDetailsModal.jsx  # Flight details popup
│   │   └── BookingForm.jsx         # Multi-step booking flow
│   ├── services/
│   │   └── amadeusApi.js  # API service layer
│   ├── App.jsx            # Main application component
│   ├── index.css          # Global styles + Tailwind
│   └── main.jsx           # Application entry point
├── .env                   # Frontend environment variables
├── package.json           # Frontend dependencies
├── tailwind.config.js     # Tailwind configuration
├── vite.config.js         # Vite configuration
└── README.md              # This file
```

## 🎨 Design Decisions

### Visual Design
- **Gradient Color Scheme**: Blue to purple gradients for a modern, premium feel
- **Glassmorphism Effects**: Subtle backdrop blur effects for depth
- **Micro-animations**: Smooth transitions and hover effects for better UX
- **Consistent Spacing**: 8px grid system for visual harmony

### UX Patterns
- **Progressive Disclosure**: Information revealed as needed (modals, forms)
- **Immediate Feedback**: Real-time filter updates, loading states
- **Clear Visual Hierarchy**: Size, color, and spacing guide user attention
- **Mobile-First**: Designed for mobile, enhanced for desktop

### Performance Optimizations
- **Debounced Filtering**: Smooth filter interactions
- **Optimized Re-renders**: React state management best practices
- **Lazy Loading**: Components load as needed
- **Efficient Data Structures**: Optimized filtering algorithms

## 🔐 API Architecture

### Backend Endpoints

**GET `/api/flights`**
- Search for flights based on query parameters
- Handles authentication with Amadeus API
- Returns flight offers with pricing

**Query Parameters:**
- `originLocationCode` (required): IATA airport code
- `destinationLocationCode` (required): IATA airport code
- `departureDate` (required): YYYY-MM-DD format
- `returnDate` (optional): YYYY-MM-DD format
- `adults` (optional): Number of passengers (default: 1)
- `max` (optional): Maximum results (default: 50)

### Security
- API credentials stored in environment variables
- CORS configured for frontend-backend communication
- Token caching to minimize API calls

## 🚢 Deployment

### Deploying to Vercel

**Frontend:**
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard:
    - `VITE_API_URL`: Your backend API URL
3. Deploy!

**Backend:**
You can deploy the backend to:
- **Vercel** (as serverless functions)
- **Heroku**
- **Railway**
- **Render**

Make sure to:
1. Set `AMADEUS_API_KEY` and `AMADEUS_API_SECRET` environment variables
2. Update frontend `VITE_API_URL` to point to deployed backend

### Build for Production
```bash
# Frontend
npm run build

# Backend (if needed)
cd server
# No build needed for Node.js
```

## 🧪 Testing the Application

### Manual Testing Checklist

- [ ] Search for flights with valid airport codes
- [ ] Test responsive design on mobile, tablet, desktop
- [ ] Apply price filter and verify results update
- [ ] Apply stops filter and verify results update
- [ ] Apply airline filters and verify results update
- [ ] Verify price graph updates with filters
- [ ] Click "Select Flight" and verify modal opens
- [ ] Complete booking flow through all 4 steps
- [ ] Test with different date ranges
- [ ] Test with return vs one-way flights

### Sample Airport Codes for Testing
- **NBO** - Nairobi, Kenya
- **LHR** - London Heathrow, UK
- **JFK** - New York JFK, USA
- **LAX** - Los Angeles, USA
- **DXB** - Dubai, UAE
- **SIN** - Singapore
- **CDG** - Paris Charles de Gaulle, France

## 📝 Technical Requirements Checklist

✅ **Search & Results**: Origin, Destination, Dates inputs feeding clear flight results  
✅ **Live Price Graph**: Visual graph showing price trends, updates with filters  
✅ **Complex Filtering**: Simultaneous filters (Stops + Price + Airline) updating both list and graph  
✅ **Responsive Design**: Fully functional on mobile and desktop  
✅ **Real API Integration**: Using Amadeus Self-Service API  
✅ **Extra Polish**: Interactive modals, booking flow, animations, best deal badges

## 🎯 Improvements & Future Enhancements

- **User Authentication**: Save searches and bookings to user accounts
- **Multi-city Search**: Support for complex itineraries
- **Price Alerts**: Notify users when prices drop
- **Seat Selection**: Visual seat map for booking
- **Payment Integration**: Real payment gateway (Stripe/PayPal)
- **Booking Management**: View and manage existing bookings
- **Internationalization**: Multi-language support
- **Accessibility**: WCAG 2.1 AA compliance

## 🤝 Contributing

This is a take-home assessment project, but feedback is welcome!

## 📄 License

This project is created as part of a technical assessment.

## 👤 Author

**Samson Gicheru Njuguna**
- GitHub: samsongich44@gmail.com
- LinkedIn: https://www.linkedin.com/in/samson-njuguna-6152a8164/

## 🙏 Acknowledgments

- **Amadeus API** for providing comprehensive flight data
- **Recharts** for the excellent charting library
- **Tailwind CSS** for making styling a breeze
- **Lucide Icons** for beautiful, consistent icons

---

**Built with ❤️ and ☕ in Nairobi**

*Note: This application uses the Amadeus Test API environment. In production, you would use the production API with appropriate error handling and rate limiting.*