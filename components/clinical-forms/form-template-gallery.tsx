"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FormRenderer } from "./form-renderer"
import { clinicalFormTemplates } from "@/data/clinical-form-templates"

export function FormTemplateGallery() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const categories = [
    { id: "all", label: "All Templates" },
    { id: "intake", label: "Intake Forms" },
    { id: "assessment", label: "Assessments" },
    { id: "progress", label: "Progress Notes" },
    { id: "treatment", label: "Treatment Plans" },
  ]

  const filteredTemplates =
    activeCategory === "all"
      ? clinicalFormTemplates
      : clinicalFormTemplates.filter((template) => template.category === activeCategory)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-pink-400">Clinical Form Templates</h2>
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <TabsList className="bg-gray-900/50 border border-gray-800 mb-6 overflow-x-auto flex w-full">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex-shrink-0">
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeCategory} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTemplates.map((template) => (
              <Card
                key={template.id}
                className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base text-gray-100">{template.title}</CardTitle>
                    <Badge variant="outline" className="bg-gray-800 text-gray-300 border-gray-700">
                      {template.category}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-400">{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="text-xs text-gray-500">
                    <span className="font-medium text-gray-400">Form Structure:</span> {template.sections.length}{" "}
                    sections, {template.fields} fields
                  </div>
                  {template.careContext && (
                    <div className="mt-2">
                      <Badge variant="outline" className="bg-pink-900/20 text-pink-300 border-pink-900/30">
                        {template.careContext}
                      </Badge>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Dialog open={dialogOpen && selectedTemplate === template.id} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full border-gray-700 bg-gray-900/50 text-gray-300 hover:bg-gray-800"
                        onClick={() => {
                          setSelectedTemplate(template.id)
                          setDialogOpen(true)
                        }}
                      >
                        Preview Template
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl bg-gray-950 border-gray-800">
                      <DialogHeader>
                        <DialogTitle className="text-gray-100">{template.title} Preview</DialogTitle>
                        <DialogDescription className="text-gray-400">
                          This is a preview of how the form would appear to practitioners.
                        </DialogDescription>
                      </DialogHeader>
                      <ScrollArea className="max-h-[80vh]">
                        <div className="p-1">
                          {selectedTemplate && (
                            <FormRenderer
                              schema={clinicalFormTemplates.find((t) => t.id === selectedTemplate)?.schema!}
                              readOnly={false}
                            />
                          )}
                        </div>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
