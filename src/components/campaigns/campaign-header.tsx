import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus } from "lucide-react"

export function CampaignHeader({ search, setSearch, onCreate }: any) {

    return (
        <div className="flex items-center justify-between">

            <div className="relative w-80">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                <Input
                    placeholder="Buscar campaña..."
                    className="pl-8"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <Button onClick={onCreate}>
                <Plus className="mr-2 h-4 w-4" />
                Nueva campaña
            </Button>

        </div>
    )
}