import { GitBranchIcon } from "lucide-react"
import { MobileMenu } from "@/components/mobile-menu"

export function FloatHeader() {
  return (
    <header className="sticky top-0 z-10 bg-gray-950 border-b border-gray-800 px-4 py-3">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <GitBranchIcon className="h-6 w-6 text-pink-500" />
          <div>
            <h1 className="text-xl font-bold text-pink-500">FLOAT</h1>
            <p className="text-xs text-gray-400">Continuity System</p>
          </div>
        </div>
        <MobileMenu />
      </div>
    </header>
  )
}
