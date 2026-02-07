export default function CircularProgress({ value, max }) {
  const radius = 36
  const circumference = 2 * Math.PI * radius
  const progress = (value / max) * circumference

  return (
    <svg width="100" height="100" className="mx-auto">
      <circle
        cx="50"
        cy="50"
        r={radius}
        stroke="#e5e7eb"
        strokeWidth="8"
        fill="none"
      />
      <circle
        cx="50"
        cy="50"
        r={radius}
        stroke="#2563eb"
        strokeWidth="8"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - progress}
        strokeLinecap="round"
        className="transition-all duration-700"
      />
      <text
        x="50"
        y="55"
        textAnchor="middle"
        className="text-lg font-bold fill-gray-800 dark:fill-white"
      >
        {value}/{max}
      </text>
    </svg>
  )
}
