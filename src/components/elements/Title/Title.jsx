const Title = (props) => {
  const {children} = props
  return (
    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" style={{
          textShadow: "2px 2px 0 #1e40af, 4px 4px 0 #1e3a8a",
        }}>
        {children}
      </span>
    </h1>
  );
};

export default Title;
