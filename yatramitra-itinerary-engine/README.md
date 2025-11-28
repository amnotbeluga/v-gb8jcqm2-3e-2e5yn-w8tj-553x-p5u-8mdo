# 🏞️ YatraMitra – Itinerary Engine  
### AI-Powered Itinerary Generation Module for Jharkhand Tourism (SIH 2025)

This repository contains the **Itinerary Engine Module** of our Smart India Hackathon (SIH) 2025 project:  
**“AI-powered Digital Tourism Platform to Promote Eco & Cultural Tourism in Jharkhand.”**

The engine generates smart, personalized, eco-friendly travel itineraries based on user preferences, duration, budget, cultural interest, and location data.

---

## 🎯 Project Context – SIH 2025  
**Theme:** Tourism & Cultural Heritage  
**Problem Statement:** *Create an AI-powered Digital Tourism Platform to Promote Eco & Cultural Tourism in Jharkhand.*

This module powers the core logic for:  
✔ Personalized trip planning  
✔ Eco-sorted activity suggestions  
✔ Cultural trail recommendations  
✔ Smart route optimization  
✔ Day-wise itinerary creation

---

## 🌟 Key Features of the Itinerary Engine

### ✔️ AI-Driven Personalized Itinerary
- Generates day-wise travel plans  
- Considers distance, time, categories, user interests  

### ✔️ Eco & Cultural Tourism Focus
Prioritizes Jharkhand’s:
- Waterfalls  
- Wildlife sanctuaries  
- National parks  
- Tribal heritage villages  
- Festivals  
- Handicrafts hotspots  
- Cultural circuits  

### ✔️ Smart Route Optimization
- Uses shortest path algorithms (Dijkstra / A*)  
- Minimizes backtracking  
- Suggests efficient travel orders  

### ✔️ Dynamic Recommendations
- Weather-aware suggestions  
- Festival or seasonal recommendations  
- Local food + cultural activities  

### ✔️ Budget & Traveller Type Based
Plans differ for:
- Backpackers  
- Family  
- Couples  
- Adventure travellers  
- Culture enthusiasts  

---

## 🧠 Tech Stack

- **Backend:** Node.js  
- **Database:** MongoDB  
- **AI Models:** Recommendation engine, clustering, preference weighting (WE have used Google's Gemini) 
- **Maps / Geo APIs:** Google Maps API / OpenStreetMap / Leaflet
- **Dataset:** Jharkhand Tourist Places Dataset (custom curated)

---

## 🏗️ Architecture Overview

User Preferences → Recommendation Engine → Route Optimizer → Day-wise Itinerary Generator → Final Itinerary Output (API → Frontend UI) 

# Run and deploy 

This contains everything you need to run your app locally.

View your app 

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

# 🧩 Future Enhancements

- Real-time crowd estimation

- Offline itinerary mode

- AR-based tourism guide

- Festival calendar–based recommendations

- AI chatbot for instant itinerary changes

- Integration with booking services

- Travel time estimation using live traffic

  
