# 📊 Jharkhand Tourism Admin Dashboard  
### Central Monitoring Dashboard for Eco & Cultural Tourism  
### Part of Jharkhand Tourist AI Assistant – SIH 2025

The **Jharkhand Tourism Admin Dashboard** is a centralized control system designed for the Tourism Department & Forest Authorities as part of the SIH 2025 project  
**“AI-Powered Digital Tourism Platform to Promote Eco & Cultural Tourism in Jharkhand.”**

This dashboard allows government officials to monitor **tourist activity, feedback, transport movement, itinerary usage, safety alerts, and analytics** in real-time.

---

## 🎯 Purpose

The Admin Dashboard provides:

- 📍 Live tracking of tourist transport (VanSaathi)  
- 📊 Sentiment & feedback analytics  
- 🧭 Overview of most visited tourist locations  
- 🔥 Alerts for crowd, safety, or geo-fencing violations  
- 📈 Insights for improving eco & cultural tourism  
- 🛠 Administrative tools for system management  

It supports **decision-making, monitoring, safety, and analytics** for the tourism authority.

---

## 🌟 Key Features

### 🟢 1. Real-Time Transport Monitoring  
- Live GPS tracking of:
  - Tourist vans  
  - Eco-tour buses  
  - Vehicle routes in forest regions  
- Geo-fence alerts  
- Speed & safety monitoring  

---

### 🟢 2. Tourist Activity Dashboard  
- Number of tourists currently active  
- Most visited locations  
- Peak hours & seasonal trends  
- Daily/Weekly/Monthly statistics  

---

### 🟢 3. AI Feedback & Sentiment Analytics  
Integrated with **YatraMitra AI Feedback Analyzer**:

- Positive / neutral / negative sentiment distribution  
- District-wise complaint heatmap  
- Frequently mentioned issues  
- Tourist satisfaction score  

---

### 🟢 4. Itinerary Usage & Trend Analysis  
- Most popular itineraries  
- Most recommended places  
- User behavior patterns  
- Average trip duration  
- Eco vs cultural tourism ratio  

---

### 🟢 5. Alerts & Notifications  
- Crowded area alerts  
- Dangerous zone entry (VanSaathi)  
- Weather alerts (rainfall risk at waterfalls)  
- Road blockage updates  
- Forest safety warnings  

---

### 🟢 6. Place Management Module  
Admins can update:

- Tourist place info  
- Opening hours  
- Entry fees  
- Images & videos  
- Maintenance / closure status  

---

### 🟢 7. User & Access Management  
- Admin login  
- Role-based permissions  
- Add/update authorized personnel  
- Audit logs  

---

## 🧠 Tech Stack

| Component | Technology |
|----------|------------|
| Frontend | React / Next.js / Vue (as used) |
| Backend | Node.js + Express |
| Database | MongoDB |
| Map Engine | Leaflet / Google Maps / Mapbox |
| Charts | Chart.js / Recharts / ECharts |
| Auth | JWT / OAuth |
| Live Tracking | WebSocket (Socket.io) |

---


# Run and deploy this app.

This contains everything you need to run your app locally.

View your app 
## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

# 🔮 Future Enhancements

- AI-driven crowd prediction
- Drone-based monitoring integration
- Admin chatbot assistant
- Predictive maintenance for tourist places
- Emergency management module
