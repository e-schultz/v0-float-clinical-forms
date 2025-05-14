import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ConceptCardProps {
  title: string
  content: string
  metadata: {
    concept: string
    metaphor_potential: string
    professional_application: string
    relevance_to_clinical_forms: string
  }
}

export function ConceptCard({ title, content, metadata }: ConceptCardProps) {
  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base text-gray-100">{title}</CardTitle>
          <Badge variant="outline" className="bg-pink-900/20 text-pink-300 border-pink-900/30">
            {metadata.concept}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-gray-300">{content}</p>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="space-y-1">
              <div className="text-gray-400">Professional Application</div>
              <div className="text-gray-300">{metadata.professional_application}</div>
            </div>
            <div className="space-y-1">
              <div className="text-gray-400">Clinical Forms Relevance</div>
              <div className="text-gray-300">{metadata.relevance_to_clinical_forms}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
