"use client"

import {
  GitBranchIcon,
  LayersIcon,
  BookMarkedIcon,
  BookOpenIcon,
  EyeIcon,
  DatabaseIcon,
  ClipboardIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TabNavProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function TabNav({ activeTab, setActiveTab }: TabNavProps) {
  const tabs = [
    { id: "bridges", label: "Bridges", icon: <GitBranchIcon className="h-4 w-4" /> },
    { id: "collections", label: "Collections", icon: <BookMarkedIcon className="h-4 w-4" /> },
    { id: "threads", label: "Threads", icon: <LayersIcon className="h-4 w-4" /> },
    { id: "methodology", label: "Concepts", icon: <BookOpenIcon className="h-4 w-4" /> },
    { id: "progressive", label: "Progressive", icon: <EyeIcon className="h-4 w-4" /> },
    { id: "schema", label: "Schema UI", icon: <DatabaseIcon className="h-4 w-4" /> },
    { id: "clinical-forms", label: "Clinical Forms", icon: <ClipboardIcon className="h-4 w-4" /> },
  ]

  return (
    <div className="bg-gray-950 border-b border-gray-800">
      <ScrollArea className="w-full" orientation="horizontal">
        <div className="flex min-w-max px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-950",
                activeTab === tab.id
                  ? "border-pink-500 text-pink-500"
                  : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700",
              )}
              aria-current={activeTab === tab.id ? "page" : undefined}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
