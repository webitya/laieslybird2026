"use client"

import { useState, useRef, useEffect } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Download } from "lucide-react"

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

export default function PDFViewer({ pdfUrl }) {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [width, setWidth] = useState(900)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const newWidth = Math.min(containerRef.current.offsetWidth - 40, 1000)
        setWidth(newWidth)
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
    setPageNumber(1)
  }

  const nextPage = () => setPageNumber((p) => Math.min(p + 1, numPages))
  const prevPage = () => setPageNumber((p) => Math.max(p - 1, 1))

  return (
    <section className="flex flex-col items-center w-full min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 py-16 px-4">
      <h2 className="text-4xl font-extrabold text-center text-purple-700 mb-10 tracking-tight">
        CEO Operating System
      </h2>

      <div
        ref={containerRef}
        className="relative w-full max-w-[1100px] bg-white/90 backdrop-blur-md border border-purple-200/40 rounded-3xl shadow-xl p-8 flex flex-col items-center transition-all duration-300"
      >
        <div className="w-full flex justify-center overflow-hidden">
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<p className="text-gray-500 text-center py-10">Loading PDF...</p>}
            error={<p className="text-red-500 text-center py-10">Failed to load PDF</p>}
          >
            <Page
              pageNumber={pageNumber}
              width={width}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="transition-transform duration-300 hover:scale-[1.01]"
            />
          </Document>
        </div>

        {numPages > 0 && (
          <div className="flex items-center justify-center gap-5 mt-8 flex-wrap">
            <Button
              onClick={prevPage}
              disabled={pageNumber <= 1}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 shadow-lg"
            >
              <ChevronLeft size={18} />
              Prev
            </Button>

            <span className="text-sm text-gray-700 font-medium tracking-wide">
              Page {pageNumber} of {numPages}
            </span>

            <Button
              onClick={nextPage}
              disabled={pageNumber >= numPages}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 shadow-lg"
            >
              Next
              <ChevronRight size={18} />
            </Button>
          </div>
        )}
      </div>

      <a
        href={pdfUrl}
        download
        className="mt-10 flex items-center gap-2 text-purple-700 font-semibold hover:text-purple-900 transition-colors duration-200"
      >
        <Download size={18} />
        Download CEO Operating System
      </a>
    </section>
  )
}
