const MethodSelection = ({ activeMethod, setActiveMethod, setResult }) => {
  const methods = [
    { id: "gauss-jordan", name: "Gauss Jordan", icon: "⚡" },
    { id: "gauss-seidel", name: "Gauss Seidel", icon: "🔄" },
    { id: "matrix-inverse", name: "Matriks Balikan", icon: "🔄" },
  ];
  return (
    <div
      className="bg-blue-400 p-8 mb-8 animate-slide-up border-8 border-blue-900 relative overflow-hidden"
      style={{
        boxShadow: "inset -4px -4px 0 0 #1e3a8a, inset 4px 4px 0 0 #bfdbfe",
        imageRendering: "pixelated",
        background:
          "linear-gradient(180deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%)",
      }}
    >
      {/* Pixel clouds decoration */}
      <div
        className="absolute top-4 left-8 w-16 h-8 bg-white border-2 border-blue-800 opacity-80"
        style={{ imageRendering: "pixelated" }}
      ></div>
      <div
        className="absolute top-8 right-12 w-12 h-6 bg-white border-2 border-blue-800 opacity-60"
        style={{ imageRendering: "pixelated" }}
      ></div>
      <div
        className="absolute top-12 left-24 w-8 h-6 bg-white border-2 border-blue-800 opacity-70"
        style={{ imageRendering: "pixelated" }}
      ></div>

      {/* Pixel sun */}
      <div
        className="absolute top-6 right-20 w-12 h-12 bg-yellow-400 border-4 border-yellow-600 rounded-none"
        style={{
          imageRendering: "pixelated",
          boxShadow: "inset -2px -2px 0 0 #ca8a04, inset 2px 2px 0 0 #fef08a",
        }}
      ></div>

      <h2
        className="text-3xl font-black text-white mb-6 font-mono tracking-widest uppercase relative z-10"
        style={{
          textShadow: "2px 2px 0 #1e40af, 4px 4px 0 #1e3a8a",
        }}
      >
        PILIH METODE
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {methods.map((method) => (
          <button
            key={method.id}
            onClick={() => {
              setActiveMethod(method.id);
              setResult(null);
            }}
            className={`
          relative p-8 font-mono font-black text-xl uppercase tracking-wider
          transition-none transform-none border-8 border-black
          ${
            activeMethod === method.id
              ? `bg-yellow-400 text-black`
              : `bg-gray-300 text-black hover:bg-gray-200`
          }
        `}
            style={{
              boxShadow:
                activeMethod === method.id
                  ? "inset -6px -6px 0 0 #b45309, inset 6px 6px 0 0 #fef3c7, 8px 8px 0 0 #000000"
                  : "8px 8px 0 0 #000000, inset -4px -4px 0 0 #6b7280, inset 4px 4px 0 0 #ffffff",
              imageRendering: "pixelated",
            }}
            onMouseDown={(e) => {
              e.target.style.transform = "translate(4px, 4px)";
              e.target.style.boxShadow =
                activeMethod === method.id
                  ? "inset -6px -6px 0 0 #b45309, inset 6px 6px 0 0 #fef3c7, 4px 4px 0 0 #000000"
                  : "4px 4px 0 0 #000000, inset -4px -4px 0 0 #6b7280, inset 4px 4px 0 0 #ffffff";
            }}
            onMouseUp={(e) => {
              e.target.style.transform = "translate(0, 0)";
              e.target.style.boxShadow =
                activeMethod === method.id
                  ? "inset -6px -6px 0 0 #b45309, inset 6px 6px 0 0 #fef3c7, 8px 8px 0 0 #000000"
                  : "8px 8px 0 0 #000000, inset -4px -4px 0 0 #6b7280, inset 4px 4px 0 0 #ffffff";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translate(0, 0)";
              e.target.style.boxShadow =
                activeMethod === method.id
                  ? "inset -6px -6px 0 0 #b45309, inset 6px 6px 0 0 #fef3c7, 8px 8px 0 0 #000000"
                  : "8px 8px 0 0 #000000, inset -4px -4px 0 0 #6b7280, inset 4px 4px 0 0 #ffffff";
            }}
          >
            <div
              className="text-5xl mb-4 select-none"
              style={{
                filter: "contrast(1.2)",
                textShadow: "2px 2px 0 rgba(0,0,0,0.5)",
              }}
            >
              {method.icon}
            </div>
            <div
              className="font-black tracking-widest select-none"
              style={{
                textShadow: "1px 1px 0 rgba(255,255,255,0.8)",
              }}
            >
              {method.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MethodSelection;
