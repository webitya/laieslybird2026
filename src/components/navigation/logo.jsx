"use client"

export default function Logo() {
  return (
    <div className="flex items-center gap-3 group cursor-pointer select-none">
      {/* Abstract bird mark */}
      <div className="relative flex items-center justify-center">
        <svg
          width="48"
          height="48"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            {/* Premium purple gradient */}
            <linearGradient id="gradPurple" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8B5CF6" />
              <stop offset="1" stopColor="#6366F1" />
            </linearGradient>
          </defs>

          {/* Background circle */}
          <circle cx="32" cy="32" r="30" fill="url(#gradPurple)" opacity="0.08" />

          {/* Abstract “flight” shape (bird in ascent) */}
          <path
            d="M14 36 C22 28, 34 22, 48 25 
               C54 27, 54 33, 48 36 
               C42 39, 32 43, 24 44 
               C18 44, 12 40, 14 36Z"
            fill="url(#gradPurple)"
            className="drop-shadow-sm"
          />

          {/* Wing sweep (leadership arc) */}
          <path
            d="M20 34 C28 28, 38 27, 46 30 
               C40 33, 32 38, 22 40Z"
            fill="white"
            opacity="0.18"
          />

          {/* Bird head */}
          <circle cx="47" cy="28" r="2.8" fill="url(#gradPurple)" />
          {/* Eye */}
          <circle cx="48" cy="27.5" r="0.8" fill="white" />
          {/* Beak */}
          <path d="M49.5 28 L51 27.5 L49.5 29" fill="#7C3AED" />

          {/* Soft highlight curve */}
          <path
            d="M15 34 C28 26, 40 25, 52 28"
            stroke="white"
            strokeWidth="1.2"
            opacity="0.2"
            fill="none"
          />
        </svg>

        {/* Hover glow */}
        <div className="absolute inset-0 rounded-full bg-purple-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Brand name & tagline */}
      <div className="flex flex-col leading-tight">
        <span className="text-[1.45rem] font-bold tracking-tight text-gray-900">
          Laiesly
          <span className="bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent font-extrabold">
            Bird
          </span>
        </span>
        <span className="text-[0.75rem] text-gray-500 font-medium tracking-wide">
          Roadmaps • CEOs & Co-Founders
        </span>
      </div>
    </div>
  )
}
