"use client"

import Link from "next/link"
import { Download, OpenInNew, Description } from "@mui/icons-material"

export default function BookList({ books }) {
  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-lg text-gray-600">No books found</p>
        <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {books.map((book) => (
        <div
          key={book.id}
          className="rounded-lg border border-purple-200 bg-white p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start gap-4">
            <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 flex-shrink-0">
              <Description className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-purple-800 text-sm sm:text-base">{book.title}</h3>
                  <p className="text-xs text-purple-600 mt-1">{book.course}</p>
                </div>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded whitespace-nowrap flex-shrink-0">
                  {book.category}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">{book.description}</p>
              <div className="mt-3 flex gap-2 flex-wrap">
                <a
                  href={book.pdfUrl}
                  download
                  className="flex items-center justify-center gap-1 rounded-md bg-purple-600 px-3 py-2 text-xs text-white hover:bg-purple-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
                <Link
                  href={`/books/${book.slug}`}
                  className="flex items-center justify-center gap-1 rounded-md border border-purple-300 px-3 py-2 text-xs text-purple-700 hover:bg-purple-50 transition-colors"
                >
                  <OpenInNew className="w-4 h-4" />
                  Open
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
