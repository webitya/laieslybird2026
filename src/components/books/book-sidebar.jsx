"use client"

import { useState } from "react"
import FolderOpenIcon from "@mui/icons-material/FolderOpen"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"


export default function BookSidebar({ categories, selectedCategory, onCategoryChange }) {
  const [expandedCourse, setExpandedCourse] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const courses = [...new Set(categories.map((cat) => cat.course))]

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden mb-4 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium flex items-center gap-2"
      >
        <FolderOpenIcon className="w-5 h-5" />
        {sidebarOpen ? "Hide Courses" : "Show Courses"}
      </button>

      {/* Sidebar */}
      <aside
        className={`w-full md:w-64 bg-white border-r border-purple-200 rounded-lg p-4 h-fit sticky top-20 transition-all ${
          sidebarOpen ? "block" : "hidden md:block"
        }`}
      >
        <h3 className="text-lg font-bold text-purple-800 mb-4 flex items-center gap-2">
          <FolderOpenIcon className="w-5 h-5" />
          Courses
        </h3>

        <div className="space-y-2">
          <button
            onClick={() => {
              onCategoryChange(null)
              setSidebarOpen(false)
            }}
            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedCategory === null ? "bg-purple-100 text-purple-800" : "text-gray-700 hover:bg-purple-50"
            }`}
          >
            All Books
          </button>

          {courses.map((course) => (
            <div key={course}>
              <button
                onClick={() => setExpandedCourse(expandedCourse === course ? null : course)}
                className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-purple-50 flex items-center justify-between transition-colors"
              >
                <span>{course}</span>
                {expandedCourse === course ? <ExpandMoreIcon className="w-4 h-4" /> : <ExpandLessIcon className="w-4 h-4" />}
              </button>

              {expandedCourse === course && (
                <div className="ml-2 space-y-1 mt-1">
                  {categories
                    .filter((cat) => cat.course === course)
                    .map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          onCategoryChange(cat.id)
                          setSidebarOpen(false)
                        }}
                        className={`w-full text-left px-3 py-2 rounded-md text-xs transition-colors ${
                          selectedCategory === cat.name
                            ? "bg-purple-200 text-purple-900"
                            : "text-gray-600 hover:bg-purple-100"
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>
    </>
  )
}
