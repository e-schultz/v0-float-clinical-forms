import { Badge } from "@/components/ui/badge"

interface ContextMarkersProps {
  markers: string
  mode?: string
}

export function ContextMarkers({ markers, mode }: ContextMarkersProps) {
  const markerArray = markers?.split(",") || []

  return (
    <div
      className="flex flex-wrap gap-2 items-center"
      role="group"
      aria-label="Context markers representing moments of care"
    >
      {mode && (
        <Badge variant="outline" className="bg-purple-900/30 text-purple-300 border-purple-900/30">
          mode: {mode}
        </Badge>
      )}

      {markerArray.map((marker, i) => (
        <Badge key={i} variant="outline" className="bg-gray-800 text-gray-300 border-gray-700">
          ctx::{marker.trim()}
        </Badge>
      ))}
    </div>
  )
}
