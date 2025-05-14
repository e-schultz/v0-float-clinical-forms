"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormRenderer } from "./form-renderer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { clinicalFormTemplates } from "@/data/clinical-form-templates"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SchemaPreviewView() {
  const [selectedTemplateId, setSelectedTemplateId] = useState(clinicalFormTemplates[0].id)

  const selectedTemplate = clinicalFormTemplates.find((t) => t.id === selectedTemplateId)
  const schema = selectedTemplate?.schema

  // Format the schema as pretty JSON
  const formattedSchema = JSON.stringify(schema, null, 2)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-pink-400">Schema & Preview</h2>
        <Select value={selectedTemplateId} onValueChange={setSelectedTemplateId}>
          <SelectTrigger className="w-[250px] bg-gray-900 border-gray-700 text-gray-200">
            <SelectValue placeholder="Select a template" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-gray-700">
            {clinicalFormTemplates.map((template) => (
              <SelectItem key={template.id} value={template.id} className="text-gray-200">
                {template.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Schema JSON */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-base text-gray-100">Schema Definition</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] rounded-md border border-gray-800">
              <pre className="p-4 text-xs text-pink-300 font-mono">{formattedSchema}</pre>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Rendered Preview */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-base text-gray-100">Rendered Example</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              <div className="p-4">{schema && <FormRenderer schema={schema} readOnly={false} />}</div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
