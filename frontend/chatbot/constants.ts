
import { Itinerary, PromptSuggestion } from './types';

export const SYSTEM_INSTRUCTION = `
You are "Jharkhand Tourist Assistant" — a friendly, accurate, multilingual travel assistant specialized in tourism in Jharkhand, India.

Rules:
- Always ask one clarifying question if the user's request is ambiguous.
- LANGUAGE BEHAVIOR:
  1. By DEFAULT, respond in English.
  2. If user writes in a different supported language, respond in THAT language.
  3. If the user has manually selected a language from the UI (passed to you as context), ALWAYS respond in that selected language, regardless of the input language.
  4. Supported Languages: English, Hindi, Santhali, Gujarati, Punjabi, Marathi, Tamil, Kannada, Bengali, Assamese, Sanskrit, Urdu, French, German, Japanese, Korean, Chinese, Russian.
  5. If asked for "available languages", list them with their flags and native script names (e.g., 🇮🇳 हिन्दी – Hindi).
  6. If user asks in an unsupported language, reply: "I currently support 18 languages. Please choose from the list."
  
- TONE & STYLE:
  - Use professional emojis to enhance the experience naturally:
    👋 (welcoming) 🌿 (nature) 🧭 (guidance) 🌄 (views) 🧳 (travel) ✨ (highlights) 🙏 (respect) 🌦️ (weather) 💰 (cost)
  - Use short paragraphs (2–4 sentences).
  - Format output with clear Markdown (bolding key terms, using lists). **Do not use Markdown tables; use bulleted lists for data.**

- 🌦️ WEATHER-AWARE SUGGESTIONS (REAL-TIME):
  1. **USE GOOGLE SEARCH TOOL**: You have access to a Google Search tool. When a user asks for an itinerary or visits a specific location (e.g., "Trip to Netarhat"), **ALWAYS use the tool first** to check the *current real-time weather forecast* for that location.
  2. Analyze the retrieved weather context:
     - "Rain/Monsoon": Avoid steep treks/waterfalls with slippery rocks. Suggest dams or indoor museums. Warn about leeches/mud.
     - "Sunny/Clear": Recommend viewpoints, sunrise spots, and open lakes.
     - "Fog/Winter": Delay sunrise plans (visibility). Suggest bonfires or mid-day sightseeing.
  3. IF SEARCH FAILS OR WEATHER IS UNKNOWN:
     - Only then say: "I couldn't fetch the live weather right now. If you tell me the weather (e.g., rainy, sunny), I can adjust the plan for safety."
  4. MANDATORY SAFETY ALERTS:
     - Always include a "⚠️ Safety & Logistics" section.
     - Mention: Best visiting hours (e.g., "Avoid waterfalls after sunset"), Terrain caution (slippery rocks), and Network zones (e.g., "Weak signal in Netarhat").

- 🧳 TRAVEL CHECKLIST & BUDGET:
  When suggesting an itinerary, ALWAYS include:
  1. 🎒 **Packing Checklist**: Tailored to the location/weather (e.g., "Power bank & offline maps for forests", "Grip shoes for treks").
  2. 💰 **Budget Estimator**:
     - Provide a breakdown: Transport, Stay, Food, Entry Fees/Guide.
     - Provide a TOTAL RANGE per person (e.g., "Estimated Cost: ₹1,500 – ₹2,200 per person").

==================================================
🛡️ TRANSPORT SAFETY & WEATHER-SAFE TRAVEL RULES
==================================================

Whenever a user asks about travel routes, road conditions, or visiting outdoor locations, FOLLOW THESE SAFETY PRINCIPLES:

1️⃣ TIME SAFETY RULES
Always remind:
- Avoid traveling to hilly areas after sunset.
- Waterfall areas should NOT be visited late evening.
- Safari and forest areas close before dark.
- Sunrise/Sunset points can be foggy → check visibility.

Use lines like:
“Please reach before sunset for safety.”
“Fog reduces visibility; early morning travel may be risky.”

2️⃣ ROAD SAFETY RULES (Jharkhand-specific)
For hilly/rural routes (Netarhat, Betla, Patratu):
- Roads have sharp curves.
- Terrain becomes slippery during rain.
- Fog is common in early morning & evening.
- Network connectivity is weak.

Always advise:
- Download offline maps
- Carry essential medication
- Keep power bank fully charged

3️⃣ WATERFALL & RIVER SAFETY
Waterfalls in Jharkhand (Hundru, Dassam, Jonha, etc.) can be risky.
Always mention:
- Do NOT go too close to edges.
- Rocks are extremely slippery during rain.
- Swimming is NOT allowed.
- Flow increases suddenly during monsoon.

Use lines like:
“It is unsafe to swim or stand near the edge of waterfalls.”

4️⃣ WEATHER-AWARE TRAVEL LOGIC
If user mentions weather or Search Tool indicates:
- Heavy Rain → Avoid waterfalls & forest routes
- Fog → Avoid sunrise points + late-night travel
- Sunny/Clear → Best time for viewpoints
- Winter → Carry jackets & warm clothes
- Monsoon → Slippery roads; warn users clearly

5️⃣ VEHICLE SAFETY GUIDELINES
Advise:
- Use shared jeeps or pre-booked taxis for hills.
- Avoid overloaded vehicles.
- Wear seatbelts on hilly routes.
- Prefer morning departures.

Use lines like:
“Shared jeeps and taxis are the most reliable option for this route.”

6️⃣ PUBLIC TRANSPORT ACCURACY RULE
Do NOT claim there are fixed government buses unless verified.

Default line:
“There is no fixed daily government bus for this route. Shared jeeps and private taxis are the most reliable options.”

7️⃣ SOLO TRAVEL SAFETY
If someone asks:
- Warn about network
- Suggest safer timings
- Suggest populated places
- Avoid isolated areas after dark

Use lines like:
“For solo travelers, it’s safer to stay in populated or well-lit areas and travel during daytime.”

8️⃣ EMERGENCY HELP GUIDANCE
When user requests emergency assistance:
- Suggest nearest large town/landmark (general guidance)
- Suggest carrying local helpline numbers
- Suggest staying in populated areas
- Do NOT provide medical or legal advice

Use safe fallback lines:
“I recommend contacting local authorities or using verified helplines for immediate support.”

9️⃣ WHEN YOU ARE UNSURE
If information is uncertain or unavailable:
Say:
“I’m not fully sure about the exact details, but here is the safest information currently available.”

Never invent transport schedules or road conditions.

- CONTENT GUIDANCE:
  - For itinerary generation, ask location, days, budget, and tags.
  - Show verification status for local vendors if known.
  - End every answer with a short call-to-action.
`;

export const LANGUAGE_OPTIONS = [
  { value: 'English', label: 'English', flag: '', speechCode: 'en-US' },
  { value: 'Hindi', label: 'हिन्दी (Hindi)', flag: '🇮🇳', speechCode: 'hi-IN' },
  { value: 'Santhali', label: 'ᱥᱟᱱᱛᱟᱲᱤ (Santhali)', flag: '🇮🇳', speechCode: 'sat-IN' }, // Check browser support
  { value: 'Gujarati', label: 'ગુજરાતી (Gujarati)', flag: '🇮🇳', speechCode: 'gu-IN' },
  { value: 'Punjabi', label: 'ਪੰਜਾਬੀ (Punjabi)', flag: '🇮🇳', speechCode: 'pa-IN' },
  { value: 'Marathi', label: 'मराठी (Marathi)', flag: '🇮🇳', speechCode: 'mr-IN' },
  { value: 'Tamil', label: 'தமிழ் (Tamil)', flag: '🇮🇳', speechCode: 'ta-IN' },
  { value: 'Kannada', label: 'ಕನ್ನಡ (Kannada)', flag: '🇮🇳', speechCode: 'kn-IN' },
  { value: 'Bengali', label: 'বাংলা (Bengali)', flag: '🇮🇳', speechCode: 'bn-IN' },
  { value: 'Assamese', label: 'অসমীয়া (Assamese)', flag: '🇮🇳', speechCode: 'as-IN' },
  { value: 'Sanskrit', label: 'संस्कृतम् (Sanskrit)', flag: '🇮🇳', speechCode: 'sa-IN' },
  { value: 'Urdu', label: 'اُردو (Urdu)', flag: '🇵🇰', speechCode: 'ur-PK' },
  { value: 'French', label: 'Français (French)', flag: '🇫🇷', speechCode: 'fr-FR' },
  { value: 'German', label: 'Deutsch (German)', flag: '🇩🇪', speechCode: 'de-DE' },
  { value: 'Japanese', label: '日本語 (Japanese)', flag: '🇯🇵', speechCode: 'ja-JP' },
  { value: 'Korean', label: '한국어 (Korean)', flag: '🇰🇷', speechCode: 'ko-KR' },
  { value: 'Chinese', label: '中文 (Chinese)', flag: '🇨🇳', speechCode: 'zh-CN' },
  { value: 'Russian', label: 'Русский (Russian)', flag: '🇷🇺', speechCode: 'ru-RU' }
] as const;

export const SUPPORTED_LANGUAGES = LANGUAGE_OPTIONS.map(opt => opt.value);

const DEFAULT_PROMPTS: PromptSuggestion[] = [
  { id: '1', label: '2-Day Budget Trip', prompt: 'Plan a 2-day itinerary for Ranchi waterfalls with a budget estimate. Check the weather first.', icon: 'compass' },
  { id: '2', label: 'Betla Safari Guide', prompt: 'How do I book a safari at Betla? Include costs, weather forecast, and a packing list.', icon: 'camera' },
  { id: '3', label: 'Local Crafts', prompt: 'Where can I buy authentic Dokra art in Jharkhand? Any safety tips for the market?', icon: 'coffee' },
  { id: '4', label: 'Netarhat Weekend', prompt: 'Plan a weekend trip to Netarhat. Check for rain/fog and include a travel checklist.', icon: 'tent' }
];

export const TRANSLATIONS: Record<string, { greeting: string; prompts: PromptSuggestion[] }> = {
  English: {
    greeting: "Johar! 👋 I’m **YatraMitra AI**, your friendly Jharkhand Tourist Assistant 🧭\n\nReady to explore the land of forests, waterfalls, and rich culture? 🌿✨\n\nAsk me anything — itineraries, places to visit, transport, food, or safety tips!",
    prompts: DEFAULT_PROMPTS
  },
  Hindi: {
    greeting: "जोहार! 👋 मैं आपका **यात्रा-मित्र AI** हूँ, आपका फ्रेंडली झारखंड टूरिस्ट असिस्टेंट 🧭\n\nक्या आप जंगलों, झरनों और समृद्ध संस्कृति की इस धरती को घूमने के लिए तैयार हैं? 🌿✨\n\nमुझसे कुछ भी पूछें — यात्रा योजना, घूमने की जगहें, परिवहन, भोजन या सुरक्षा सुझाव!",
    prompts: [
      { id: '1', label: '2-दिन की यात्रा', prompt: 'मेरे पास 2 दिन हैं। मुझे झरने पसंद हैं। कृपया बजट और सुरक्षा सुझावों के साथ प्लान बताएं।', icon: 'compass' },
      { id: '2', label: 'बेतला सफारी', prompt: 'बेतला नेशनल पार्क में सफारी कैसे बुक करें? कुल खर्च और पैकिंग लिस्ट भी बताएं।', icon: 'camera' },
      { id: '3', label: 'स्थानीय हस्तशिल्प', prompt: 'मैं झारखंड में असली डोकरा कला कहां से खरीद सकता हूँ?', icon: 'coffee' },
      { id: '4', label: 'नेतरहाट यात्रा', prompt: 'नेतरहाट की यात्रा का प्लान बनाएं। मौसम की चेतावनियां और पैकिंग लिस्ट शामिल करें।', icon: 'tent' }
    ]
  },
  Santhali: {
    greeting: "Johar! 👋 In do **YatraMitra AI**, amic' Jharkhand Tourist Assistant 🧭\n\nJharkhand rea: bir ar da:k' ko nel lagit' chet' leka in goro dare ama? 🌿✨",
    prompts: [
      { id: '1', label: '2-Din Reak', prompt: 'In then 2 din mena:a. Ranchi khon ehob kate mit itinerary lai me. Kharcho hisab ho lai me.', icon: 'compass' },
      { id: '2', label: 'Betla Safari', prompt: 'Betla National Park re safari chet leka re booking huiyu:a? Okat do joto khon boge somoy?', icon: 'camera' },
      { id: '3', label: 'Local Crafts', prompt: 'Jharkhand re authentic Dokra art ar tribal handicrafts oka re namo:a?', icon: 'coffee' },
      { id: '4', label: 'Netarhat Da:ra', prompt: 'Netarhat lagit mit weekend trip plan me. Safety ar packing list ho lai me.', icon: 'tent' }
    ]
  },
  Gujarati: {
    greeting: "જોહાર! 👋 હું **યાત્રામ મિત્ર AI** છું, તમારો ઝારખંડ ટૂરિસ્ટ આસિસ્ટન્ટ 🧭\n\nજંગલો અને ધોધની ભૂમિનું અન્વેષણ કરવા તૈયાર છો? 🌿✨",
    prompts: [
      { id: '1', label: '2-દિવસનો પ્રવાસ', prompt: 'મારી પાસે 2 દિવસ છે. મને ધોધ ગમે છે. બજેટ અને પેકિંગ લિસ્ટ સાથે પ્લાન જણાવો.', icon: 'compass' },
      { id: '2', label: 'બેટલા સફારી', prompt: 'બેટલા નેશનલ પાર્કમાં સફારી કેવી રીતે બુક કરવી? ખર્ચ અને શ્રેષ્ઠ સમય જણાવો.', icon: 'camera' },
      { id: '3', label: 'સ્થાનિક હસ્તકલા', prompt: 'હું ઝારખંડમાં અસલ ડોકરા આર્ટ ક્યાંથી ખરીદી શકું?', icon: 'coffee' },
      { id: '4', label: 'નેતરહાટ ટ્રીપ', prompt: 'નેતરહાટની ટ્રીપ પ્લાન કરો. હવામાન ચેતવણીઓ અને ચેકલિસ્ટ સામેલ કરો.', icon: 'tent' }
    ]
  },
  Punjabi: {
    greeting: "ਜੋਹਾਰ! 👋 ਮੈਂ **ਯਾਤਰਾ ਮਿੱਤਰ AI** ਹਾਂ, ਤੁਹਾਡਾ ਝਾਰਖੰਡ ਟੂਰਿਸਟ ਸਹਾਇਕ 🧭\n\nਕੀ ਤੁਸੀਂ ਜੰਗਲਾਂ ਅਤੇ ਝਰਨਿਆਂ ਦੀ ਧਰਤੀ ਨੂੰ ਘੁੰਮਣ ਲਈ ਤਿਆਰ ਹੋ? 🌿✨",
    prompts: [
      { id: '1', label: '2-ਦਿਨ ਦਾ ਟੂਰ', prompt: 'ਮੇਰੇ ਕੋਲ 2 ਦਿਨ ਹਨ। ਮੈਨੂੰ ਝਰਨੇ ਪਸੰਦ ਹਨ। ਬਜਟ ਅਤੇ ਸੁਰੱਖਿਆ ਸੁਝਾਵਾਂ ਨਾਲ ਟੂਰ ਸੁਝਾਓ।', icon: 'compass' },
      { id: '2', label: 'ਬੇਤਲਾ ਸਫਾਰੀ', prompt: 'ਬੇਤਲਾ ਨੈਸ਼ਨਲ ਪਾਰਕ ਵਿੱਚ ਸਫਾਰੀ ਕਿਵੇਂ ਬੁੱਕ ਕਰੀਏ? ਖਰਚਾ ਅਤੇ ਪੈਕਿੰਗ ਲਿਸਟ ਦੱਸੋ।', icon: 'camera' },
      { id: '3', label: 'ਸਥਾਨਕ ਦਸਤਕਾਰੀ', prompt: 'ਮੈਂ ਝਾਰਖੰਡ ਵਿੱਚ ਅਸਲੀ ਡੋਕਰਾ ਕਲਾ ਕਿੱਥੋਂ ਖਰੀਦ ਸਕਦਾ ਹਾਂ?', icon: 'coffee' },
      { id: '4', label: 'ਨੇਤਰਹਾਟ ਟ੍ਰਿਪ', prompt: 'ਨੇਤਰਹਾਟ ਦੀ ਟ੍ਰਿਪ ਪਲਾਨ ਕਰੋ। ਮੌਸਮ ਦੀ ਜਾਣਕਾਰੀ ਅਤੇ ਸੁਰੱਖਿਆ ਸੁਝਾਅ ਦਿਓ।', icon: 'tent' }
    ]
  },
  Marathi: {
    greeting: "जोहार! 👋 मी **यात्रा मित्र AI** आहे, तुमचा झारखंड पर्यटक सहाय्यक 🧭\n\nजंगले आणि धबधब्यांच्या या भूमीचा शोध घेण्यासाठी तयार आहात? 🌿✨",
    prompts: [
      { id: '1', label: '2-दिवसांची सहल', prompt: 'माझ्याकडे 2 दिवस आहेत. धबधबे आवडतात. बजेट आणि पॅकिंग लिस्टसह सहल सुचवा.', icon: 'compass' },
      { id: '2', label: 'बेतला सफारी', prompt: 'बेतला नॅशनल पार्कमध्ये सफारी कशी बुक करायची? खर्च आणि वेळ सांगा.', icon: 'camera' },
      { id: '3', label: 'स्थानिक हस्तकला', prompt: 'मला झारखंडमध्ये अस्सल डोकरा कला कुठे खरेदी करता येईल?', icon: 'coffee' },
      { id: '4', label: 'नेतरहाट सहल', prompt: 'नेतरहाट सहलीचे नियोजन करा. हवामान आणि सुरक्षिततेच्या टिप्स द्या.', icon: 'tent' }
    ]
  },
  Tamil: {
    greeting: "ஜோஹர்! 👋 நான் **யாத்ரா மித்ரா AI**, உங்கள் ஜார்க்கண்ட் சுற்றுலா உதவியாளர் 🧭\n\nகாடுகள் மற்றும் அருவிகளின் தேசத்தை ஆராய தயாரா? 🌿✨",
    prompts: [
      { id: '1', label: '2-நாள் பயணம்', prompt: 'என்னிடம் 2 நாட்கள் உள்ளன. அருவிகள் பிடிக்கும். பட்ஜெட் மற்றும் பாதுகாப்பு குறிப்புகளுடன் திட்டமிடவும்.', icon: 'compass' },
      { id: '2', label: 'பெட்லா சஃபாரி', prompt: 'பெட்லா தேசிய பூங்காவில் சஃபாரி முன்பதிவு செய்வது எப்படி? கட்டணம் மற்றும் சிறந்த நேரம் எது?', icon: 'camera' },
      { id: '3', label: 'கைவினைப்பொருட்கள்', prompt: 'ஜார்க்கண்டில் உண்மையான டோக்ரா கலை எங்கே வாங்கலாம்?', icon: 'coffee' },
      { id: '4', label: 'நேத்ராஹத் பயணம்', prompt: 'நேத்ராஹத் பயணத்தைத் திட்டமிடுங்கள். வானிலை எச்சரிக்கைகள் மற்றும் சரிபார்ப்புப் பட்டியலைச் சேர்க்கவும்.', icon: 'tent' }
    ]
  },
  Kannada: {
    greeting: "ಜೋಹರ್! 👋 ನಾನು **ಯಾತ್ರಾ ಮಿತ್ರ AI**, ನಿಮ್ಮ ಜಾರ್ಖಂಡ್ ಪ್ರವಾಸಿ ಸಹಾಯಕ 🧭\n\nಕಾಡುಗಳು ಮತ್ತು ಜಲಪಾತಗಳ ನಾಡನ್ನು ಅನ್ವೇಷಿಸಲು ಸಿದ್ಧರಿದ್ದೀರಾ? 🌿✨",
    prompts: [
      { id: '1', label: '2-ದಿನದ ಪ್ರವಾಸ', prompt: 'ನನ್ನ ಬಳಿ 2 ದಿನಗಳಿವೆ. ಜಲಪಾತಗಳು ಇಷ್ಟ. ಬಜೆಟ್ ಮತ್ತು ಸುರಕ್ಷತಾ ಸಲಹೆಗಳೊಂದಿಗೆ ಯೋಜಿಸಿ.', icon: 'compass' },
      { id: '2', label: 'ಬೆಟ್ಲಾ ಸಫಾರಿ', prompt: 'ಬೆಟ್ಲಾ ರಾಷ್ಟ್ರೀಯ ಉದ್ಯಾನವನದಲ್ಲಿ ಸಫಾರಿಯನ್ನು ಹೇಗೆ ಬುಕ್ ಮಾಡುವುದು? ವೆಚ್ಚ ಮತ್ತು ಸಮಯ ತಿಳಿಸಿ.', icon: 'camera' },
      { id: '3', label: 'ಸ್ಥಳೀಯ ಕರಕುಶಲ', prompt: 'ಜಾರ್ಖಂಡ್‌ನಲ್ಲಿ ಅಪ್ಪಟ ಡೋಕ್ರಾ ಕಲೆಯನ್ನು ನಾನು ಎಲ್ಲಿ ಖರೀದಿಸಬಹುದು?', icon: 'coffee' },
      { id: '4', label: 'ನೇತರಹಾಟ್ ಪ್ರವಾಸ', prompt: 'ನೇತರಹಾಟ್ ಪ್ರವಾಸವನ್ನು ಯೋಜಿಸಿ. ಹವಾಮಾನ ಮತ್ತು ಪ್ಯಾಕಿಂಗ್ ಪಟ್ಟಿಯನ್ನು ಸೇರಿಸಿ.', icon: 'tent' }
    ]
  },
  Bengali: {
    greeting: "জোহর! 👋 আমি **যাত্রা মিত্র AI**, আপনার ঝাড়খণ্ড পর্যটন সহকারী 🧭\n\nজঙ্গল এবং জলপ্রপাতের এই দেশটি অন্বেষণ করতে প্রস্তুত? 🌿✨",
    prompts: [
      { id: '1', label: '2 দিনের ভ্রমণ', prompt: 'আমার কাছে 2 দিন আছে। আমি জলপ্রপাত পছন্দ করি। বাজেট এবং প্যাকিং তালিকা সহ একটি পরিকল্পনা দিন।', icon: 'compass' },
      { id: '2', label: 'বেতলা সাফারি', prompt: 'বেতলা জাতীয় উদ্যানে সাফারি বুক করব কীভাবে? খরচ এবং সেরা সময় জানাবেন।', icon: 'camera' },
      { id: '3', label: 'স্থানীয় হস্তশিল্প', prompt: 'ঝাড়খণ্ডের আসল ডোকরা শিল্প আমি কোথায় কিনতে পারি?', icon: 'coffee' },
      { id: '4', label: 'নেতারহাট ভ্রমণ', prompt: 'নেতারহাটে ভ্রমণের পরিকল্পনা করুন। আবহাওয়া সতর্কতা এবং সুরক্ষা টিপস অন্তর্ভুক্ত করুন।', icon: 'tent' }
    ]
  },
  Assamese: {
    greeting: "জোহাৰ! 👋 মই **যাত্ৰা মিত্ৰ AI**, আপোনাৰ ঝাৰখণ্ড পৰ্যটন সহকাৰী 🧭\n\nঅৰণ্য আৰু জলপ্ৰপাতৰ এই দেশখন অন্বেষণ কৰিবলৈ আপুনি সাজুনে? 🌿✨",
    prompts: DEFAULT_PROMPTS
  },
  Sanskrit: {
    greeting: "जोहार! 👋 अहम् **यात्रा-मित्र AI** अस्मि, भवताम् झारखण्ड-पर्यटन-सहायकः 🧭\n\nकिं भवान् वनानां प्रपातानां च इमां भूमिम् अन्वेष्टुं सज्जः अस्ति? 🌿✨",
    prompts: DEFAULT_PROMPTS
  },
  Urdu: {
    greeting: "جوہر! 👋 میں **یاترا مترا AI** ہوں، آپ کا جھارکھنڈ ٹورسٹ اسسٹنٹ 🧭\n\nکیا آپ جنگلات اور آبشاروں کی اس سرزمین کو دریافت کرنے کے لیے تیار ہیں؟ 🌿✨",
    prompts: DEFAULT_PROMPTS
  },
  French: {
    greeting: "Johar! 👋 Je suis **YatraMitra AI**, votre assistant touristique du Jharkhand 🧭\n\nPrêt à explorer la terre des forêts et des cascades ? 🌿✨",
    prompts: DEFAULT_PROMPTS
  },
  German: {
    greeting: "Johar! 👋 Ich bin **YatraMitra AI**, Ihr Jharkhand-Tourismus-Assistent 🧭\n\nBereit, das Land der Wälder und Wasserfälle zu erkunden? 🌿✨",
    prompts: DEFAULT_PROMPTS
  },
  Japanese: {
    greeting: "ジョハール！👋 私は **YatraMitra AI**、あなたのジャールカンド観光アシスタントです 🧭\n\n森と滝の国を探索する準備はできていますか？ 🌿✨",
    prompts: DEFAULT_PROMPTS
  },
  Korean: {
    greeting: "조하르! 👋 저는 **YatraMitra AI**입니다, 당신의 자르칸드 관광 도우미죠 🧭\n\n숲과 폭포의 땅을 탐험할 준비가 되셨나요? 🌿✨",
    prompts: DEFAULT_PROMPTS
  },
  Chinese: {
    greeting: "Johar！👋 我是 **YatraMitra AI**，您的贾坎德邦旅游助手 🧭\n\n准备好探索这片森林和瀑布的土地了吗？ 🌿✨",
    prompts: DEFAULT_PROMPTS
  },
  Russian: {
    greeting: "Джохар! 👋 Я **YatraMitra AI**, ваш туристический помощник по Джаркханду 🧭\n\nГотовы исследовать этот край лесов и водопадов? 🌿✨",
    prompts: DEFAULT_PROMPTS
  }
};

export const PREMADE_ITINERARIES: Itinerary[] = [
  {
    id: 'ranchi-waterfalls',
    title: 'Ranchi Waterfalls & Culture',
    location: 'Ranchi',
    coordinates: { lat: 23.3441, lng: 85.3096 },
    duration: 2,
    interests: ['Nature', 'Culture'],
    description: 'Visit Hundru Falls, Jonha Falls, and the Tribal Museum.'
  },
  {
    id: 'netarhat-hills',
    title: 'Queen of Chotanagpur: Netarhat',
    location: 'Netarhat',
    coordinates: { lat: 23.4841, lng: 84.2616 },
    duration: 3,
    interests: ['Nature', 'Adventure', 'Relaxation'],
    description: 'Sunrise at Magnolia Point, Koel View Point, and Pine Forests.'
  },
  {
    id: 'betla-wildlife',
    title: 'Betla Wildlife Adventure',
    location: 'Palamau',
    coordinates: { lat: 23.8878, lng: 84.1914 },
    duration: 2,
    interests: ['Wildlife', 'Adventure', 'Heritage'],
    description: 'Jeep Safari in Betla National Park and Palamau Fort visit.'
  },
  {
    id: 'deoghar-pilgrimage',
    title: 'Spiritual Journey to Deoghar',
    location: 'Deoghar',
    coordinates: { lat: 24.4826, lng: 86.6970 },
    duration: 2,
    interests: ['Religious', 'Culture'],
    description: 'Baba Baidyanath Dham Darshan, Trikut Pahar ropeway, and Naulakha Mandir.'
  },
  {
    id: 'jamshedpur-city',
    title: 'Steel City & Dalma Hills',
    location: 'Jamshedpur',
    coordinates: { lat: 22.8046, lng: 86.2029 },
    duration: 2,
    interests: ['Urban', 'Nature', 'Parks'],
    description: 'Jubilee Park, Dimna Lake, and Dalma Wildlife Sanctuary.'
  },
  {
    id: 'shikharji-trek',
    title: 'Parasnath Hill Trek',
    location: 'Giridih',
    coordinates: { lat: 23.9565, lng: 86.1440 },
    duration: 1,
    interests: ['Adventure', 'Religious'],
    description: 'Trek to Shikharji, the highest peak in Jharkhand and Jain pilgrimage site.'
  },
  {
    id: 'hazaribagh-nature',
    title: 'Hazaribagh Lakes & Forests',
    location: 'Hazaribagh',
    coordinates: { lat: 23.9925, lng: 85.3637 },
    duration: 2,
    interests: ['Nature', 'Relaxation'],
    description: 'Canary Hill, Hazaribagh Lake, and National Park drive.'
  }
];