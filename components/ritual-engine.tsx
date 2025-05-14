"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon, CheckIcon, ChevronsUpDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface RitualEngineProps {
  title: string
  description: string
  steps: {
    name: string
    description: string
    completed?: boolean
  }[]
  currentMode?: string
  targetMode?: string
  onActivate?: () => void
}

export function RitualEngine({
  title,
  description,
  steps,
  currentMode = "standard",
  targetMode = "focused",
  onActivate,
}: RitualEngineProps) {
  const [activeStep, setActiveStep] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [isActivated, setIsActivated] = useState(false)

  const handleActivate = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1)
    } else {
      setIsActivated(true)
      if (onActivate) onActivate()
    }
  }

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base text-gray-100">{title}</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-purple-900/20 text-purple-300 border-purple-900/30">
              {currentMode}
            </Badge>
            <ArrowRightIcon className="h-3 w-3 text-gray-500" />
            <Badge variant="outline" className="bg-pink-900/20 text-pink-300 border-pink-900/30">
              {targetMode}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-300 mb-4">{description}</p>

        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-400">Transition Steps</span>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                <ChevronsUpDownIcon className="h-4 w-4" />
                <span className="sr-only">Toggle steps</span>
              </Button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent>
            <div className="space-y-2 mb-4">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-center gap-3 p-2 rounded-md",
                    index === activeStep
                      ? "bg-gray-800/50 border border-gray-700"
                      : index < activeStep
                        ? "text-gray-500"
                        : "text-gray-400",
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center justify-center h-6 w-6 rounded-full text-xs",
                      index < activeStep
                        ? "bg-green-900/20 text-green-400 border border-green-900/30"
                        : index === activeStep
                          ? "bg-pink-900/20 text-pink-300 border border-pink-900/30"
                          : "bg-gray-800 text-gray-400 border border-gray-700",
                    )}
                  >
                    {index < activeStep ? <CheckIcon className="h-3 w-3" /> : index + 1}
                  </div>
                  <span className="text-sm">{step.name}</span>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Button
          onClick={handleActivate}
          className="w-full bg-pink-900/20 text-pink-300 hover:bg-pink-900/30 border border-pink-900/30"
          disabled={isActivated}
        >
          {isActivated ? "Transition Complete" : `Activate Step: ${steps[activeStep]?.name || "Complete"}`}
        </Button>
      </CardContent>
    </Card>
  )
}
