const MatrixSizeSelector = ({ matrixSize, setMatrixSize }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Ukuran Matriks (n×n)
      </label>
      <select
        value={matrixSize}
        onChange={(e) => setMatrixSize(parseInt(e.target.value))}
        className="w-32 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {[2, 3, 4, 5].map((size) => (
          <option key={size} value={size}>
            {size}×{size}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MatrixSizeSelector;
