import React, { useState } from "react";
import Navbar from "../components/Navbar";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message);

    if (data.success) {
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user)); 
  localStorage.setItem("userId", data.user._id);
  window.location.href = "/";
}
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral">
    <Navbar />
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="font-bold text-green-600 mb-6">Smart Tourism Jharkhand</h1>
      <form className="w-96 bg-white p-6 shadow rounded" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4 text-center">Login In to Your Account</h2>
        <p className="text-center text-gray-400 mb-4">Welcome back! Please enter your details.</p>
        <input
          className="border p-2 w-full mb-3"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="border p-2 w-full mb-3"
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="btn-primary w-full">Login</button>
        <p>Create an account? <a href="/signup" className="text-blue-600">Signup</a></p>
      </form>
    </div>
    </div>
  );
};

export default Login;
