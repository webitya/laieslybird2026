"use client"

import Link from "next/link"
import { Download, OpenInNew } from "@mui/icons-material"

export default function BookGrid({ books }) {
  if (books.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
        <p className="text-lg text-gray-600">No books found</p>
        <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <div
          key={book.id}
          className="rounded-lg border border-purple-200 bg-white overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="aspect-video bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center p-4">
            <div className="text-center">
              <p className="text-xs text-purple-600 font-medium">{book.category}</p>
              <p className="text-sm font-semibold text-purple-800 mt-2 line-clamp-2">{book.title}</p>
            </div>
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-600 line-clamp-2">{book.description}</p>
            <div className="mt-3 flex gap-2">
              <a
                href={book.pdfUrl}
                download
                className="flex-1 flex items-center justify-center gap-2 rounded-md bg-purple-600 px-3 py-2 text-xs text-white hover:bg-purple-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
              <Link
                href={`/books/${book.slug}`}
                className="flex-1 flex items-center justify-center gap-2 rounded-md border border-purple-300 px-3 py-2 text-xs text-purple-700 hover:bg-purple-50 transition-colors"
              >
                <OpenInNew className="w-4 h-4" />
                Open
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
