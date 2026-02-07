import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function ProtectedAdmin({ children }) {
  const { user, loading } = useAuth()

  // ⏳ Wait until auth state is loaded from localStorage
  if (loading) {
    return (
      <div className="mt-24 text-center text-gray-500">
        Checking admin access...
      </div>
    )
  }

  // 🔐 Not logged in
  if (!user) {
    return <Navigate to="/login" />
  }

  // 🚫 Logged in but not admin
  if (!user.isAdmin) {
    return <Navigate to="/" />
  }

  // ✅ Admin access granted
  return children
}
