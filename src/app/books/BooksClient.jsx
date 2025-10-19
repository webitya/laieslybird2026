"use client"

import { useState, useMemo } from "react"
import { GridView, ViewList } from "@mui/icons-material"
import BookSidebar from "@/components/books/book-sidebar"
import BookSearch from "@/components/books/book-search"
import BookGrid from "@/components/books/book-grid"
import BookList from "@/components/books/book-list"
import BookPagination from "@/components/books/book-pagination"

export default function BooksClient({ books }) {
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
  }, [books])

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesCategory = !selectedCategory || book.category === selectedCategory
      const matchesSearch =
        !searchQuery ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (book.tags &&
          book.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          ))
      return matchesCategory && matchesSearch
    })
  }, [books, selectedCategory, searchQuery])

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

  return (
    <div className="grid gap-6">
      {/* Top Controls: Search + View Toggle */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <BookSearch
            books={books}
            onSearch={handleSearch}
            searchQuery={searchQuery}
            onSuggestionClick={handleSuggestionClick}
          />
        </div>

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

      {/* Main Content: Sidebar + Books */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <BookSidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        <div className="md:col-span-3">
          <p className="text-sm text-gray-600 mb-4">
            {filteredBooks.length} book{filteredBooks.length !== 1 ? "s" : ""} found
            {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
          </p>

          {viewMode === "grid" ? (
            <BookGrid books={paginatedBooks} />
          ) : (
            <BookList books={paginatedBooks} />
          )}

          {totalPages > 1 && (
            <BookPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  )
}
