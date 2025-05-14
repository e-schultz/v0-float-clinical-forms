"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { PlayIcon, SaveIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SchemaEditorProps {
  initialValue: string
  onChange: (value: string) => void
  onApply: () => void
}

export function SchemaEditor({ initialValue, onChange, onApply }: SchemaEditorProps) {
  const [value, setValue] = useState(initialValue)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
    setError(null)
  }

  const validateAndApply = () => {
    try {
      const parsed = JSON.parse(value)
      onChange(value)
      onApply()
      setError(null)
      toast({
        title: "Schema applied",
        description: "The form has been updated with your changes.",
        variant: "default",
      })
    } catch (err) {
      setError(`Invalid JSON: ${(err as Error).message}`)
      toast({
        title: "Invalid JSON",
        description: (err as Error).message,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 relative">
        <ScrollArea className="h-full rounded-md border border-gray-800">
          <textarea
            value={value}
            onChange={handleChange}
            className="w-full h-full min-h-[400px] p-4 bg-gray-950 text-pink-300 font-mono text-xs resize-none focus:outline-none"
            spellCheck="false"
            aria-label="Schema JSON editor"
          />
        </ScrollArea>
      </div>

      {error && (
        <div className="mt-2 p-2 text-xs text-red-400 bg-red-900/20 border border-red-900/30 rounded">{error}</div>
      )}

      <div className="flex justify-end gap-2 mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={validateAndApply}
          className="bg-gray-900 border-gray-700 text-gray-200 hover:bg-gray-800"
        >
          <PlayIcon className="h-4 w-4 mr-2" />
          Apply Changes
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={validateAndApply}
          className="bg-pink-900/20 text-pink-300 hover:bg-pink-900/30 border border-pink-900/30"
        >
          <SaveIcon className="h-4 w-4 mr-2" />
          Save Schema
        </Button>
      </div>
    </div>
  )
}
