"use client"

import { useState, useMemo } from "react"
import { MenuBook, GridView, ViewList } from "@mui/icons-material"
import Script from "next/script"
import { books } from "@/data/books/books"
import BookSidebar from "@/components/books/book-sidebar"
import BookSearch from "@/components/books/book-search"
import BookGrid from "@/components/books/book-grid"
import BookList from "@/components/books/book-list"
import BookPagination from "@/components/books/book-pagination"

export default function Books() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const categories = useMemo(() => {
    const uniqueCategories = new Map()
    books.forEach((book) => {
      const key = `${book.course}-${book.category}`
      if (!uniqueCategories.has(key)) {
        uniqueCategories.set(key, {
          id: book.category,
          name: book.category,
          course: book.course,
        })
      }
    })
    return Array.from(uniqueCategories.values())
  }, [])

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesCategory = !selectedCategory || book.category === selectedCategory
      const matchesSearch =
        !searchQuery ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (book.tags && book.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())))
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage)
  const paginatedBooks = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage
    return filteredBooks.slice(startIdx, startIdx + itemsPerPage)
  }, [filteredBooks, currentPage])

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId)
    setCurrentPage(1)
    setSearchQuery("")
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const handleSuggestionClick = (book) => {
    setSelectedCategory(book.category)
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://laieslybird.com"
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: books.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${base}/books/${b.slug}`,
      name: b.title,
    })),
  }

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-purple-800 flex items-center gap-2 mb-2">
          <MenuBook className="w-8 h-8" />
          Books (PDF)
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Curated books for CEOs, Co-Founders, and English learners to master leadership, growth, and language skills.
        </p>
      </div>

      {/* Search Bar */}
      <BookSearch
        books={books}
        onSearch={handleSearch}
        searchQuery={searchQuery}
        onSuggestionClick={handleSuggestionClick}
      />

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <BookSidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Right Content */}
        <div className="md:col-span-3">
          {/* View Toggle and Results Count */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <p className="text-sm text-gray-600">
              {filteredBooks.length} book{filteredBooks.length !== 1 ? "s" : ""} found
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-purple-600 text-white"
                    : "border border-purple-300 text-purple-600 hover:bg-purple-50"
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
                    : "border border-purple-300 text-purple-600 hover:bg-purple-50"
                }`}
                title="List view"
              >
                <ViewList className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Books Display */}
          {viewMode === "grid" ? <BookGrid books={paginatedBooks} /> : <BookList books={paginatedBooks} />}

          {/* Pagination */}
          {totalPages > 1 && (
            <BookPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          )}
        </div>
      </div>

      <Script id="ld-books" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
    </div>
  )
}
