"use client"

import { useState } from "react"
import {
  FormControl,
  FormDescription,
  FormField as UIFormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { BodyMapSelector } from "./body-map-selector"

interface FormFieldProps {
  field: {
    id: string
    label: string
    type: string
    placeholder?: string
    helperText?: string
    required?: boolean
    options?: { label: string; value: string }[]
    defaultValue?: any
    validation?: {
      min?: number
      max?: number
      minLength?: number
      maxLength?: number
      pattern?: string
    }
  }
  form: any
  readOnly?: boolean
}

export function FormField({ field, form, readOnly = false }: FormFieldProps) {
  const [date, setDate] = useState<Date>()

  const renderField = () => {
    switch (field.type) {
      case "text":
        return (
          <FormControl>
            <Input
              placeholder={field.placeholder}
              disabled={readOnly}
              className="bg-gray-900 border-gray-700 text-gray-200"
            />
          </FormControl>
        )

      case "textarea":
        return (
          <FormControl>
            <Textarea
              placeholder={field.placeholder}
              disabled={readOnly}
              className="min-h-[100px] bg-gray-900 border-gray-700 text-gray-200"
              value={form.getValues(field.id) || ""}
              onChange={(e) => form.setValue(field.id, e.target.value)}
            />
          </FormControl>
        )

      case "richtext":
        return (
          <FormControl>
            <div className="min-h-[150px] p-3 rounded-md border border-gray-700 bg-gray-900 text-gray-200">
              {readOnly ? (
                <div className="text-gray-400 italic">Rich text editor content</div>
              ) : (
                <div className="text-gray-400 italic">Rich text editor would be implemented here</div>
              )}
            </div>
          </FormControl>
        )

      case "number":
        return (
          <FormControl>
            <Input
              type="number"
              placeholder={field.placeholder}
              disabled={readOnly}
              className="bg-gray-900 border-gray-700 text-gray-200"
              min={field.validation?.min}
              max={field.validation?.max}
            />
          </FormControl>
        )

      case "date":
        return (
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-gray-900 border-gray-700 text-gray-200",
                    !form.getValues(field.id) && "text-gray-500",
                  )}
                  disabled={readOnly}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {form.getValues(field.id) ? (
                    format(new Date(form.getValues(field.id)), "PPP")
                  ) : (
                    <span>Select date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-gray-900 border-gray-700">
                <Calendar
                  mode="single"
                  selected={form.getValues(field.id) ? new Date(form.getValues(field.id)) : undefined}
                  onSelect={(date) => {
                    if (date) {
                      form.setValue(field.id, date.toISOString().split("T")[0])
                    }
                  }}
                  initialFocus
                  className="bg-gray-900 text-gray-200"
                />
              </PopoverContent>
            </Popover>
          </FormControl>
        )

      case "select":
        return (
          <FormControl>
            <Select
              disabled={readOnly}
              onValueChange={(value) => form.setValue(field.id, value)}
              defaultValue={form.getValues(field.id)}
            >
              <SelectTrigger className="bg-gray-900 border-gray-700 text-gray-200">
                <SelectValue placeholder={field.placeholder || "Select an option"} />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                {field.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-gray-200">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
        )

      case "multiselect":
        return (
          <FormControl>
            <div className="space-y-2">
              {field.options?.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${field.id}-${option.value}`}
                    disabled={readOnly}
                    checked={form.getValues(field.id)?.includes(option.value)}
                    onCheckedChange={(checked) => {
                      const currentValues = form.getValues(field.id) || []
                      if (checked) {
                        form.setValue(field.id, [...currentValues, option.value])
                      } else {
                        form.setValue(
                          field.id,
                          currentValues.filter((value: string) => value !== option.value),
                        )
                      }
                    }}
                    className="border-gray-700 data-[state=checked]:bg-pink-600 data-[state=checked]:border-pink-600"
                  />
                  <label
                    htmlFor={`${field.id}-${option.value}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-300"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </FormControl>
        )

      case "checkbox":
        return (
          <FormControl>
            <div className="flex items-center space-x-2">
              <Checkbox
                id={field.id}
                disabled={readOnly}
                checked={form.getValues(field.id)}
                onCheckedChange={(checked) => {
                  form.setValue(field.id, checked)
                }}
                className="border-gray-700 data-[state=checked]:bg-pink-600 data-[state=checked]:border-pink-600"
              />
              <label
                htmlFor={field.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-300"
              >
                {field.placeholder || "Yes"}
              </label>
            </div>
          </FormControl>
        )

      case "radio":
        return (
          <FormControl>
            <RadioGroup
              onValueChange={(value) => form.setValue(field.id, value)}
              defaultValue={form.getValues(field.id)}
              className="flex flex-col space-y-1"
              disabled={readOnly}
            >
              {field.options?.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option.value}
                    id={`${field.id}-${option.value}`}
                    className="border-gray-700 text-pink-600"
                  />
                  <label
                    htmlFor={`${field.id}-${option.value}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-300"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
        )

      case "slider":
        return (
          <FormControl>
            <div className="space-y-4">
              <Slider
                disabled={readOnly}
                defaultValue={[form.getValues(field.id) || field.validation?.min || 0]}
                min={field.validation?.min || 0}
                max={field.validation?.max || 100}
                step={1}
                onValueChange={(values) => {
                  form.setValue(field.id, values[0])
                }}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>{field.validation?.min || 0}</span>
                <span>{Math.floor(((field.validation?.max || 100) - (field.validation?.min || 0)) / 2)}</span>
                <span>{field.validation?.max || 100}</span>
              </div>
            </div>
          </FormControl>
        )

      case "switch":
        return (
          <FormControl>
            <div className="flex items-center space-x-2">
              <Switch
                id={field.id}
                disabled={readOnly}
                checked={form.getValues(field.id)}
                onCheckedChange={(checked) => {
                  form.setValue(field.id, checked)
                }}
                className="data-[state=checked]:bg-pink-600"
              />
              <label
                htmlFor={field.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-300"
              >
                {field.placeholder || "Enabled"}
              </label>
            </div>
          </FormControl>
        )

      case "bodyMap":
        return (
          <FormControl>
            <BodyMapSelector
              disabled={readOnly}
              value={form.getValues(field.id) || []}
              onChange={(value) => form.setValue(field.id, value)}
            />
          </FormControl>
        )

      default:
        return (
          <FormControl>
            <Input
              placeholder={field.placeholder}
              disabled={readOnly}
              className="bg-gray-900 border-gray-700 text-gray-200"
            />
          </FormControl>
        )
    }
  }

  return (
    <UIFormField
      control={form.control}
      name={field.id}
      render={({ field: formField }) => (
        <FormItem>
          <FormLabel className="text-gray-200">
            {field.label}
            {field.required && <span className="text-pink-500 ml-1">*</span>}
          </FormLabel>
          {renderField()}
          {field.helperText && <FormDescription className="text-gray-400 text-xs">{field.helperText}</FormDescription>}
          <FormMessage className="text-pink-500" />
        </FormItem>
      )}
    />
  )
}
