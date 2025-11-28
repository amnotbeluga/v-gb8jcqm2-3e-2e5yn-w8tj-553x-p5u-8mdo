import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
function CreatePlaces() {
  const [form, setForm] = React.useState({ name: "", description: "", imageUrl: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(form);
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/places/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
  };
  return (
    <div className="min-h-screen flex flex-col bg-neutral">
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-10">
        <h1 className="font-bold text-green-600 mb-6">Smart Tourism Jharkhand</h1>
      <form className="w-96 bg-white p-6 shadow rounded mb-8" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4 text-center">Add New Place</h2>
        <input type="text" className="border p-2 w-full mb-3" placeholder="Place Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input type="text" className="border p-2 w-full mb-3" placeholder="Description" onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input type="text" className="border p-2 w-full mb-3" placeholder="Image URL" onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
        <button type="submit" className="btn-primary w-full">Create Place</button>
      </form>
      </div>
      <Footer />
    </div>
  );
}

export default CreatePlaces;