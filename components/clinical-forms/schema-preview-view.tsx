"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormRenderer } from "./form-renderer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { clinicalFormTemplates } from "@/data/clinical-form-templates"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon, PinIcon, CodeIcon, EyeIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

export function SchemaPreviewView() {
  const [selectedTemplateId, setSelectedTemplateId] = useState(clinicalFormTemplates[0].id)
  const [editorVisible, setEditorVisible] = useState(true)
  const [editorPinned, setEditorPinned] = useState(false)
  const [editorWidth, setEditorWidth] = useState(50) // percentage of container width
  const [isDragging, setIsDragging] = useState(false)

  const isMobile = useMediaQuery("(max-width: 768px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")

  // Auto-hide editor on mobile unless pinned
  useEffect(() => {
    if (isMobile && !editorPinned) {
      setEditorVisible(false)
    }
  }, [isMobile, editorPinned])

  const selectedTemplate = clinicalFormTemplates.find((t) => t.id === selectedTemplateId)
  const schema = selectedTemplate?.schema

  // Format the schema as pretty JSON
  const formattedSchema = JSON.stringify(schema, null, 2)

  // Handle resizing
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      const container = document.getElementById("schema-preview-container")
      if (!container) return

      const containerRect = container.getBoundingClientRect()
      const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100

      // Limit the width between 30% and 70%
      if (newWidth >= 30 && newWidth <= 70) {
        setEditorWidth(newWidth)
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  const toggleEditor = () => {
    setEditorVisible(!editorVisible)
  }

  const togglePin = () => {
    setEditorPinned(!editorPinned)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-pink-400">Schema & Preview</h2>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleEditor}
              className="h-8 w-8 p-0 text-gray-400 hover:text-pink-400"
              aria-label={editorVisible ? "Hide schema editor" : "Show schema editor"}
            >
              {editorVisible ? <CodeIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
            </Button>
            {editorVisible && (
              <Button
                variant="ghost"
                size="sm"
                onClick={togglePin}
                className={cn("h-8 w-8 p-0 text-gray-400 hover:text-pink-400", editorPinned && "text-pink-400")}
                aria-label={editorPinned ? "Unpin schema editor" : "Pin schema editor"}
              >
                <PinIcon className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
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

      <div
        id="schema-preview-container"
        className="relative flex flex-col lg:flex-row gap-0 h-[calc(100vh-250px)] min-h-[600px]"
        style={{ cursor: isDragging ? "col-resize" : "default" }}
      >
        {/* Schema Editor Panel */}
        <div
          className={cn(
            "absolute inset-0 z-10 bg-gray-950 transition-transform lg:static lg:transition-[width] duration-300 ease-in-out",
            editorVisible ? "translate-x-0" : "-translate-x-full lg:w-0",
            isMobile || isTablet ? "w-full" : "",
          )}
          style={{
            width: !isMobile && !isTablet && editorVisible ? `${editorWidth}%` : undefined,
          }}
        >
          <Card className="h-full bg-gray-900/50 border-gray-800 rounded-none lg:rounded-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-gray-100 flex justify-between items-center">
                <span>Schema Definition</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleEditor}
                  className="h-8 w-8 p-0 text-gray-400 hover:text-pink-400 lg:hidden"
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-[calc(100%-60px)]">
              <ScrollArea className="h-full rounded-md border border-gray-800">
                <pre className="p-4 text-xs text-pink-300 font-mono">{formattedSchema}</pre>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Resizer Handle */}
        {editorVisible && !isMobile && !isTablet && (
          <div
            className="absolute h-full w-2 bg-gray-800 cursor-col-resize z-20 hidden lg:block"
            style={{ left: `${editorWidth}%` }}
            onMouseDown={handleMouseDown}
          />
        )}

        {/* Toggle Button (Mobile/Tablet) */}
        {!editorVisible && (isMobile || isTablet) && (
          <Button
            variant="outline"
            size="sm"
            onClick={toggleEditor}
            className="absolute top-2 left-2 z-20 h-8 w-8 p-0 rounded-full bg-gray-800 border-gray-700 text-gray-300"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        )}

        {/* Preview Panel */}
        <div
          className={cn(
            "flex-1 transition-[margin] duration-300 ease-in-out h-full",
            editorVisible && (isMobile || isTablet) ? "hidden" : "block",
          )}
          style={{
            marginLeft: !isMobile && !isTablet && editorVisible ? "8px" : "0",
            width: !isMobile && !isTablet && editorVisible ? `${100 - editorWidth}%` : "100%",
          }}
        >
          <Card className="h-full bg-gray-900/50 border-gray-800 rounded-none lg:rounded-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-gray-100">Rendered Example</CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-[calc(100%-60px)]">
              <ScrollArea className="h-full">
                <div className="p-4">{schema && <FormRenderer schema={schema} readOnly={false} />}</div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
