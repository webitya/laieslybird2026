"use client"

import { useState, useEffect } from "react"
import { Search, Close } from "@mui/icons-material"

export default function VideoSearch({ videos, onSearch, searchQuery, onSuggestionClick }) {
  const [query, setQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    if (searchQuery === "") {
      setQuery("")
      setShowSuggestions(false)
    }
  }, [searchQuery])

  const suggestions = query.trim()
    ? videos
        .filter(
          (v) =>
            v.title.toLowerCase().includes(query.toLowerCase()) ||
            v.description.toLowerCase().includes(query.toLowerCase()) ||
            v.category.toLowerCase().includes(query.toLowerCase()) ||
            v.course.toLowerCase().includes(query.toLowerCase()) ||
            (v.tags && v.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))),
        )
        .slice(0, 8)
    : []

  const handleInputChange = (e) => {
    const value = e.target.value
    setQuery(value)
    onSearch(value)
    setShowSuggestions(true)
  }

  const handleSuggestionClick = (video) => {
    setQuery(video.title)
    onSearch(video.title)
    setShowSuggestions(false)
    if (onSuggestionClick) {
      onSuggestionClick(video)
    }
  }

  const handleClear = () => {
    setQuery("")
    onSearch("")
    setShowSuggestions(false)
  }

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
        <input
          type="text"
          placeholder="Search videos by title, topic, course..."
          value={query}
          onChange={handleInputChange}
          onFocus={() => query && setShowSuggestions(true)}
          className="w-full pl-10 pr-10 py-3 rounded-lg border-2 border-purple-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Close className="w-5 h-5" />
          </button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-purple-200 rounded-lg shadow-xl z-20 max-h-96 overflow-y-auto">
          {suggestions.map((video) => (
            <button
              key={video.id}
              onClick={() => handleSuggestionClick(video)}
              className="w-full text-left px-4 py-3 hover:bg-purple-50 text-sm border-b border-purple-100 last:border-b-0 transition-colors"
            >
              <div className="font-medium text-purple-800">{video.title}</div>
              <div className="text-xs text-gray-500 mt-1">
                {video.course} • {video.category}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
