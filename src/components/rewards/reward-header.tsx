import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus } from "lucide-react"

type Props = {
  search: string
  setSearch: (value: string) => void
  onCreate: () => void
}

export function RewardHeader({ search, setSearch, onCreate }: Props) {
  return (
    <div className="flex items-center justify-between">
      <div className="relative w-80">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

        <Input
          placeholder="Search reward..."
          className="pl-8"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Button onClick={onCreate}>
        <Plus className="mr-2 h-4 w-4" />
        New reward
      </Button>
    </div>
  )
}
