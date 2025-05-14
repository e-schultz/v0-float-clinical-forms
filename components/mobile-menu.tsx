"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[85%] sm:w-[385px] bg-gray-950 border-gray-800">
        <SheetHeader>
          <SheetTitle className="text-left text-pink-500">FLOAT System</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] mt-6">
          <div className="flex flex-col gap-4 px-1">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-400">Active Threads</h3>
              <div className="space-y-2">
                {["jane_application_project", "clinical_forms_philosophy", "mcp_system_improvements"].map((thread) => (
                  <div
                    key={thread}
                    className="px-3 py-2 rounded-md bg-gray-900/50 text-sm text-gray-300 hover:bg-gray-900 transition-colors"
                  >
                    {thread}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3 pt-4 border-t border-gray-800">
              <h3 className="text-sm font-medium text-gray-400">Key Metaphors</h3>
              <div className="space-y-2">
                {["Form fields as moments of care", "Systems as relationships", "Bridge not leash"].map((metaphor) => (
                  <div key={metaphor} className="px-3 py-2 rounded-md bg-gray-900/50 text-sm text-gray-300">
                    {metaphor}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3 pt-4 border-t border-gray-800">
              <h3 className="text-sm font-medium text-gray-400">System Mode</h3>
              <div className="px-3 py-2 rounded-md bg-purple-900/20 text-sm text-purple-300 border border-purple-900/30">
                bridge_transition
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
