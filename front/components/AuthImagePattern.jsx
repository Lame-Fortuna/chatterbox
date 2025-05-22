const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base p-6 mt-4">
      <div className="max-w-md text-center text-black">
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-xl bg-blue-200 ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
            />
          ))}
        </div>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700">{subtitle}</p>
      </div>
    </div>
  );
};


export default AuthImagePattern;