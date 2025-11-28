import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import {
  MapPin,
  User,
  Bus,
  Utensils,
  ShieldAlert,
  Hospital,
  Fuel,
  CreditCard,
  Hotel,
  PhoneCall,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { FaStar } from "react-icons/fa";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";


function PlaceDetailsPage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const [tracking, setTracking] = useState(false);
  const [coords, setCoords] = useState(null);
  const watchId = useRef(null);
  const [placeCoords, setPlaceCoords] = useState(null);

  const [distance, setDistance] = useState(null);
  const [path, setPath] = useState([]);
  const [current, setCurrent] = useState(0);
  const [route, setRoute] = useState(null);


  // Review
  const [reviews, setReviews] = useState([]);
  const [currentReview, setCurrentReview] = useState(0);

  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // Fetch reviews
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/places/${id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data.reviews || []))
      .catch((err) => console.error(err));
  }, [id]);

  // Submit review
  const handleSubmit = async () => {
    const loggedInUser = localStorage.getItem("user");

    if (!loggedInUser) {
      alert("Please login first");
      window.location.href = "/login";
      return;
    }

    if (!name || !rating || !comment) return alert("Please fill all fields");

    const user = JSON.parse(localStorage.getItem("user"));

    try {
      const newReview = {
        user: name,
        rating,
        comment,
        createdBy: user.name || "Anonymous",
        createdAt: new Date(),
      };

      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/places/${id}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newReview),
        }
      );

      const data = await res.json();

      setReviews(data.place.reviews);
      setName("");
      setRating(0);
      setComment("");
      setCurrentReview(data.place.reviews.length - 1);
    } catch (error) {
      console.error(error);
      alert("Failed to submit review");
    }
  };

  const nextReview = () =>
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  const prevReview = () =>
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);

const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const blueIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});


  //Geocoding 
 async function getCoordinatesFromAddress(address) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    address
  )}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.length > 0) {
    return {
      latitude: parseFloat(data[0].lat),
      longitude: parseFloat(data[0].lon),
    };
  } else {
    console.error("OSM Geocoding failed for:", address);
    return null;
  }
}

  useEffect(() => {
    async function fetchCoords() {
      if (place?.location) {
        const coords = await getCoordinatesFromAddress(place.location);
        setPlaceCoords(coords);
      }
    }
    fetchCoords();
  }, [place]);

  // ================== Distance Formula ===================
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) ** 2;

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  // ================== Start Tracking ===================
 const startTracking = async () => {
  if (!placeCoords) {
    alert("Location coordinates not loaded yet!");
    return;
  }

  if (!("geolocation" in navigator)) {
    alert("Geolocation is not supported in this browser.");
    return;
  }

  setTracking(true);

  watchId.current = navigator.geolocation.watchPosition(
    async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      const newCoords = { latitude: lat, longitude: lng };

      setCoords(newCoords);
      setPath((prev) => [...prev, [lat, lng]]);

      const dist = calculateDistance(
        lat,
        lng,
        placeCoords.latitude,
        placeCoords.longitude
      );
      setDistance(dist);

      if (!route) {
        const r = await getRoute(
          lat,
          lng,
          placeCoords.latitude,
          placeCoords.longitude
        );
        setRoute(r);
      }
    },
    (err) => {
      console.error(err);
      alert("Failed to get your location. Please allow location access.");
      setTracking(false);
    },
    {
      enableHighAccuracy: false,
      maximumAge: 30000,
      timeout: 600000,
    }
  );
};


  // ================== Stop Tracking ===================
  const stopTracking = () => {
    setTracking(false);

    if (watchId.current !== null) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(watchId.current);
        watchId.current = null;
      }
    };
  }, []);

  const openInGoogleMaps = () => {
    if (coords) {
      const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${
        coords.latitude
      },${coords.longitude}&destination=${encodeURIComponent(
        place.location
      )}&travelmode=driving`;
      window.open(googleMapsUrl, "_blank");
    } else {
      alert("Current location not available.");
    }
  };

  const services = [
    { id: 1, label: "Local Guide", Icon: User },
    { id: 2, label: "Transport", Icon: Bus },
    { id: 3, label: "Restaurants", Icon: Utensils },
    { id: 4, label: "Police Station", Icon: ShieldAlert },
    { id: 5, label: "Hospital", Icon: Hospital },
    { id: 6, label: "Petrol Pump", Icon: Fuel },
    { id: 7, label: "ATM", Icon: CreditCard },
    { id: 8, label: "Hotels", Icon: Hotel },
    { id: 9, label: "Emergency", Icon: PhoneCall },
  ];

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/places/details/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Place:", data);
        setPlace(data);
      })
      .catch((err) => console.error("Error:", err));
  }, [id]);

  if (!place) return <p className="text-center mt-10">Loading...</p>;

  const images = [
    place.image,
    place.image1,
    place.image2,
    place.image3,
    place.image4,
  ];

  const next = () => {
    if (current < images.length - 1) setCurrent(current + 1);
  };

  const prev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const addReview = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newReview = {
      user: form.user.value,
      rating: Number(form.rating.value),
      comment: form.comment.value,
      createdBy: localStorage.getItem("user") || "Anonymous",
      createdAt: new Date().toISOString(),
    };
    try {
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/places/${id}/reviews`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newReview),
        }
      );
    } catch (error) {
      console.error("Failed to add review:", error);
    }
  };

  async function getRoute(userLat, userLng, destLat, destLng) {
  const url = `https://router.project-osrm.org/route/v1/driving/${userLng},${userLat};${destLng},${destLat}?overview=full&geometries=geojson`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.routes || data.routes.length === 0) return null;

  return data.routes[0].geometry.coordinates.map(
    ([lng, lat]) => [lat, lng]
  );
}


  return (
    <div className="min-h-screen flex flex-col bg-neutral">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">{place.name}</h1>

          <button
            onClick={() => setShowPreview(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            360° Preview
          </button>
        </div>

        <img
          src={place.image}
          alt={place.name}
          className="w-full h-80 object-cover rounded-xl shadow-lg"
        />

        <h1 className="text-3xl font-bold mt-4">About</h1>
        <p className="mt-4 text-lg">
          {place.about}
          <a
            href={place.readmore}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 ml-2 cursor-pointer"
          >
            read more...
          </a>
        </p>

        <div
          className="inline-flex items-center space-x-2
                 bg-gray-200 hover:bg-gray-350 
                 text-black font-medium 
                 px-4 py-2 rounded-full 
                 transition-colors duration-200 
                 cursor-pointer mb-2 mt-4"
        >
          <MapPin size={20} className="text-black" />
          <span>{place.category}</span>
        </div>

        <h2 className="text-2xl font-bold mt-10 mb-4">Images Gallery</h2>

        {/* Image Gallery */}
        <div className="relative w-full p-6">
          <div className="relative bg-white shadow-xl rounded-3xl p-6 overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: -current * 320 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              {images.map((img, i) => (
                <motion.img
                  key={i}
                  src={img}
                  onClick={() => setPreviewImage(img)}
                  className="w-72 h-72 object-cover rounded-xl shadow-md cursor-pointer"
                  whileHover={{
                    y: -10,
                    scale: 1.03,
                    boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 16 }}
                />
              ))}
            </motion.div>

            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg"
            >
              <ChevronRight />
            </button>

            <div className="flex justify-center mt-4 gap-2">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all ${
                    current === i ? "bg-blue-600 w-5" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Image Preview Modal */}
        {previewImage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-primary text-white p-4 flex justify-between items-center">
                <h3 className="font-semibold">Image Preview</h3>

                <button
                  onClick={() => setPreviewImage(null)}
                  className="text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-4">
                <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center">
                  <img
                    src={previewImage}
                    className="w-full max-h-[70vh] object-contain rounded-lg shadow"
                  />
                </div>
              </div>

              <div className="border-t p-4 flex justify-end">
                <button
                  onClick={() => setPreviewImage(null)}
                  className="btn-primary"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Videos */}
        <h1 className="text-2xl font-bold mt-10 mb-4">
          Watch Videos to Explore more
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mt-10">
          {place.video1 && (
            <motion.iframe
              width="100%"
              src={place.video1.replace("watch?v=", "embed/")}
              className="rounded-xl shadow-lg sm:h-60 md:h-72 lg:h-96"
              whileHover={{
                y: -10,
                scale: 1.02,
                boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            ></motion.iframe>
          )}

          {place.video2 && (
            <motion.iframe
              width="100%"
              src={place.video2.replace("watch?v=", "embed/")}
              className="rounded-xl shadow-lg sm:h-60 md:h-72 lg:h-96"
              whileHover={{
                y: -10,
                scale: 1.02,
                boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            ></motion.iframe>
          )}
        </div>


        {/* Directions Section*/}
        <h2 className="text-3xl font-bold mt-4">Live Navigation</h2>
        <p className="text-gray-400 mt-2">
          Get real-time directions to {place.name} from your current location.
        </p>

        <div className="mt-8 rounded-xl overflow-hidden border border-gray-700 shadow-xl">
          {placeCoords ? (
            <MapContainer
              center={
                coords
                  ? [coords.latitude, coords.longitude]
                  : [placeCoords.latitude, placeCoords.longitude]
              }
              zoom={13}
              style={{ height: "550px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />

              {/* Destination marker */}
              <Marker
                position={[
                  placeCoords.latitude,
                  placeCoords.longitude,
                ]}
                icon={redIcon}
              >
                <Popup>{place.name} (Destination)</Popup>
              </Marker>

              {/* User live marker + path */}
              {coords && (
                <>
                  <Marker
                    position={[
                      coords.latitude,
                      coords.longitude,
                    ]}
                  >
                    <Popup>You are here</Popup>
                  </Marker>
                  {path.length > 1 && (
                    <Polyline positions={path} />
                  )}
                </>
              )}
              {route && (
  <Polyline
    positions={route}
    pathOptions={{ color: "blue", weight: 5 }}
  />
)}

            </MapContainer>
          ) : (
            <div className="p-10 text-center text-gray-300">
              Loading map...
            </div>
          )}
        </div>

        {/* Nearby Services Section */}
        <h2 className="text-2xl font-bold mt-10 mb-4">Nearby Services</h2>
        <p className="text-gray-400 mb-8">
          Find essential services and amenities near {place.name} to make your
          visit comfortable and safe.
        </p>
        <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {services.map((s) => (
            <motion.button
              key={s.id}
              className="group flex items-center gap-4 mt-2 text-black rounded-xl border border-gray-700 bg-gray-900/60 px-6 py-6 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-shadow hover:shadow-lg"
              whileHover={{
                y: -10,
                scale: 1.02,
                boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              aria-label={s.label}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-transparent border border-transparent group-hover:border-teal-400">
                <s.Icon className="h-6 w-6 text-teal-300" />
              </div>

              <span className="text-left">
                <div className="text-base font-semibold text-black">
                  {s.label}
                </div>
              </span>
            </motion.button>
          ))}
        </section>

        {/* Real-time Navigation Card (Distance + Buttons) */}
        <div className="bg-[#2E2E2E] text-black p-6 rounded-xl shadow-lg max-w-3xl mx-2 mt-10 border border-gray-700">
          <h2 className="text-2xl font-bold mb-3">Real-time Navigation</h2>

          <div className="flex items-center space-x-2">
            <span
              className={`w-3 h-3 rounded-full ${
                tracking ? "bg-green-500" : "bg-gray-400"
              }`}
            />
            <span className="text-black font-medium">
              {tracking ? "Live tracking active" : "Live tracking inactive"}
            </span>
          </div>

          <p className="text-black text-sm mt-2">
            Start live tracking to get real-time distance updates as you move.
          </p>

          <div className="flex mt-6 gap-4">
            {!tracking ? (
              <button
                onClick={startTracking}
                className="flex items-center justify-center gap-2 bg-[#3C3C3C] hover:bg-[#4A4A4A] px-6 py-3 rounded-lg flex-1 transition-all"
              >
                <PlusCircle size={20} />
                <span className="font-semibold">Start Live Tracking</span>
              </button>
            ) : (
              <button
                onClick={stopTracking}
                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg flex-1 transition-all"
              >
                <PlusCircle size={20} />
                <span className="font-semibold">Stop Tracking</span>
              </button>
            )}

            <button
              onClick={openInGoogleMaps}
              className="flex items-center justify-center gap-2 bg-[#22B8CF] hover:bg-[#18A9BF] text-black font-semibold px-6 py-3 rounded-lg flex-1 transition-all"
            >
              <MapPin size={20} />
              Open in Google Maps
            </button>
          </div>

          {coords && (
            <div className="mt-4 text-black text-sm">
              <p>Latitude: {coords.latitude.toFixed(6)}</p>
              <p>Longitude: {coords.longitude.toFixed(6)}</p>
            </div>
          )}

          {distance !== null && (
            <div className="mt-4 bg-black/20 p-4 rounded-lg border border-gray-600">
              <h3 className="text-lg font-semibold">
                Distance to Destination:
              </h3>
              <p className="text-xl font-bold text-teal-300">
                {distance.toFixed(2)} km
              </p>
            </div>
          )}
        </div>
      </div>
      
        {/* Nearby Places Section */}
        <h2 className="text-2xl font-bold mt-10 mb-4">
          Nearby Places to Explore
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {place.nearbyPlaces?.length > 0 ? (
            place.nearbyPlaces.map((near) => (
              <motion.div
                key={near._id}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <Link
                  to={`/details/${near._id}`}
                  className="bg-white rounded-xl shadow-lg p-4 block overflow-hidden"
                >
                  <img
                    src={near.image}
                    alt={near.name}
                    className="h-20 md:h-40 lg:h-60 w-full object-cover rounded-lg"
                  />
                  <h3 className="font-bold text-lg mt-2">{near.name}</h3>
                </Link>
              </motion.div>
            ))
          ) : (
            <p>No nearby places.</p>
          )}
        </div>

      {/* Reviews Section */}
      <div className="p-6 bg-white rounded-2xl shadow-lg w-full mx-6 mt-10">
        <h2 className="text-3xl font-bold mb-6">Leave feedback</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Form */}
          <div>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg p-3 mb-4"
            />

            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-4xl cursor-pointer ${
                    star <= rating ? "text-blue-500" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            <textarea
              placeholder="Your feedback"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={5}
              className="w-full border rounded-lg p-3"
            ></textarea>

            <button
              onClick={handleSubmit}
              className="mt-4 w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </div>

          {/* Right Review Display */}
          <div className="relative w-full py-10 overflow-hidden flex justify-center ml-2">
            <div className="w-full max-w-full">
              <div className="flex items-center justify-center relative overflow-hidden">
                <div
                  className="flex transition-transform duration-500 items-stretch min-w-full"
                  style={{
                    transform: `translateX(calc(-${
                      currentReview * 33.33
                    }% + 7%))`,
                  }}
                >
                  {reviews.map((rev, index) => {
                    const isCenter = index === currentReview;

                    return (
                      <div
                        key={index}
                        className={`flex-shrink-0 px-4 transition-all duration-500 md:w-[43.33%]`}
                      >
                        <div
                          className={`rounded-2xl bg-white shadow-2xl p-8 transition-all duration-500 h-full flex flex-col justify-between ${
                            isCenter
                              ? "scale-110 opacity-100 ring-4 ring-blue-500/50"
                              : "scale-90 opacity-70"
                          }`}
                        >
                          <h3 className="text-xl font-bold text-center">
                            {rev.user}
                          </h3>

                          <div className="flex justify-center gap-1 my-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                className={`text-2xl ${
                                  star <= rev.rating
                                    ? "text-blue-600"
                                    : "text-gray-300"
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>

                          <p className="text-gray-700 text-center leading-relaxed">
                            {rev.comment}
                          </p>

                          <div className="mt-4 text-sm text-gray-500 border-t pt-3 text-center">
                            <p>
                              @{" "}
                              <span className="font-semibold text-black">
                                {rev.createdBy}
                              </span>
                            </p>
                            <p>
                              <span className="font-semibold">
                                {new Date(
                                  rev.createdAt
                                ).toLocaleDateString("en-IN", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={prevReview}
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition z-10"
                >
                  ←
                </button>

                <button
                  onClick={nextReview}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-lg w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition z-10"
                >
                  →
                </button>
              </div>

              <div className="flex justify-center gap-3 mt-6">
                {reviews.map((_, index) => (
                  <span
                    key={index}
                    className={`w-3 h-3 rounded-full transition cursor-pointer ${
                      index === currentReview
                        ? "bg-blue-600"
                        : "bg-gray-300"
                    }`}
                    onClick={() => setCurrentReview(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AR/VR Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-primary text-white p-4 flex justify-between items-center">
              <h3 className="font-semibold">360° Preview - {place.name}</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div className="p-2">
              <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
                <div className="text-center">
                  <div
                    className="w-full"
                    dangerouslySetInnerHTML={{ __html: place.arembed }}
                  />
                  <p className="mt-2 text-sm text-gray-600">
                    In the full version, this would be an interactive 360° view
                    or AR experience of {place.name}.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t p-4 flex justify-end">
              <button
                onClick={() => setShowPreview(false)}
                className="btn-primary"
              >
                Close Preview
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default PlaceDetailsPage;
