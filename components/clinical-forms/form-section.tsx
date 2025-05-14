import { FormField } from "./form-field"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

interface FormSectionProps {
  section: {
    id: string
    title: string
    description?: string
    fields: any[]
  }
  form: any
  formData: Record<string, any>
  readOnly?: boolean
}

export function FormSection({ section, form, formData, readOnly = false }: FormSectionProps) {
  // Filter fields based on conditionals
  const visibleFields = section.fields.filter((field) => {
    if (!field.conditional) return true

    const { field: condField, value, operator = "eq" } = field.conditional
    const fieldValue = formData[condField]

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

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-200">{section.title}</h3>
        {section.description && <p className="text-sm text-gray-400 mt-1">{section.description}</p>}
      </div>

      {section.description && <Separator className="bg-gray-800" />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visibleFields.map((field) => {
          const width = field.width || "full"
          const colSpan = width === "full" ? "md:col-span-2" : width === "half" ? "" : "md:col-span-1"

          return (
            <div key={field.id} className={colSpan}>
              <FormField field={field} form={form} readOnly={readOnly} />

              {field.careIndicator && (
                <Alert className="mt-2 bg-pink-900/10 border-pink-900/20">
                  <InfoIcon className="h-4 w-4 text-pink-400" />
                  <AlertDescription className="text-pink-300 text-xs">
                    This field represents a critical moment of care. The information captured here directly impacts
                    patient treatment decisions.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
