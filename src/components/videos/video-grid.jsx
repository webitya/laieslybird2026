"use client"

import AccessTimeIcon from "@mui/icons-material/AccessTime"


export default function VideoGrid({ videos }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {videos.map((video) => (
        <article
          key={video.id}
          className="group overflow-hidden rounded-lg border border-purple-200 bg-white hover:shadow-lg transition-shadow cursor-pointer"
        >
          <div className="relative aspect-video bg-gray-900 overflow-hidden">
            <iframe
              className="h-full w-full"
              src={video.url}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className="p-3">
            <h3 className="font-semibold text-purple-800 text-sm line-clamp-2 mb-1">{video.title}</h3>
            <p className="text-xs text-gray-600 line-clamp-2 mb-2">{video.description}</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">{video.category}</span>
              <span className="flex items-center gap-1">
                <AccessTimeIcon className="w-3 h-3" />
                {video.duration}
              </span>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
