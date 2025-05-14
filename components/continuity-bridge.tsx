"use client"

import { useState } from "react"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { ContextMarkers } from "@/components/context-markers"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface ContinuityBridgeProps {
  id: string
  phase: string
  timestamp: string
  ctxMarkers: string
  mode: string
  activeThreads?: string[]
  document?: string
}

export function ContinuityBridge({
  id,
  phase,
  timestamp,
  activeThreads = [],
  ctxMarkers,
  mode,
  document,
}: ContinuityBridgeProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="font-mono text-sm text-pink-400">{id}</div>
            <div className="text-gray-300 text-sm">{phase}</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs text-gray-500 font-mono">{formatTimestamp(timestamp)}</div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-label={isExpanded ? "Collapse details" : "Expand details"}
              aria-expanded={isExpanded}
            >
              {isExpanded ? (
                <ChevronUpIcon className="h-4 w-4 text-gray-400" />
              ) : (
                <ChevronDownIcon className="h-4 w-4 text-gray-400" />
              )}
            </Button>
          </div>
        </div>

        <div className="mt-3">
          <div className="text-xs text-pink-400 mb-1">Care Context Markers:</div>
          <ContextMarkers markers={ctxMarkers} mode={mode} />
        </div>

        {activeThreads.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-800">
            <div className="text-xs text-gray-400 mb-2">Active Threads:</div>
            <div className="flex flex-wrap gap-2">
              {activeThreads.map((thread) => (
                <Badge
                  key={thread}
                  variant="outline"
                  className="bg-blue-900/20 text-blue-300 border-blue-900/30 hover:bg-blue-900/30"
                >
                  {thread}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      {isExpanded && document && (
        <CardFooter className="px-4 pb-4 pt-0 block">
          <div className="mt-3 pt-3 border-t border-gray-800">
            <div className="text-xs text-gray-400 mb-2">Session Details:</div>
            <div className="bg-gray-950/50 p-3 rounded text-sm text-gray-300 whitespace-pre-wrap font-mono overflow-x-auto">
              {document}
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
