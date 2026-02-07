import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaGlobeAsia } from "react-icons/fa";
import API_BASE_URL from "../utils/api";

export default function GlobalLeaderboard() {
  const { user, loading: authLoading } = useAuth();
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    fetch(`${API_BASE_URL}/api/attempts/leaderboard`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setScores(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  // ⏳ Wait for auth
  if (authLoading) {
    return <div className="text-center p-6">Checking login...</div>;
  }

  if (!user) {
    return (
      <div className="text-center p-6 text-yellow-500">
        Please login to see the global leaderboard
      </div>
    );
  }

  if (loading) {
    return <div className="text-center p-6">Loading leaderboard...</div>;
  }

  return (
    <div className="bg-white max-w-md mx-auto p-6 rounded-xl shadow">
      <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
        <FaGlobeAsia className="text-blue-500 animate-spin-slow" />
        Global Leaderboard
      </h2>

      {scores.length === 0 ? (
        <p className="text-gray-500">No scores yet</p>
      ) : (
        scores.map((item, index) => (
          <div
            key={item.userId}
            className="flex justify-between items-center py-2 border-b last:border-none"
          >
            <div>
              <p className="font-medium">
                #{index + 1} {item.name}
              </p>
              <p className="text-xs text-gray-500">
                {item.email}
              </p>
            </div>
            <span className="font-bold">
              {item.bestScore}/{item.total}
            </span>
          </div>
        ))
      )}
    </div>
  );
}
