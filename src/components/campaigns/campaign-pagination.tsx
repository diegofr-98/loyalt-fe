import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink
} from "@/components/ui/pagination"

export function CampaignPagination({ page, totalPages, setPage }: any) {

    return (
        <Pagination>
            <PaginationContent>

                {Array.from({ length: totalPages }).map((_, i) => (

                    <PaginationItem key={i}>
                        <PaginationLink
                            isActive={page === i + 1}
                            onClick={() => setPage(i + 1)}
                        >
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>

                ))}

            </PaginationContent>
        </Pagination>
    )
}