import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ItineraryPlanner = () => {
  const [days, setDays] = useState(2);
  const [interest, setInterest] = useState("Nature");
  const [showItinerary, setShowItinerary] = useState(false);
  const [showChatPopup, setShowChatPopup] = useState(false);
  const [budget, setBudget] = useState(5000);

  let selectedBudgetType = "";

  if (budget <= 5000) {
    selectedBudgetType = "Low";
  } else if (budget > 5000 && budget <= 12000) {
    selectedBudgetType = "Medium";
  } else {
    selectedBudgetType = "High";
  }

  // Demo itinerary data
  const itineraryData = {
    Low: [
      {
        day: 1,
        activities: [
          {
            time: "09:00 AM",
            activity: "Visit Rock Garden (Free Entry)",
            location: "Ranchi",
          },
          {
            time: "12:00 PM",
            activity: "Lunch under ₹150 (Street Food)",
            location: "Kanke Road",
          },
          {
            time: "02:00 PM",
            activity: "Ranchi Lake Boating (₹40 Ticket)",
            location: "Ranchi",
          },
          {
            time: "05:30 PM",
            activity: "Visit Tagore Hill (Free)",
            location: "Ranchi",
          },
        ],
      },
      {
        day: 2,
        activities: [
          {
            time: "08:00 AM",
            activity: "Bus to Dassam Falls (₹80)",
            location: "Taimara",
          },
          {
            time: "12:00 PM",
            activity: "Budget Lunch (₹120)",
            location: "Falls Area",
          },
          {
            time: "03:00 PM",
            activity: "Local Market Visit",
            location: "Ranchi",
          },
          {
            time: "06:30 PM",
            activity: "Dinner under ₹200",
            location: "Main Road",
          },
        ],
      },
    ],

    Medium: [
      {
        day: 1,
        activities: [
          {
            time: "09:00 AM",
            activity: "Hundru Falls (Taxi ₹2000 split)",
            location: "Ranchi",
          },
          {
            time: "12:30 PM",
            activity: "Lunch at Kaveri Restaurant (₹400)",
            location: "Ranchi",
          },
          {
            time: "02:30 PM",
            activity: "Tribal Museum (₹50 Ticket)",
            location: "Ranchi",
          },
          {
            time: "05:00 PM",
            activity: "Patratu Valley Drive (₹1500 Car)",
            location: "Patratu",
          },
        ],
      },
      {
        day: 2,
        activities: [
          {
            time: "08:30 AM",
            activity: "Netarhat Day Trip (₹3500 Car)",
            location: "Netarhat",
          },
          { time: "12:00 PM", activity: "Lunch (₹300)", location: "Netarhat" },
          {
            time: "03:00 PM",
            activity: "Visit Lodh Falls",
            location: "Netarhat",
          },
          {
            time: "06:00 PM",
            activity: "Sunset Point (Free)",
            location: "Netarhat",
          },
        ],
      },
    ],

    High: [
      {
        day: 1,
        activities: [
          {
            time: "08:00 AM",
            activity: "Private SUV Day Rental (₹6000)",
            location: "Ranchi",
          },
          {
            time: "11:00 AM",
            activity: "Luxury Brunch at Chanakya BNR (₹700)",
            location: "Ranchi",
          },
          {
            time: "02:00 PM",
            activity: "VIP Tribal Museum Visit (₹200)",
            location: "Ranchi",
          },
          {
            time: "05:00 PM",
            activity: "Premium Yacht Ride (₹1500)",
            location: "Ranchi Lake",
          },
        ],
      },
      {
        day: 2,
        activities: [
          {
            time: "08:00 AM",
            activity: "Netarhat Premium Resort Trip (₹7000)",
            location: "Netarhat",
          },
          {
            time: "11:30 AM",
            activity: "Lunch (₹600)",
            location: "Netarhat Resort",
          },
          {
            time: "03:00 PM",
            activity: "Magnolia Point Visit",
            location: "Netarhat",
          },
          {
            time: "06:00 PM",
            activity: "Candlelight Dinner (₹2000)",
            location: "Sunset Point",
          },
        ],
      },
    ],
  };
  const selectedItinerary = itineraryData[selectedBudgetType].slice(0, days);

  // Demo chat messages
  const demoMessages = [
    {
      sender: "ai",
      message:
        "Hello! I'm your AI travel assistant. How can I help with your Jharkhand trip?",
    },
    {
      sender: "user",
      message: "Can you suggest some family-friendly places in Jharkhand?",
    },
    {
      sender: "ai",
      message:
        "Absolutely! For families, I recommend Betla National Park, Dassam Falls, Tribal Culture Center, and the cable car ride at Deoghar!",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowItinerary(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral">
      <Navbar />

      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-primary mb-8">
          Plan Your Jharkhand Adventure
        </h1>

        {!showItinerary ? (
          <motion.div
            className="max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4">
                Create Your Itinerary
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Number of Days
                  </label>
                  <select
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    value={days}
                    onChange={(e) => setDays(parseInt(e.target.value))}
                  >
                    <option value={1}>1 Day</option>
                    <option value={2}>2 Days</option>
                    <option value={3}>3 Days</option>
                    <option value={4}>4 Days</option>
                    <option value={5}>5 Days</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">
                    Primary Interest
                  </label>
                  <select
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                  >
                    <option value="Nature">Nature</option>
                    <option value="Culture">Culture</option>
                    <option value="History">History</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">
                    Budget (in ₹)
                  </label>
                  <select
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    value={budget}
                    onChange={(e) => setBudget(parseInt(e.target.value))}
                  >
                    <option value={3000}>₹2000 – ₹5000 (Low Budget)</option>
                    <option value={8000}>₹5000 – ₹12000 (Medium Budget)</option>
                    <option value={15000}>₹12000+ (High Budget)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary py-3 font-medium"
                >
                  Generate Itinerary
                </button>
              </form>
            </div>
          </motion.div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">
                Your {days}-Day {interest} Itinerary
              </h2>

              <button
                onClick={() => setShowChatPopup(true)}
                className="btn-secondary flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                    clipRule="evenodd"
                  />
                </svg>
                Ask AI Assistant
              </button>
            </div>

            {/* Itinerary Cards */}
            <div className="space-y-6">
              {selectedItinerary.slice(0, days).map((day) => (
                <motion.div
                  key={day.day}
                  className="card p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: day.day * 0.1 }}
                >
                  <h3 className="text-xl font-semibold mb-4 text-primary">
                    Day {day.day}
                  </h3>

                  <div className="space-y-4">
                    {day.activities.map((activity, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-primary bg-opacity-10 text-primary font-medium rounded-lg px-3 py-1 w-24 text-center">
                          {activity.time}
                        </div>
                        <div className="ml-4">
                          <div className="font-medium">{activity.activity}</div>
                          <div className="text-sm text-gray-600">
                            {activity.location}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => setShowItinerary(false)}
                className="btn-primary"
              >
                Create New Itinerary
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Chat Popup */}
      {showChatPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="bg-primary text-white p-4 flex justify-between items-center">
              <h3 className="font-semibold">AI Travel Assistant</h3>
              <button
                onClick={() => setShowChatPopup(false)}
                className="text-white"
              >
                ✕
              </button>
            </div>

            {/* Chat Messages */}
            <div className="p-4 h-80 overflow-y-auto">
              {demoMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    msg.sender === "user" ? "text-right" : ""
                  }`}
                >
                  <div
                    className={`inline-block rounded-lg px-4 py-2 max-w-xs ${
                      msg.sender === "user"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Box */}
            <div className="border-t p-4">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Ask a question..."
                  className="flex-grow px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="bg-primary text-white px-4 py-2 rounded-r-lg">
                  ➤
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ItineraryPlanner;
