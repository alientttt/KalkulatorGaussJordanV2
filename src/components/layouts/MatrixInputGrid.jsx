const MatrixInputGrid = ({ matrix, handleMatrixChange, matrixSize, activeMethod }) => {
  return (
    <div className="mb-6">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {matrix.map((row, i) => (
            <div key={i} className="flex gap-2 mb-2 justify-center">
              {row.map((cell, j) => (
                <input
                  key={`${i}-${j}`}
                  type="number"
                  step="0.01"
                  value={cell}
                  onChange={(e) => handleMatrixChange(i, j, e.target.value)}
                  className={`w-16 h-12 text-center border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    j === matrixSize
                      ? "border-l-4 border-l-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }`}
                  placeholder="0"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      {activeMethod !== "matrix-inverse" && (
        <p className="text-sm text-gray-500 mt-2 text-center">
          Kolom terakhir adalah konstanta (b)
        </p>
      )}
    </div>
  );
};

export default MatrixInputGrid;