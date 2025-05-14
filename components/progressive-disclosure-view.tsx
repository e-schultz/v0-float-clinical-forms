"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RitualEngine } from "@/components/ritual-engine"
import { ritualData } from "@/data/ritual-data"

export function ProgressiveDisclosureView() {
  const [disclosureLevel, setDisclosureLevel] = useState(1)
  const [activeTab, setActiveTab] = useState("concepts")

  const handleIncreaseDisclosure = () => {
    if (disclosureLevel < 3) {
      setDisclosureLevel(disclosureLevel + 1)
    }
  }

  const handleDecreaseDisclosure = () => {
    if (disclosureLevel > 1) {
      setDisclosureLevel(disclosureLevel - 1)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-pink-400">Progressive Disclosure</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDecreaseDisclosure}
            disabled={disclosureLevel === 1}
            className="h-8 border-gray-700 bg-gray-900/50 text-gray-300 hover:bg-gray-800"
          >
            Less
          </Button>
          <Badge variant="outline" className="bg-pink-900/20 text-pink-300 border-pink-900/30">
            Level {disclosureLevel}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={handleIncreaseDisclosure}
            disabled={disclosureLevel === 3}
            className="h-8 border-gray-700 bg-gray-900/50 text-gray-300 hover:bg-gray-800"
          >
            More
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 bg-gray-900/50 border border-gray-800">
          <TabsTrigger value="concepts">Concepts</TabsTrigger>
          <TabsTrigger value="rituals">Ritual Engines</TabsTrigger>
        </TabsList>

        <TabsContent value="concepts" className="mt-4 space-y-4">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-gray-100">Progressive Disclosure Pattern</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300 mb-4">
                Display information based on cognitive state and readiness, revealing complexity progressively as the
                user moves through their workflow.
              </p>

              {disclosureLevel >= 2 && (
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Technical Implementation</h4>
                  <p className="text-sm text-gray-300">
                    Context-aware information revelation patterns that match user cognitive state, implemented through
                    schema-driven UI components that adapt based on user context.
                  </p>
                </div>
              )}

              {disclosureLevel >= 3 && (
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Jane App Relevance</h4>
                  <p className="text-sm text-gray-300">
                    Clinical forms should reveal complexity progressively as the practitioner moves through their
                    workflow, reducing cognitive load and focusing attention on the current moment of care.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-gray-100">Daily Logs as Navigation System</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300 mb-4">
                Daily logs serve as a critical middle layer between raw data and canonical content, providing structure
                without excessive formalization.
              </p>

              {disclosureLevel >= 2 && (
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Conceptual Framework</h4>
                  <ul className="text-sm text-gray-300 space-y-2 list-disc pl-5">
                    <li>
                      Signal-Boosting Backbone: Amplify important signals without eliminating potentially valuable noise
                    </li>
                    <li>Threshold of Canon: "Raw logs = rot, daily log = the threshold of canon"</li>
                    <li>Personal Curation Layer: Functions as navigation system through the rot field</li>
                  </ul>
                </div>
              )}

              {disclosureLevel >= 3 && (
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Implementation Features</h4>
                  <ul className="text-sm text-gray-300 space-y-2 list-disc pl-5">
                    <li>Two-Tier Retrieval System: Find relevant day first, then expand into related conversations</li>
                    <li>ctx:: Markers: Timestamp and context indicators create navigation points</li>
                    <li>Echo Patterns: Reflections on daily entries create additional processing layers</li>
                    <li>
                      Trail Map Function: "Like creating a personal trail map through a wilderness preserve rather than
                      paving it over with roads"
                    </li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rituals" className="mt-4 space-y-4">
          {ritualData.map((ritual, index) => (
            <RitualEngine key={index} {...ritual} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
