const FeatureCard = ({ title, image,onClick }) => {
  return (
    <div className="group relative w-48 h-64 md:w-52 md:h-72 rounded-full overflow-hidden cursor-pointer shadow-xl" onClick={onClick}>
      
      <img
        src={image}
        alt={title}
        className="
          absolute inset-0 w-full h-full object-cover 
          transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl
        "
      />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <h2 className="text-white text-3xl font-semibold drop-shadow-xl text-center">
          {title}
        </h2>
      </div>

    </div>
  );
};


export default FeatureCard;
