"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SchemaVisualizer } from "@/components/schema-visualizer"
import { schemaData } from "@/data/schema-data"

export function SchemaDrivenView() {
  const [activeTab, setActiveTab] = useState("experience")

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-pink-400">Schema-Driven UI</h2>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 bg-gray-900/50 border border-gray-800">
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
        </TabsList>

        <TabsContent value="experience" className="mt-4 space-y-4">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base text-gray-100">JSCamp Barcelona Talk</CardTitle>
                <Badge variant="outline" className="bg-blue-900/20 text-blue-300 border-blue-900/30">
                  2018
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300 mb-4">
                In 2018, I presented 'How to Create Vuetiful Data-Driven User Interfaces' at JSCamp Barcelona. The talk
                focused on building dynamic components when we don't know what they are until runtime.
              </p>

              <div className="mt-4 pt-4 border-t border-gray-800">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Key Concepts</h4>
                <ul className="text-sm text-gray-300 space-y-2 list-disc pl-5">
                  <li>Building screens based on application state, user preferences, or API responses</li>
                  <li>Dynamic forms where questions and components are configured by JSON objects</li>
                  <li>Components that change based on user answers</li>
                  <li>Deep understanding of component architecture and dynamic form generation</li>
                </ul>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-800">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Jane App Relevance</h4>
                <p className="text-sm text-gray-300">
                  This experience directly applies to creating dynamic clinical forms that adapt to practitioner type,
                  specialty, and patient context.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base text-gray-100">PartnerStack Experience</CardTitle>
                <Badge variant="outline" className="bg-blue-900/20 text-blue-300 border-blue-900/30">
                  2020-2021
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300 mb-4">
                As Software Engineering Manager at PartnerStack, I implemented schema-based approaches to dynamic form
                generation, achieving 23% increase in form completion rates.
              </p>

              <div className="mt-4 pt-4 border-t border-gray-800">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Jane App Relevance</h4>
                <p className="text-sm text-gray-300">
                  Experience with complex form systems for partner onboarding translates directly to clinical forms,
                  where completion rates and data quality are critical metrics.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="implementation" className="mt-4">
          <SchemaVisualizer schemas={schemaData} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
