"use client"

import { Users, MessageSquare, Eye, AlertCircle } from "lucide-react"
import StatsCard from "./stats-card"

export default function DashboardHeader({ stats, dbHealthy }) {
  if (!dbHealthy) {
    return (
      <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-yellow-900">Database Not Configured</h3>
            <p className="mt-1 text-sm text-yellow-800">
              Set MONGODB_URI in your environment to enable analytics, CSV export, and contact management.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const totalSubscribers = stats?.totalSubscribers ?? 0
  const subscribersThisMonth = stats?.subscribersThisMonth ?? 0
  const pendingContacts = stats?.pendingContacts ?? 0
  const totalContacts = stats?.totalContacts ?? 0
  const resolvedContacts = stats?.resolvedContacts ?? 0
  const repliedContacts = stats?.repliedContacts ?? 0
  const totalVisitors = stats?.totalVisitors ?? 0
  const visitorsToday = stats?.visitorsToday ?? 0

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        icon={Users}
        label="Total Subscribers"
        value={totalSubscribers}
        trend={`${subscribersThisMonth} this month`}
        color="purple"
      />
      <StatsCard
        icon={MessageSquare}
        label="Pending Contacts"
        value={pendingContacts}
        trend={`${totalContacts} total`}
        color="pink"
      />
      <StatsCard
        icon={MessageSquare}
        label="Resolved Contacts"
        value={resolvedContacts}
        trend={`${repliedContacts} replied`}
        color="green"
      />
      <StatsCard
        icon={Eye}
        label="Total Visitors"
        value={totalVisitors}
        trend={`${visitorsToday} today`}
        color="blue"
      />
    </div>
  )
}
