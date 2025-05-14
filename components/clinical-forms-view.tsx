"use client"

import { useState } from "react"
import { FormTemplateGallery } from "@/components/clinical-forms/form-template-gallery"
import { FormRenderer } from "@/components/clinical-forms/form-renderer"
import { clinicalFormTemplates } from "@/data/clinical-form-templates"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ClinicalFormsView() {
  const [activeTab, setActiveTab] = useState("gallery")
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null)

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId)
    setActiveTab("preview")
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-pink-400">Clinical Forms</h2>
      <p className="text-gray-300">
        These form templates demonstrate schema-driven UI principles applied to clinical contexts, treating each form
        field as a "moment of care" in the patient journey.
      </p>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 bg-gray-900/50 border border-gray-800">
          <TabsTrigger value="gallery">Template Gallery</TabsTrigger>
          <TabsTrigger value="preview" disabled={!selectedTemplateId}>
            Form Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="gallery" className="mt-4">
          <FormTemplateGallery />
        </TabsContent>

        <TabsContent value="preview" className="mt-4">
          {selectedTemplateId && (
            <FormRenderer
              schema={clinicalFormTemplates.find((t) => t.id === selectedTemplateId)?.schema!}
              readOnly={false}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
