import RocketLaunchIcon from "@mui/icons-material/RocketLaunch"
import AutoGraphIcon from "@mui/icons-material/AutoGraph"
import GroupsIcon from "@mui/icons-material/Groups"

export default function HomeRoadmaps() {
  return (
    <section className="w-full bg-purple-50 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <header className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-800">CEO & Co‑Founder Roadmaps</h2>
          <p className="mt-2 text-purple-700/80">
            Step-by-step playbooks to scale, hire, and ship faster with confidence.
          </p>
        </header>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-purple-200 bg-white p-6 shadow-sm">
            <RocketLaunchIcon className="text-purple-600" />
            <h3 className="mt-3 text-lg font-semibold text-purple-900">0 → 1 Foundation</h3>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-purple-800/90">
              <li>Validate problem & ICP</li>
              <li>Define unique wedge & narrative</li>
              <li>Ship MVP with ruthless focus</li>
            </ul>
          </div>
          <div className="rounded-xl border border-purple-200 bg-white p-6 shadow-sm">
            <AutoGraphIcon className="text-purple-600" />
            <h3 className="mt-3 text-lg font-semibold text-purple-900">1 → 10 Growth</h3>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-purple-800/90">
              <li>Pricing & packaging</li>
              <li>Growth loops & distribution</li>
              <li>Leading metrics that matter</li>
            </ul>
          </div>
          <div className="rounded-xl border border-purple-200 bg-white p-6 shadow-sm">
            <GroupsIcon className="text-purple-600" />
            <h3 className="mt-3 text-lg font-semibold text-purple-900">Team & Culture</h3>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-purple-800/90">
              <li>First 10 hires playbook</li>
              <li>Operator mindset for founders</li>
              <li>Async rituals & execution</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
