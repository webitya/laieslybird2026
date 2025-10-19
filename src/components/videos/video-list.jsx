"use client"

import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"


export default function VideoList({ videos }) {
  return (
    <div className="space-y-2">
      {videos.map((video) => (
        <article
          key={video.id}
          className="flex gap-3 p-3 rounded-lg border border-purple-200 bg-white hover:bg-purple-50 transition-colors group cursor-pointer"
        >
          <div className="relative w-24 h-16 bg-gray-900 rounded flex-shrink-0 overflow-hidden">
            <iframe
              className="h-full w-full"
              src={video.url}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <PlayArrowIcon className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-purple-800 text-sm line-clamp-1 mb-1">{video.title}</h3>
            <p className="text-xs text-gray-600 line-clamp-1 mb-2">{video.description}</p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded">{video.category}</span>
              <span className="flex items-center gap-0.5">
                <AccessTimeIcon className="w-3 h-3" />
                {video.duration}
              </span>
            </div>
          </div>

          <div className="flex items-center text-purple-600 group-hover:translate-x-1 transition-transform">
            <ChevronRightIcon className="w-5 h-5" />
          </div>
        </article>
      ))}
    </div>
  )
}
