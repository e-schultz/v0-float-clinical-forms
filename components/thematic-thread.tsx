import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ThematicThreadProps {
  title: string
  technical: string
  philosophical: string
}

export function ThematicThread({ title, technical, philosophical }: ThematicThreadProps) {
  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-base text-gray-100">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="text-sm font-medium text-pink-400">Technical Context</div>
            <p className="text-sm text-gray-300">{technical}</p>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-purple-400">Philosophical Frame</div>
            <p className="text-sm text-gray-300">{philosophical}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
