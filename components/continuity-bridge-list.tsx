"use client"

import { useState } from "react"
import { ContinuityBridge } from "@/components/continuity-bridge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search } from "lucide-react"
import { bridgeData } from "@/data/bridge-data"

export function ContinuityBridgeList() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredBridges = bridgeData.filter(
    (bridge) =>
      bridge.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bridge.phase.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bridge.ctxMarkers.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (bridge.activeThreads &&
        bridge.activeThreads.some((thread) => thread.toLowerCase().includes(searchQuery.toLowerCase()))),
  )

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <Label htmlFor="search-bridges" className="sr-only">
          Search bridges
        </Label>
        <Input
          id="search-bridges"
          type="search"
          placeholder="Search bridges by ID, phase, or context..."
          className="pl-10 bg-gray-900 border-gray-800 text-gray-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filteredBridges.length > 0 ? (
          filteredBridges.map((bridge) => <ContinuityBridge key={bridge.id} {...bridge} />)
        ) : (
          <div className="text-center py-8 text-gray-400">No bridges found matching your search.</div>
        )}
      </div>
    </div>
  )
}
