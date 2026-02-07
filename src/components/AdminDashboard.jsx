import { useState } from "react"
import AdminAddQuestion from "./AdminAddQuestion"
import AdminUsers from "./AdminUsers"

export default function AdminDashboard() {
  const [tab, setTab] = useState("stats")

  return (
    <div className="w-full max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        Admin Dashboard
      </h1>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        <TabButton
          label="Overview"
          active={tab === "stats"}
          onClick={() => setTab("stats")}
        />
        <TabButton
          label="Add Question"
          active={tab === "add"}
          onClick={() => setTab("add")}
        />
        <TabButton
          label="Manage Users"
          active={tab === "users"}
          onClick={() => setTab("users")}
        />
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        {tab === "stats" && <Stats />}
        {tab === "add" && <AdminAddQuestion />}
        {tab === "users" && <AdminUsers />}
      </div>
    </div>
  )
}

function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium ${
        active
          ? "bg-indigo-900 text-white"
          : "bg-gray-200 dark:bg-gray-700 dark:text-white"
      }`}
    >
      {label}
    </button>
  )
}

function Stats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard title="Questions" value="—" />
      <StatCard title="Users" value="—" />
      <StatCard title="Admins" value="—" />
    </div>
  )
}

function StatCard({ title, value }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
      <p className="text-sm text-gray-500 dark:text-gray-300">
        {title}
      </p>
      <p className="text-2xl font-bold dark:text-white">
        {value}
      </p>
    </div>
  )
}
