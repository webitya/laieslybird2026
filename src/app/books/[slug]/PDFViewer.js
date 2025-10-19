"use client"

import { useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import { Button } from "@/components/ui/button"

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

export default function PDFViewer({ pdfUrl }) {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
    setPageNumber(1)
  }

  const nextPage = () => setPageNumber((p) => Math.min(p + 1, numPages))
  const prevPage = () => setPageNumber((p) => Math.max(p - 1, 1))

  return (
    <div className="overflow-hidden rounded-lg border border-purple-200 bg-white shadow-sm p-4 flex flex-col items-center">
      <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess} loading="Loading PDF...">
        <Page pageNumber={pageNumber} width={800} renderTextLayer={false} renderAnnotationLayer={false} />
      </Document>

      <div className="flex items-center gap-4 mt-4">
        <Button variant="outline" onClick={prevPage} disabled={pageNumber <= 1}>
          Prev
        </Button>
        <span className="text-sm text-gray-700">
          Page {pageNumber} of {numPages || "?"}
        </span>
        <Button variant="outline" onClick={nextPage} disabled={pageNumber >= numPages}>
          Next
        </Button>
      </div>
    </div>
  )
}
