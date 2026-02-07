import { useLocation, useNavigate } from "react-router-dom"
import { FaRedoAlt, FaHome, FaCheckCircle } from "react-icons/fa"
import CircularProgress from "./CircularProgress"

export default function Result({ onRestart }) {
  const navigate = useNavigate()
  const { state } = useLocation()

  // 🛑 Safety check (direct access)
  if (!state) {
    navigate("/")
    return null
  }

  const { score, total, category } = state
  const percentage = Math.round((score / total) * 100)

  function handlePlayAgain() {
    onRestart()
    navigate("/quiz", {
      state: { category },
    })
  }

  function handleHome() {
    navigate("/")
  }

  return (
    <div className="bg-white w-[360px] p-6 rounded-2xl shadow-lg text-center">

      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-2">
        <FaCheckCircle className="text-green-500 text-xl" />
        <h2 className="text-2xl font-bold text-gray-800">
          Quiz Completed
        </h2>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Category: <span className="font-semibold">{category}</span>
      </p>

      {/* Progress */}
      <CircularProgress value={score} max={total} />

      <p className="mt-4 text-base font-medium text-gray-700">
        You scored{" "}
        <span className="font-bold text-blue-600">
          {score}
        </span>{" "}
        out of{" "}
        <span className="font-bold">{total}</span>
      </p>

      <p className="text-sm text-gray-500 mt-1">
        Accuracy: {percentage}%
      </p>

      {/* Actions */}
      <div className="mt-6 space-y-3">
        <button
          onClick={handlePlayAgain}
          className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-900"
        >
          <FaRedoAlt />
          Play Again
        </button>

        <button
          onClick={handleHome}
          className="w-full flex items-center justify-center gap-2 border py-2.5 rounded-lg hover:bg-gray-100"
        >
          <FaHome />
          Back to Home
        </button>
      </div>
    </div>
  )
}
