import React, { useState } from "react";
import MatrixSizeSelector from "./MatrixSizeSelector";
import MatrixInputGrid from "./MatrixInputGrid";
const MainContent = ({ activeMethod, result, setResult }) => {
  const [matrixSize, setMatrixSize] = useState(3);
  const [matrix, setMatrix] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  // Initialize matrix based on size
  React.useEffect(() => {
    const newMatrix = Array(matrixSize)
      .fill()
      .map(() => Array(matrixSize + 1).fill(0));
    setMatrix(newMatrix);
    setResult(null);
  }, [matrixSize]);

  // Handle matrix input
  const handleMatrixChange = (row, col, value) => {
    const newMatrix = [...matrix];
    newMatrix[row][col] = parseFloat(value) || 0;
    setMatrix(newMatrix);
  };
  // Calculate based on selected method
  const calculate = () => {
    if (!matrix.length) return;

    setIsAnimating(true);
    setTimeout(() => {
      try {
        let calculationResult;

        switch (activeMethod) {
          case "gauss-jordan":
            calculationResult = GaussJordan(matrix);
            break;
          case "gauss-seidel":
            calculationResult = gaussSeidel(matrix);
            break;
          case "matrix-inverse":
            const inverse = matrixInverse(matrix);
            calculationResult = { inverse };
            break;
          default:
            return;
        }

        setResult(calculationResult);
      } catch (error) {
        setResult({ error: error.message });
      }
      setIsAnimating(false);
    }, 800);
  };
  // Gauss Jordan Method
  const GaussJordan = (mat) => {
    const n = mat.length;
    const augmented = mat.map((row) => [...row]);
    const steps = [];

    for (let i = 0; i < n; i++) {
      // Find pivot
      let maxRow = i;
      for (let k = i + 1; k < n; k++) {
        if (Math.abs(augmented[k][i]) > Math.abs(augmented[maxRow][i])) {
          maxRow = k;
        }
      }

      // Swap rows
      if (maxRow !== i) {
        [augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];
        steps.push(`Tukar baris ${i + 1} dengan baris ${maxRow + 1}`);
      }

      // Make diagonal element 1
      const pivot = augmented[i][i];
      if (Math.abs(pivot) < 1e-10) {
        throw new Error("Matrix singular atau tidak dapat diselesaikan");
      }

      for (let j = 0; j <= n; j++) {
        augmented[i][j] /= pivot;
      }
      steps.push(`Baris ${i + 1} dibagi ${pivot.toFixed(4)}`);

      // Make other elements in column 0
      for (let k = 0; k < n; k++) {
        if (k !== i) {
          const factor = augmented[k][i];
          for (let j = 0; j <= n; j++) {
            augmented[k][j] -= factor * augmented[i][j];
          }
          if (Math.abs(factor) > 1e-10) {
            steps.push(
              `Baris ${k + 1} = Baris ${k + 1} - ${factor.toFixed(4)} × Baris ${
                i + 1
              }`
            );
          }
        }
      }
    }

    const solution = augmented.map((row) => row[n]);
    return { solution, steps, finalMatrix: augmented };
  };

  // Gauss Seidel Method
  const gaussSeidel = (mat, maxIterations = 100, tolerance = 1e-6) => {
    const n = mat.length;
    let x = Array(n).fill(0);
    const iterations = [];

    for (let iter = 0; iter < maxIterations; iter++) {
      const xOld = [...x];

      for (let i = 0; i < n; i++) {
        let sum = mat[i][n];
        for (let j = 0; j < n; j++) {
          if (i !== j) {
            sum -= mat[i][j] * x[j];
          }
        }
        x[i] = sum / mat[i][i];
      }

      iterations.push({
        iteration: iter + 1,
        values: [...x],
        error: Math.max(...x.map((val, i) => Math.abs(val - xOld[i]))),
      });

      // Check convergence
      const error = Math.max(...x.map((val, i) => Math.abs(val - xOld[i])));
      if (error < tolerance) {
        break;
      }
    }

    return { solution: x, iterations };
  };

  // Matrix Inverse
  const matrixInverse = (mat) => {
    const n = mat.length;
    // Create augmented matrix [A|I]
    const augmented = mat.map((row, i) => {
      const newRow = [...row.slice(0, n)]; // Only take coefficient part
      for (let j = 0; j < n; j++) {
        newRow.push(i === j ? 1 : 0);
      }
      return newRow;
    });

    // Apply Gauss-Jordan
    for (let i = 0; i < n; i++) {
      // Find pivot
      let maxRow = i;
      for (let k = i + 1; k < n; k++) {
        if (Math.abs(augmented[k][i]) > Math.abs(augmented[maxRow][i])) {
          maxRow = k;
        }
      }

      // Swap rows
      if (maxRow !== i) {
        [augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];
      }

      // Check for singular matrix
      if (Math.abs(augmented[i][i]) < 1e-10) {
        throw new Error("Matrix singular, tidak memiliki invers");
      }

      // Make diagonal element 1
      const pivot = augmented[i][i];
      for (let j = 0; j < 2 * n; j++) {
        augmented[i][j] /= pivot;
      }

      // Make other elements in column 0
      for (let k = 0; k < n; k++) {
        if (k !== i) {
          const factor = augmented[k][i];
          for (let j = 0; j < 2 * n; j++) {
            augmented[k][j] -= factor * augmented[i][j];
          }
        }
      }
    }

    // Extract inverse matrix
    const inverse = augmented.map((row) => row.slice(n));
    return inverse;
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Input Section */}
      <div className="rounded-2xl shadow-xl p-6 animate-slide-up">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Input Matriks
        </h2>

        {/* Matrix Size Selector */}
        <MatrixSizeSelector matrixSize={matrixSize} setMatrixSize={setMatrixSize} />

        {/* Matrix Input Grid */}
        <MatrixInputGrid matrix={matrix} handleMatrixChange={handleMatrixChange} matrixSize={matrixSize}activeMethod={activeMethod}/>

        {/* Calculate Button */}
        <button
          onClick={calculate}
          disabled={isAnimating}
          className={`w-full py-3 px-6 rounded-xl font-semibold text-black transition-all duration-300 transform ${
            isAnimating
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-gray-100 to-blue-300 hover:from-gray-200 hover:to-blue-200 hover:scale-105 shadow-lg hover:shadow-xl"
          }`}
        >
          {isAnimating ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Menghitung...
            </div>
          ) : (
            "Hitung"
          )}
        </button>
      </div>

      {/* Result Section */}
      <div className="rounded-2xl shadow-xl p-6 animate-slide-up">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Hasil Perhitungan
        </h2>

        {result ? (
          <div className="animate-fade-in">
            {result.error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 font-medium">Error:</p>
                <p className="text-red-600">{result.error}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Solution Display */}
                {result.solution && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-800 mb-2">
                      Solusi:
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {result.solution.map((val, i) => (
                        <div key={i} className="flex justify-between">
                          <span className="font-medium">x{i + 1}:</span>
                          <span className="font-mono">{val.toFixed(6)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Matrix Inverse Display */}
                {result.inverse && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-800 mb-2">
                      Matriks Balikan (A⁻¹):
                    </h3>
                    <div className="overflow-x-auto">
                      <div
                        className="grid gap-1"
                        style={{
                          gridTemplateColumns: `repeat(${matrixSize}, 1fr)`,
                        }}
                      >
                        {result.inverse.flat().map((val, i) => (
                          <div
                            key={i}
                            className="bg-white p-2 rounded text-center text-sm font-mono"
                          >
                            {val.toFixed(4)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Gauss Seidel Iterations */}
                {result.iterations && (
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 max-h-64 overflow-y-auto">
                    <h3 className="font-semibold text-purple-800 mb-2">
                      Iterasi:
                    </h3>
                    <div className="space-y-2">
                      {result.iterations.slice(-10).map((iter, i) => (
                        <div key={i} className="text-sm">
                          <span className="font-medium">
                            Iterasi {iter.iteration}:
                          </span>
                          <div className="ml-4 font-mono">
                            {iter.values.map((val, j) => (
                              <div key={j}>
                                x{j + 1} = {val.toFixed(6)}
                              </div>
                            ))}
                            <div className="text-gray-600">
                              Error: {iter.error.toFixed(8)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Steps for Gauss Jordan */}
                {result.steps && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-h-64 overflow-y-auto">
                    <h3 className="font-semibold text-yellow-800 mb-2">
                      Langkah-langkah:
                    </h3>
                    <ol className="list-decimal list-inside space-y-1 text-sm">
                      {result.steps.map((step, i) => (
                        <li key={i} className="text-gray-700">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-12">
            <div className="text-6xl mb-4">📊</div>
            <p>Masukkan matriks dan klik "Hitung" untuk melihat hasil</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContent;
