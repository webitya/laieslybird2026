"use client"

export default function Logo() {
  return (
    <div className="flex items-start  group cursor-pointer select-none">
   

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
