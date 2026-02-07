import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true) // 🔥 ADD THIS

  // 🔁 Load user from localStorage on app start / refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false) // 🔥 AUTH LOADED
  }, [])

  function login(data) {
    localStorage.setItem("userInfo", JSON.stringify(data))
    setUser(data)
  }

  function logout() {
    localStorage.removeItem("userInfo")
    setUser(null)
  }

  // 🔁 FORCE refresh user (used after profile update)
  function refreshUser() {
    const storedUser = localStorage.getItem("userInfo")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
