"use client"

import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProgressIndicatorProps {
  steps: string[]
  currentStep: number
  onStepClick?: (step: number) => void
}

export function ProgressIndicator({ steps, currentStep, onStepClick }: ProgressIndicatorProps) {
  return (
    <div className="w-full">
      <ol className="flex items-center w-full">
        {steps.map((step, index) => (
          <li
            key={index}
            className={cn(
              "flex items-center",
              index < steps.length - 1 ? "w-full" : "",
              index < currentStep ? "text-pink-500" : "text-gray-500",
            )}
          >
            <button
              type="button"
              onClick={() => onStepClick && index <= currentStep && onStepClick(index)}
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full shrink-0",
                index === currentStep
                  ? "bg-pink-900/20 text-pink-300 border border-pink-900/30"
                  : index < currentStep
                    ? "bg-pink-900/10 text-pink-300"
                    : "bg-gray-800 text-gray-400",
                onStepClick && index <= currentStep ? "cursor-pointer" : "cursor-default",
              )}
              disabled={!onStepClick || index > currentStep}
              aria-current={index === currentStep ? "step" : undefined}
            >
              {index < currentStep ? <CheckIcon className="w-4 h-4" /> : index + 1}
            </button>

            <div
              className={cn(
                "w-full h-0.5 mx-2",
                index < currentStep ? "bg-pink-900/30" : "bg-gray-800",
                index === steps.length - 1 ? "hidden" : "",
              )}
            ></div>

            <span
              className="hidden sm:block absolute mt-10 text-xs font-medium text-center w-max -translate-x-1/2"
              style={{ left: `calc(${(index * 100) / (steps.length - 1)}%)` }}
            >
              {step}
            </span>
          </li>
        ))}
      </ol>
      <div className="h-10 sm:hidden"></div>
    </div>
  )
}
