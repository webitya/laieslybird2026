"use client"

import { TrendingUp } from "lucide-react"

export default function StatsCard({ icon: Icon, label, value, trend, color = "purple" }) {
  const colorClasses = {
    purple: "bg-purple-50 border-purple-200 text-purple-700",
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    green: "bg-green-50 border-green-200 text-green-700",
    pink: "bg-pink-50 border-pink-200 text-pink-700",
  }

  return (
    <div className={`rounded-lg border ${colorClasses[color]} p-6`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium opacity-75">{label}</p>
          <p className="mt-2 text-3xl font-bold">{value ?? 0}</p>
          {trend && (
            <p className="mt-2 flex items-center gap-1 text-xs font-medium">
              <TrendingUp className="h-3 w-3" />
              {trend}
            </p>
          )}
        </div>
        <div className="rounded-lg bg-white p-3 opacity-75">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  )
}
