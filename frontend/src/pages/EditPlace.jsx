import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function EditPlace() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    image: ""
  });
  useEffect(() => {
  console.log("ID:", id);
}, [id]);


  // Fetch place data on load
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/places/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          name: data.name,
          description: data.description,
          image: data.image
        });
      })
      .catch((err) => console.error("Error loading place:", err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`${process.env.REACT_APP_BACKEND_URL}/places/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Place updated successfully!");
    navigate("/places");
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral">
      <Navbar />

      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="font-bold text-green-600 mb-6 text-center">Smart Tourism Jharkhand</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-lg max-w-xl mx-auto space-y-4"
        >
          <h2 className="text-xl font-bold mb-4 text-center">Edit Place</h2>
          <div>
            <label className="block font-semibold mb-1">Place Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              className="w-full p-2 border rounded-lg"
              rows="4"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Image URL</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              required
            />
          </div>

          {/* Preview */}
{form.image && (
  <div className="mt-4">
    <p className="font-semibold mb-2">Image Preview:</p>
    <img
      src={form.image}
      alt="Preview"
      className="w-full h-56 object-cover rounded-xl border"
    />
  </div>
)}


          <button
            type="submit"
            className="btn-primary w-full py-2 rounded-lg mt-4"
          >
            Update Place
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default EditPlace;
