"use client"

import { useState, useEffect } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import type { FormField } from "./form-field"
import { FormSection as UIFormSection } from "./form-section"
import { ProgressIndicator } from "./progress-indicator"

export interface FormSchema {
  id: string
  title: string
  description: string
  sections: FormSection[]
  progressiveDisclosure?: boolean
  careContext?: string
  practitionerType?: string[]
}

interface FormSection {
  id: string
  title: string
  description?: string
  fields: FormField[]
  conditional?: {
    field: string
    value: any
    operator?: "eq" | "neq" | "gt" | "lt" | "contains"
  }
}

interface FormRendererProps {
  schema: FormSchema
  onSubmit?: (data: any) => void
  defaultValues?: Record<string, any>
  readOnly?: boolean
}

export function FormRenderer({ schema, onSubmit, defaultValues = {}, readOnly = false }: FormRendererProps) {
  const [activeSection, setActiveSection] = useState(0)
  const [formData, setFormData] = useState<Record<string, any>>(defaultValues)
  const [visibleSections, setVisibleSections] = useState<FormSection[]>([])

  // Build Zod schema dynamically from form schema
  const buildZodSchema = () => {
    const schemaMap: Record<string, any> = {}

    schema.sections.forEach((section) => {
      section.fields.forEach((field) => {
        let fieldSchema: any

        switch (field.type) {
          case "text":
          case "textarea":
          case "richtext":
            fieldSchema = z.string()
            if (field.validation?.minLength) fieldSchema = fieldSchema.min(field.validation.minLength)
            if (field.validation?.maxLength) fieldSchema = fieldSchema.max(field.validation.maxLength)
            if (field.validation?.pattern) fieldSchema = fieldSchema.regex(new RegExp(field.validation.pattern))
            break
          case "number":
            fieldSchema = z.number()
            if (field.validation?.min !== undefined) fieldSchema = fieldSchema.min(field.validation.min)
            if (field.validation?.max !== undefined) fieldSchema = fieldSchema.max(field.validation.max)
            break
          case "date":
            fieldSchema = z.string()
            break
          case "select":
            fieldSchema = z.string()
            break
          case "multiselect":
            fieldSchema = z.array(z.string())
            break
          case "checkbox":
            fieldSchema = z.boolean()
            break
          case "radio":
            fieldSchema = z.string()
            break
          case "slider":
            fieldSchema = z.number()
            if (field.validation?.min !== undefined) fieldSchema = fieldSchema.min(field.validation.min)
            if (field.validation?.max !== undefined) fieldSchema = fieldSchema.max(field.validation.max)
            break
          default:
            fieldSchema = z.any()
        }

        if (field.required && !field.conditional) {
          schemaMap[field.id] = fieldSchema
        } else {
          schemaMap[field.id] = fieldSchema.optional()
        }
      })
    })

    return z.object(schemaMap)
  }

  const zodSchema = buildZodSchema()

  const form = useForm<z.infer<typeof zodSchema>>({
    resolver: zodResolver(zodSchema),
    defaultValues: defaultValues,
    mode: "onChange",
  })

  // Update visible sections based on conditionals - Fixed to prevent infinite loop
  useEffect(() => {
    // Use a subscription to form values instead of watch() in the dependency array
    const subscription = form.watch((value) => {
      const currentValues = value as Record<string, any>
      setFormData(currentValues)

      const filtered = schema.sections.filter((section) => {
        if (!section.conditional) return true

        const { field, value, operator = "eq" } = section.conditional
        const fieldValue = currentValues[field]

        switch (operator) {
          case "eq":
            return fieldValue === value
          case "neq":
            return fieldValue !== value
          case "gt":
            return fieldValue > value
          case "lt":
            return fieldValue < value
          case "contains":
            return Array.isArray(fieldValue) && fieldValue.includes(value)
          default:
            return true
        }
      })

      setVisibleSections(filtered)
    })

    // Initialize visible sections on mount
    const initialValues = form.getValues()
    const initialFiltered = schema.sections.filter((section) => {
      if (!section.conditional) return true

      const { field, value, operator = "eq" } = section.conditional
      const fieldValue = initialValues[field]

      switch (operator) {
        case "eq":
          return fieldValue === value
        case "neq":
          return fieldValue !== value
        case "gt":
          return fieldValue > value
        case "lt":
          return fieldValue < value
        case "contains":
          return Array.isArray(fieldValue) && fieldValue.includes(value)
        default:
          return true
      }
    })
    setVisibleSections(initialFiltered)

    // Clean up subscription
    return () => subscription.unsubscribe()
  }, [form, schema.sections])

  const handleSubmit = (data: z.infer<typeof zodSchema>) => {
    if (onSubmit) {
      onSubmit(data)
    }
  }

  const nextSection = () => {
    if (activeSection < visibleSections.length - 1) {
      setActiveSection(activeSection + 1)
      window.scrollTo(0, 0)
    }
  }

  const prevSection = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1)
      window.scrollTo(0, 0)
    }
  }

  const isLastSection = activeSection === visibleSections.length - 1
  const currentSection = visibleSections[activeSection]

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <CardTitle className="text-xl text-gray-100">{schema.title}</CardTitle>
            <CardDescription className="text-gray-400 mt-1">{schema.description}</CardDescription>
          </div>
          {schema.careContext && (
            <Badge variant="outline" className="bg-pink-900/20 text-pink-300 border-pink-900/30 self-start">
              {schema.careContext}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {schema.progressiveDisclosure && visibleSections.length > 1 && (
          <div className="mb-6">
            <ProgressIndicator
              steps={visibleSections.map((section) => section.title)}
              currentStep={activeSection}
              onStepClick={(index) => setActiveSection(index)}
            />
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {schema.progressiveDisclosure ? (
              // Progressive disclosure mode - show one section at a time
              currentSection && (
                <UIFormSection
                  key={currentSection.id}
                  section={currentSection}
                  form={form}
                  formData={formData}
                  readOnly={readOnly}
                />
              )
            ) : (
              // Show all sections at once
              <Tabs defaultValue={visibleSections[0]?.id} className="w-full">
                <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-4">
                  {visibleSections.map((section) => (
                    <TabsTrigger key={section.id} value={section.id}>
                      {section.title}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {visibleSections.map((section) => (
                  <TabsContent key={section.id} value={section.id}>
                    <UIFormSection section={section} form={form} formData={formData} readOnly={readOnly} />
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row gap-4 justify-between border-t border-gray-800 pt-6">
        {schema.progressiveDisclosure ? (
          <div className="flex w-full justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={prevSection}
              disabled={activeSection === 0}
              className="border-gray-700 bg-gray-900/50 text-gray-300 hover:bg-gray-800"
            >
              Previous
            </Button>
            {isLastSection ? (
              <Button
                type="submit"
                onClick={form.handleSubmit(handleSubmit)}
                className="bg-pink-900/20 text-pink-300 hover:bg-pink-900/30 border border-pink-900/30"
                disabled={readOnly}
              >
                Complete Form
              </Button>
            ) : (
              <Button
                type="button"
                onClick={nextSection}
                className="bg-pink-900/20 text-pink-300 hover:bg-pink-900/30 border border-pink-900/30"
              >
                Next Section
              </Button>
            )}
          </div>
        ) : (
          <Button
            type="submit"
            onClick={form.handleSubmit(handleSubmit)}
            className="bg-pink-900/20 text-pink-300 hover:bg-pink-900/30 border border-pink-900/30 w-full sm:w-auto"
            disabled={readOnly}
          >
            Complete Form
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
