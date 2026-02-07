import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  FaHtml5,
  FaJsSquare,
  FaReact,
  FaPython,
  FaCode,
} from "react-icons/fa";
import API_BASE_URL from "../utils/api";

const categoryIcons = {
  HTML: (
    <FaHtml5 className="text-orange-500 text-2xl group-hover:animate-bounce" />
  ),
  JavaScript: (
    <FaJsSquare className="text-yellow-400 text-2xl group-hover:animate-pulse" />
  ),
  React: (
    <FaReact className="text-blue-500 text-2xl transition-transform duration-500 group-hover:rotate-180" />
  ),
  Python: (
    <FaPython className="text-green-500 text-2xl group-hover:animate-wiggle" />
  ),
  "C++": (
    <FaCode className="text-indigo-500 text-2xl transition-transform duration-300 group-hover:scale-125" />
  ),
};

function getRingColor(percent) {
  if (percent >= 80) return "border-green-500 text-green-600";
  if (percent >= 50) return "border-yellow-500 text-yellow-600";
  return "border-red-500 text-red-600";
}

export default function RecentActivity() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    async function fetchActivities() {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/attempts/me`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const data = await res.json();

        // ✅ latest 5 attempts only
        setActivities(data.slice(0, 5));
      } catch (err) {
        console.error("Failed to load recent activity", err);
      } finally {
        setLoading(false);
      }
    }

    fetchActivities();
  }, [user]);

  return (
    <div className="mt-10">
      <h2 className="text-lg font-semibold mb-4">
        Recent Activity
      </h2>

      {!user && (
        <p className="text-gray-500 text-sm">
          Login to see your recent activity
        </p>
      )}

      {user && loading && (
        <p className="text-gray-500 text-sm">
          Loading recent activity...
        </p>
      )}

      {user && !loading && activities.length === 0 && (
        <p className="text-gray-500 text-sm">
          No recent activity yet
        </p>
      )}

      <div className="space-y-4">
        {activities.map((item) => {
          const percent = Math.round(
            (item.score / item.total) * 100
          );

          return (
            <div
              key={item._id}
              onClick={() =>
                navigate("/result", {
                  state: {
                    score: item.score,
                    total: item.total,
                    category: item.category,
                  },
                })
              }
              className="bg-white p-4 rounded-xl flex justify-between items-center shadow cursor-pointer hover:shadow-md transition"
            >
              {/* Left */}
              <div className="flex items-center gap-3">
                <div className="group w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg">
                  {categoryIcons[item.category] || (
                    <FaCode className="text-gray-500 text-2xl" />
                  )}
                </div>

                <div>
                  <h3 className="font-medium">
                    {item.category}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Right – Score Ring */}
              <div
                className={`w-12 h-12 rounded-full border-4 flex items-center justify-center text-xs font-semibold ${getRingColor(
                  percent
                )}`}
              >
                {percent}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
