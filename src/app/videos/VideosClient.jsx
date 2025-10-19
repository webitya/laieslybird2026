"use client"

import { useState, useMemo } from "react"
import { GridView, ViewList } from "@mui/icons-material"
import VideoSidebar from "@/components/videos/video-sidebar"
import VideoGrid from "@/components/videos/video-grid"
import VideoList from "@/components/videos/video-list"
import VideoSearch from "@/components/videos/video-search"
import VideoPagination from "@/components/videos/video-pagination"

export default function VideosClient({ videos }) {
  const [viewMode, setViewMode] = useState("grid")
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const videosPerPage = 12

  // Extract unique categories
  const categories = useMemo(() => {
    const categoryMap = {}
    videos.forEach((v) => {
      const key = `${v.course}-${v.category}`
      if (!categoryMap[key]) {
        categoryMap[key] = {
          id: key,
          name: v.category,
          course: v.course,
        }
      }
    })
    return Object.values(categoryMap)
  }, [videos])

  // Filter videos by category and search query
  const filteredVideos = useMemo(() => {
    let result = videos
    if (selectedCategory) {
      result = result.filter((v) => v.category === selectedCategory)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q) ||
          v.category.toLowerCase().includes(q) ||
          v.course.toLowerCase().includes(q) ||
          (v.tags && v.tags.some((tag) => tag.toLowerCase().includes(q)))
      )
    }
    return result
  }, [videos, selectedCategory, searchQuery])

  const totalPages = Math.ceil(filteredVideos.length / videosPerPage)
  const startIdx = (currentPage - 1) * videosPerPage
  const paginatedVideos = filteredVideos.slice(startIdx, startIdx + videosPerPage)

  // Handlers
  const handleCategoryChange = (category) => {
    const categoryName = category ? category.split("-").slice(1).join("-") : null
    setSelectedCategory(categoryName)
    setSearchQuery("")
    setCurrentPage(1)
  }

  const handleSuggestionClick = (video) => {
    setSelectedCategory(video.category)
    setSearchQuery(video.title)
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-[250px_1fr] gap-6">
      {/* Sidebar */}
      <VideoSidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Main content */}
      <div className="flex flex-col gap-6">
        {/* Top row: Search + View toggle */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <VideoSearch
              videos={videos}
              searchQuery={searchQuery}
              onSearch={(query) => {
                setSearchQuery(query)
                setCurrentPage(1)
              }}
              onSuggestionClick={handleSuggestionClick}
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              title="Grid view"
            >
              <GridView className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              title="List view"
            >
              <ViewList className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-600 font-medium">
          {filteredVideos.length} video{filteredVideos.length !== 1 ? "s" : ""} found
          {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
        </p>

        {/* Videos display */}
        {paginatedVideos.length > 0 ? (
          <>
            <div className="grid gap-6">
              {viewMode === "grid" ? (
                <VideoGrid videos={paginatedVideos} />
              ) : (
                <VideoList videos={paginatedVideos} />
              )}
            </div>
            {totalPages > 1 && (
              <VideoPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-2">No videos found</p>
            <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
