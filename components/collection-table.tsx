import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Collection {
  name: string
  docCount: string
  function: string
  changes: string
}

interface CollectionTableProps {
  collections: Collection[]
}

export function CollectionTable({ collections }: CollectionTableProps) {
  return (
    <div className="rounded-md border border-gray-800 overflow-hidden">
      <ScrollArea className="max-h-[500px]">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-900/50 hover:bg-gray-900/50">
              <TableHead className="text-gray-400 font-medium">Collection</TableHead>
              <TableHead className="text-gray-400 font-medium">Docs</TableHead>
              <TableHead className="text-gray-400 font-medium hidden md:table-cell">Function</TableHead>
              <TableHead className="text-gray-400 font-medium hidden md:table-cell">Changes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {collections.map((collection) => (
              <TableRow key={collection.name} className="border-gray-800 hover:bg-gray-900/30">
                <TableCell className="font-mono text-pink-400">{collection.name}</TableCell>
                <TableCell className="text-gray-300">{collection.docCount}</TableCell>
                <TableCell className="text-gray-300 hidden md:table-cell">{collection.function}</TableCell>
                <TableCell className="text-gray-300 hidden md:table-cell">{collection.changes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  )
}
