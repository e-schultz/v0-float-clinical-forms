"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormRenderer } from "./form-renderer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { clinicalFormTemplates } from "@/data/clinical-form-templates"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon, PinIcon, CodeIcon, EyeIcon, MaximizeIcon, MinimizeIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { SchemaEditor } from "./schema-editor"
import { useToast } from "@/hooks/use-toast"

export function SchemaPreviewViewEnhanced() {
  const [selectedTemplateId, setSelectedTemplateId] = useState(clinicalFormTemplates[0].id)
  const [editorVisible, setEditorVisible] = useState(true)
  const [editorPinned, setEditorPinned] = useState(false)
  const [editorWidth, setEditorWidth] = useState(50) // percentage of container width
  const [isDragging, setIsDragging] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [schemaJson, setSchemaJson] = useState("")
  const [activeSchema, setActiveSchema] = useState<any>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")
  const { toast } = useToast()

  const selectedTemplate = clinicalFormTemplates.find((t) => t.id === selectedTemplateId)

  // Update schema when template changes
  useEffect(() => {
    if (selectedTemplate) {
      const formattedSchema = JSON.stringify(selectedTemplate.schema, null, 2)
      setSchemaJson(formattedSchema)
      setActiveSchema(selectedTemplate.schema)
    }
  }, [selectedTemplate])

  // Auto-hide editor on mobile unless pinned
  useEffect(() => {
    if (isMobile && !editorPinned) {
      setEditorVisible(false)
    }
  }, [isMobile, editorPinned])

  // Handle resizing
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
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

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handleSchemaChange = (newSchema: string) => {
    setSchemaJson(newSchema)
  }

  const applySchemaChanges = () => {
    try {
      const parsedSchema = JSON.parse(schemaJson)
      setActiveSchema(parsedSchema)
    } catch (error) {
      toast({
        title: "Invalid JSON",
        description: "The schema contains invalid JSON and cannot be applied.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className={cn("space-y-6 transition-all duration-300", isFullscreen && "fixed inset-0 z-50 bg-gray-950 p-4")}>
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
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="h-8 w-8 p-0 text-gray-400 hover:text-pink-400"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? <MinimizeIcon className="h-4 w-4" /> : <MaximizeIcon className="h-4 w-4" />}
            </Button>
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
        ref={containerRef}
        className={cn(
          "relative flex flex-col lg:flex-row gap-0",
          isFullscreen ? "h-[calc(100vh-120px)]" : "h-[calc(100vh-250px)] min-h-[600px]",
        )}
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
                <span>Schema Editor</span>
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
            <CardContent className="p-4 h-[calc(100%-60px)]">
              <SchemaEditor initialValue={schemaJson} onChange={handleSchemaChange} onApply={applySchemaChanges} />
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
              <CardTitle className="text-base text-gray-100">Form Preview</CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-[calc(100%-60px)]">
              <ScrollArea className="h-full">
                <div className="p-4">{activeSchema && <FormRenderer schema={activeSchema} readOnly={false} />}</div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
