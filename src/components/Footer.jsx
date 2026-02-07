import { NavLink } from "react-router-dom"
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa"

export default function Footer() {
  const linkClass =
    "text-sm text-white/80 hover:text-white transition cursor-pointer"

  return (
    <footer className="bg-indigo-900 text-white mt-20">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* 🔹 Brand */}
        <div>
          <h2 className="text-xl font-bold mb-2">Quizzes</h2>
          <p className="text-sm text-white/80">
            Learn, practice, and track your progress with interactive quizzes.
            Built for students and developers.
          </p>
        </div>

        {/* 🔹 Quick Links (REAL) */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <NavLink to="/" className={linkClass}>
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/leaderboard" className={linkClass}>
                Leaderboard
              </NavLink>
            </li>

            <li>
              <NavLink to="/leaderboard/global" className={linkClass}>
                Global Rankings
              </NavLink>
            </li>

            <li>
              <NavLink to="/profile" className={linkClass}>
                Profile
              </NavLink>
            </li>
          </ul>
        </div>

        {/* 🔹 Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <div className="flex items-center gap-4 mt-2">
            <a
              href="mailto:dhanush8714@gmail.com"
              className="hover:text-blue-300 transition"
              title="Send Email"
            >
              <FaEnvelope size={20} />
            </a>

            <a
              href="https://github.com/dhanush8714"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-300 transition"
              title="GitHub"
            >
              <FaGithub size={20} />
            </a>

            <a
              href="https://www.linkedin.com/in/dhanush-mp"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-300 transition"
              title="LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* 🔻 Bottom bar */}
      <div className="border-t border-white/20 text-center py-4 text-sm text-white/70">
        © {new Date().getFullYear()} EduQ. All rights reserved.
      </div>
    </footer>
  )
}
