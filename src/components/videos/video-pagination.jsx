"use client"

import { ChevronLeft, ChevronRight } from "@mui/icons-material"

export default function VideoPagination({ currentPage, totalPages, onPageChange }) {
  const pages = []
  const maxVisible = 5

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    if (currentPage <= 3) {
      for (let i = 1; i <= maxVisible; i++) {
        pages.push(i)
      }
      pages.push("...")
      pages.push(totalPages)
    } else if (currentPage >= totalPages - 2) {
      pages.push(1)
      pages.push("...")
      for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push("...")
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i)
      }
      pages.push("...")
      pages.push(totalPages)
    }
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-purple-300 text-purple-600 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="Previous page"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {pages.map((page, idx) => (
        <button
          key={idx}
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={page === "..." || page === currentPage}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            page === currentPage
              ? "bg-purple-600 text-white"
              : page === "..."
                ? "cursor-default text-gray-400"
                : "border border-purple-300 text-purple-600 hover:bg-purple-50"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-purple-300 text-purple-600 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="Next page"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  )
}
