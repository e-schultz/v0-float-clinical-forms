"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SchemaField {
  name: string
  type: string
  description: string
  required?: boolean
  conditional?: {
    field: string
    value: string | number | boolean
  }
}

interface Schema {
  name: string
  description: string
  fields: SchemaField[]
  renderedExample?: string
}

interface SchemaVisualizerProps {
  schemas: Schema[]
}

export function SchemaVisualizer({ schemas }: SchemaVisualizerProps) {
  const [activeSchema, setActiveSchema] = useState(schemas[0]?.name || "")

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardContent className="p-4">
        <Tabs value={activeSchema} onValueChange={setActiveSchema} className="w-full">
          <TabsList className="grid grid-cols-2 bg-gray-900/50 border border-gray-800">
            {schemas.map((schema) => (
              <TabsTrigger key={schema.name} value={schema.name}>
                {schema.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {schemas.map((schema) => (
            <TabsContent key={schema.name} value={schema.name} className="mt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Description</h3>
                  <p className="text-sm text-gray-300">{schema.description}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Schema Definition</h3>
                  <div className="bg-gray-950 rounded-md p-3 font-mono text-xs text-gray-300 overflow-x-auto">
                    <pre>{`{
  "name": "${schema.name}",
  "fields": [
${schema.fields
  .map(
    (field) => `    {
      "name": "${field.name}",
      "type": "${field.type}",
      "description": "${field.description}",
      "required": ${field.required ? "true" : "false"}${
        field.conditional
          ? `,
      "conditional": {
        "field": "${field.conditional.field}",
        "value": ${typeof field.conditional.value === "string" ? `"${field.conditional.value}"` : field.conditional.value}
      }`
          : ""
      }
    }`,
  )
  .join(",\n")}
  ]
}`}</pre>
                  </div>
                </div>

                {schema.renderedExample && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Rendered Example</h3>
                    <ScrollArea className="h-[300px] rounded-md border border-gray-800">
                      <div className="p-4 bg-white text-black">
                        <div dangerouslySetInnerHTML={{ __html: schema.renderedExample }} />
                      </div>
                    </ScrollArea>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
