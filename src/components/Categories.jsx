import { useNavigate } from "react-router-dom"
import html from "../assets/categories/html.png"
import js from "../assets/categories/java-script.png"
import react from "../assets/categories/react.png"
import cpp from "../assets/categories/c-.png"
import python from "../assets/categories/python.png"

const categories = [
  { name: "HTML", icon: html },
  { name: "JavaScript", icon: js },
  { name: "React", icon: react },
  { name: "C++", icon: cpp },
  { name: "Python", icon: python },
]

export default function Categories({ search = "" }) {
  const navigate = useNavigate()

  function handleCategoryClick(category) {
    navigate("/quiz", { state: { category } })
  }

  // 🔍 Filter categories using search text
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">
        Categories
      </h2>

      {filteredCategories.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No categories found
        </p>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
          {filteredCategories.map((cat) => (
            <div
              key={cat.name}
              role="button"
              tabIndex={0}
              onClick={() => handleCategoryClick(cat.name)}
              onKeyDown={(e) =>
                e.key === "Enter" && handleCategoryClick(cat.name)
              }
              className="bg-white dark:bg-gray-800 rounded-xl p-4 flex flex-col items-center shadow hover:shadow-lg hover:-translate-y-1 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <img
                src={cat.icon}
                alt={cat.name}
                className="w-10 h-10 object-contain"
              />

              <p className="text-sm mt-2 font-medium dark:text-gray-200">
                {cat.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
