"use client"
import { Card } from "@/components/ui/card"

interface BodyMapSelectorProps {
  value: string[]
  onChange: (value: string[]) => void
  disabled?: boolean
}

export function BodyMapSelector({ value = [], onChange, disabled = false }: BodyMapSelectorProps) {
  const bodyParts = [
    { id: "head", label: "Head", x: 50, y: 15, radius: 15 },
    { id: "neck", label: "Neck", x: 50, y: 30, radius: 8 },
    { id: "leftShoulder", label: "Left Shoulder", x: 35, y: 35, radius: 10 },
    { id: "rightShoulder", label: "Right Shoulder", x: 65, y: 35, radius: 10 },
    { id: "chest", label: "Chest", x: 50, y: 45, radius: 15 },
    { id: "leftArm", label: "Left Arm", x: 25, y: 50, radius: 10 },
    { id: "rightArm", label: "Right Arm", x: 75, y: 50, radius: 10 },
    { id: "abdomen", label: "Abdomen", x: 50, y: 60, radius: 15 },
    { id: "leftHand", label: "Left Hand", x: 15, y: 65, radius: 8 },
    { id: "rightHand", label: "Right Hand", x: 85, y: 65, radius: 8 },
    { id: "pelvis", label: "Pelvis", x: 50, y: 75, radius: 15 },
    { id: "leftLeg", label: "Left Leg", x: 40, y: 85, radius: 10 },
    { id: "rightLeg", label: "Right Leg", x: 60, y: 85, radius: 10 },
    { id: "leftFoot", label: "Left Foot", x: 35, y: 95, radius: 8 },
    { id: "rightFoot", label: "Right Foot", x: 65, y: 95, radius: 8 },
  ]

  const toggleBodyPart = (id: string) => {
    if (disabled) return

    if (value.includes(id)) {
      onChange(value.filter((part) => part !== id))
    } else {
      onChange([...value, id])
    }
  }

  return (
    <Card className="p-4 bg-gray-900 border-gray-700 relative h-[400px]">
      <div className="absolute top-2 left-2 text-xs text-gray-400">
        Click on body parts to indicate areas of concern
      </div>
      <div className="w-full h-full flex items-center justify-center">
        <svg width="100%" height="100%" viewBox="0 0 100 100" className="max-h-full">
          <rect width="100%" height="100%" fill="transparent" />
          {/* Simple body outline */}
          <ellipse cx="50" cy="15" rx="10" ry="10" stroke="#666" strokeWidth="1" fill="transparent" />
          <line x1="50" y1="25" x2="50" y2="75" stroke="#666" strokeWidth="1" />
          <line x1="30" y1="35" x2="70" y2="35" stroke="#666" strokeWidth="1" />
          <line x1="30" y1="35" x2="15" y2="65" stroke="#666" strokeWidth="1" />
          <line x1="70" y1="35" x2="85" y2="65" stroke="#666" strokeWidth="1" />
          <line x1="50" y1="75" x2="35" y2="95" stroke="#666" strokeWidth="1" />
          <line x1="50" y1="75" x2="65" y2="95" stroke="#666" strokeWidth="1" />

          {/* Clickable body parts */}
          {bodyParts.map((part) => (
            <circle
              key={part.id}
              cx={part.x}
              cy={part.y}
              r={part.radius}
              fill={value.includes(part.id) ? "rgba(236, 72, 153, 0.5)" : "transparent"}
              stroke={value.includes(part.id) ? "#ec4899" : "#666"}
              strokeWidth="1"
              onClick={() => toggleBodyPart(part.id)}
              className={disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:stroke-pink-400"}
            />
          ))}
        </svg>
      </div>
      <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1">
        {value.map((part) => (
          <span
            key={part}
            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-pink-900/20 text-pink-300"
          >
            {bodyParts.find((p) => p.id === part)?.label}
          </span>
        ))}
      </div>
    </Card>
  )
}
