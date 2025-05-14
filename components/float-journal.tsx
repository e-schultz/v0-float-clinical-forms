"use client"

import { useState } from "react"
import { ContinuityBridgeList } from "@/components/continuity-bridge-list"
import { FloatHeader } from "@/components/float-header"
import { TabNav } from "@/components/tab-nav"
import { CollectionView } from "@/components/collection-view"
import { ThematicThreadView } from "@/components/thematic-thread-view"
import { useMediaQuery } from "@/hooks/use-media-query"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MethodologyView } from "@/components/methodology-view"
import { ProgressiveDisclosureView } from "@/components/progressive-disclosure-view"
import { SchemaDrivenView } from "@/components/schema-driven-view"
import { ClinicalFormsView } from "@/components/clinical-forms-view"

export function FloatJournal() {
  const [activeTab, setActiveTab] = useState("bridges")
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <div className="flex flex-col h-screen">
      <FloatHeader />
      <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />

      <ScrollArea className="flex-1 px-4 pb-20">
        <div className="max-w-3xl mx-auto py-4">
          {activeTab === "bridges" && <ContinuityBridgeList />}
          {activeTab === "collections" && <CollectionView />}
          {activeTab === "threads" && <ThematicThreadView />}
          {activeTab === "methodology" && <MethodologyView />}
          {activeTab === "progressive" && <ProgressiveDisclosureView />}
          {activeTab === "schema" && <SchemaDrivenView />}
          {activeTab === "clinical-forms" && <ClinicalFormsView />}
        </div>
      </ScrollArea>
    </div>
  )
}
