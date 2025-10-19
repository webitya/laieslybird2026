"use client"

import { useState, useMemo } from "react"
import { VideoLibrary, GridView, ViewList } from "@mui/icons-material"
import Script from "next/script"
import { VIDEOS } from "@/data/videos/videos"
import VideoSidebar from "@/components/videos/video-sidebar"
import VideoGrid from "@/components/videos/video-grid"
import VideoList from "@/components/videos/video-list"
import VideoSearch from "@/components/videos/video-search"
import VideoPagination from "@/components/videos/video-pagination"

export default function Videos() {
  const [viewMode, setViewMode] = useState("grid")
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const videosPerPage = 12

  const categories = useMemo(() => {
    const categoryMap = {}
    VIDEOS.forEach((v) => {
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
  }, [])

  const filteredVideos = useMemo(() => {
    let result = VIDEOS

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
          (v.tags && v.tags.some((tag) => tag.toLowerCase().includes(q))),
      )
    }

    return result
  }, [selectedCategory, searchQuery])

  const totalPages = Math.ceil(filteredVideos.length / videosPerPage)
  const startIdx = (currentPage - 1) * videosPerPage
  const paginatedVideos = filteredVideos.slice(startIdx, startIdx + videosPerPage)

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

  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"
  const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Video Tutorials — CEO & Co‑Founder",
    url: `${base}/videos`,
    hasPart: filteredVideos.map((v) => ({
      "@type": "VideoObject",
      name: v.title,
      description: v.description,
      thumbnailUrl: [v.thumbnail],
      uploadDate: new Date().toISOString(),
      embedUrl: v.url,
      duration: v.duration,
    })),
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-purple-800 flex items-center gap-2">
          <VideoLibrary className="w-8 h-8" />
          Video Tutorials
        </h1>
        <p className="text-gray-600">
          Curated video tutorials for CEOs, Co‑Founders, and English learners to master leadership, growth, and language
          skills.
        </p>
      </div>

      {/* Search Bar */}
      <VideoSearch
        videos={VIDEOS}
        onSearch={(query) => {
          setSearchQuery(query)
          setCurrentPage(1)
        }}
        searchQuery={searchQuery}
        onSuggestionClick={handleSuggestionClick}
      />

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Sidebar */}
        <VideoSidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Right Content */}
        <div className="flex-1 min-w-0">
          {/* View Toggle */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <p className="text-sm text-gray-600 font-medium">
              {filteredVideos.length} video{filteredVideos.length !== 1 ? "s" : ""} found
              {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid" ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                title="Grid view"
              >
                <GridView className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list" ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                title="List view"
              >
                <ViewList className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Videos */}
          {paginatedVideos.length > 0 ? (
            <>
              {viewMode === "grid" ? <VideoGrid videos={paginatedVideos} /> : <VideoList videos={paginatedVideos} />}
              {totalPages > 1 && (
                <VideoPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
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

      <Script
        id="ld-videos"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
      />
    </div>
  )
}
