# 📝 YatraMitra AI Feedback Analyzer  
### Intelligent Feedback & Sentiment Analysis System  
### Module of Jharkhand AI Toursim Application – SIH 2025

The **YatraMitra AI Feedback Analyzer** is an AI-powered module designed to analyze visitor feedback for the  
**Jharkhand Tourist AI Assistant** — a Smart India Hackathon 2025 project.

This module automatically processes user feedback collected from:
- Website  
- Mobile App  
- Tourist visit logs  
- Transport systems (VanSaathi)
- Chatbot interactions  
- Surveys at eco & cultural tourism sites  

It provides **sentiment analysis**, **toxicity detection**, **tourism insights**, and **admin dashboards** to help the Tourism Department make informed decisions.

---

## 🎯 Purpose and Goals

This module makes the system capable of:

- 🔍 Understanding user feedback automatically  
- 😀 Detecting tourist satisfaction (positive / neutral / negative)  
- 🌧 Identifying complaints about facilities  
- 🧭 Recommending improvements in eco-tourism circuits  
- ⚠ Detecting abusive or harmful content  
- 📊 Showing feedback insights on an admin dashboard  

It ensures continuous improvement of Jharkhand’s eco & cultural tourism services.

---

## 🌟 Key Features

### 🟢 1. Sentiment Analysis  
Classifies each feedback into:
- Positive  
- Neutral  
- Negative  

Uses AI models Gemini.

---

### 🟢 2. Category Classification  
Automatically detects what the feedback is about:
- 🚮 Cleanliness  
- 🚍 Transport  
- 🏨 Stay/Accommodation  
- 🌊 Tourist place experience  
- 🅿 Parking  
- 👮 Safety  
- 🤝 Staff behavior  

---

### 🟢 3. Toxicity & Abuse Detection  
Flags feedback that includes:
- Hate speech  
- Abusive words  
- Harassment  
- Spam  

---

### 🟢 4. Insights & Report Generation  
- Most liked places  
- Frequent complaints  
- District-wise sentiment trends  
- Monthly improvement report  
- Tourist happiness index  

---

### 🟢 5. Admin Dashboard Integration  
The results can be viewed in the backend dashboard as:
- Pie charts  
- Trend graphs  
- Heatmaps  
- Sentiment scorecards  

---

## 🧠 Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Node.js + Express |
| Database | MongoDB |
| AI Model | Gemini   |
| NLP Tools | HuggingFace Transformers / VADER / TensorFlow.js |
| Visualization | Recharts / Chart.js / Admin dashboard frontend |

---

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

# 🧩 Use Cases

- Improve tourist experience through data
- Identify poor-performing locations
- Detect behavioral issues (guides, staff, facilities)
- Improve eco-tourism safety & cleanliness
- Boost district tourism planning
- Highlight seasonal issues (rainy season complaints, peak time issues)

# 🔮 Future Enhancements

- Audio feedback analysis
- Multilingual support (Hindi, English, Nagpuri, Mundari, etc.)
- Image-based feedback understanding (dirty area photos)
- Predictive sentiment modelling
- Automated admin notifications
