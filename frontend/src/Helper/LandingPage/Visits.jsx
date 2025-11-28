import React from 'react'
import FeatureCard from './FeatureCard'
import { useNavigate } from "react-router-dom";

function Visits() {
  const navigate = useNavigate();

  return (
    <section className="flex h-screen items-center justify-center bg-gray-100">
        <div className="w-full py-16 bg-[#FCF8EE] text-center">
      <h1 className="text-4xl font-bold text-[#6A2A00] mb-14">
        Why Visit Jharkhand?
      </h1>

      <div className="flex justify-center gap-6 flex-wrap md:gap-16">
        <FeatureCard
          title="Tribal Culture"
          image="https://i0.wp.com/avenuemail.in/wp-content/uploads/2022/11/samvaad-2.jpg?fit=1280%2C853&ssl=1"
          onClick={() => navigate("/tribalculture")}
        />

        <FeatureCard
          title="Folk Dance"
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Chhau_Nritya_%281%29.jpg/1920px-Chhau_Nritya_%281%29.jpg"
          onClick={() => navigate("/folkdance")}
        />

        <FeatureCard
          title="Cuisine"
          image="https://static.toiimg.com/photo/79000181.cms"
          onClick={() => navigate("/cuisine")}
        />
        <FeatureCard
          title="Nature"
          image="https://img.freepik.com/premium-photo/patratu-valley-ranchi-beautiful-place-jharkhand_459244-239.jpg"
          onClick={() => navigate("/places")}
        />

      </div>
    </div>
      </section>
  )
}

export default Visits
