import { useState } from "react";
import bannerImg from "../assets/banner.avif";
import Categories from "./Categories";
import RecentActivity from "./RecentActivity";
import { FiSearch } from "react-icons/fi";

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <div className="w-full px-4 bg-white dark:bg-gray-900">
      {/* Main container */}
      <div className="max-w-6xl mx-auto py-10">
        {/* Banner */}
        <div className="relative h-[220px] md:h-[280px] lg:h-[320px] rounded-2xl overflow-hidden shadow-lg">
          {/* Background Image */}
          <img
            src={bannerImg}
            alt="Quiz banner"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-blue-900/60" />

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="px-6 md:px-10 max-w-xl text-white">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                Test Your Knowledge with <br />
                <span className="text-blue-200">Quizzes</span>
              </h1>

              <p className="text-sm md:text-base text-gray-200 mt-3 max-w-md">
                Your perfect place to learn core programming concepts, track
                your progress, and improve every day.
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-6 flex items-center gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search categories..."
            className="w-full bg-gray-100 dark:bg-gray-800 text-sm px-4 py-2.5 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          />

          <button className="bg-gray-100 p-2.5 rounded-lg hover:bg-gray-200 transition flex items-center justify-center">
            <FiSearch className="text-gray-600 text-xl" />
          </button>
          
        </div>

        {/* Categories */}
        <Categories search={search} />

        {/* Recent Activity */}
        <RecentActivity />
      </div>
    </div>
  );
}
