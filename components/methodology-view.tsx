import { ConceptCard } from "@/components/concept-card"
import { methodologyData } from "@/data/methodology-data"

export function MethodologyView() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-pink-400">Methodology Concepts</h2>
      <div className="space-y-4">
        {methodologyData.map((concept, index) => (
          <ConceptCard key={index} {...concept} />
        ))}
      </div>
    </div>
  )
}
