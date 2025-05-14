import { CollectionTable } from "@/components/collection-table"
import { collectionData } from "@/data/collection-data"

export function CollectionView() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-pink-400">Collections</h2>
      <CollectionTable collections={collectionData} />
    </div>
  )
}
