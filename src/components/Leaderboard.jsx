import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaTrophy } from "react-icons/fa";
import API_BASE_URL from "../utils/api";

export default function Leaderboard() {
  const { user, loading: authLoading } = useAuth();
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    fetch(`${API_BASE_URL}/api/attempts/me`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // ✅ latest 5 attempts only
        setAttempts(data.slice(0, 5));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  // ⏳ Wait for auth to load
  if (authLoading) {
    return (
      <div className="bg-white max-w-md mx-auto p-6 rounded-xl shadow text-center">
        Checking login...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-white max-w-md mx-auto p-6 rounded-xl shadow text-center">
        <p className="text-yellow-500 text-lg">
          Login to see your quiz attempts
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white max-w-md mx-auto p-6 rounded-xl shadow text-center">
        Loading attempts...
      </div>
    );
  }

  return (
    <div className="bg-white max-w-md mx-auto p-6 rounded-xl shadow">
      <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
        <FaTrophy className="text-yellow-500" />
        Your Latest Attempts
      </h2>

      {attempts.length === 0 ? (
        <p className="text-gray-500">No attempts yet</p>
      ) : (
        attempts.map((a) => (
          <div
            key={a._id}
            className="flex justify-between py-2 border-b text-sm"
          >
            <div>
              <p className="font-medium">{a.category}</p>
              <p className="text-xs text-gray-500">
                {new Date(a.createdAt).toLocaleString()}
              </p>
            </div>
            <span className="font-semibold">
              {a.score}/{a.total}
            </span>
          </div>
        ))
      )}
    </div>
  );
}
