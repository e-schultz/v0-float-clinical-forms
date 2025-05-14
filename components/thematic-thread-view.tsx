import { ThematicThread } from "@/components/thematic-thread"
import { threadData } from "@/data/thread-data"

export function ThematicThreadView() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-pink-400">Thematic Threads</h2>
      <div className="space-y-4">
        {threadData.map((thread, index) => (
          <ThematicThread key={index} {...thread} />
        ))}
      </div>
    </div>
  )
}
