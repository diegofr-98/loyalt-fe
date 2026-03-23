import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"

type Props = {
  page: number
  totalPages: number
  setPage: (page: number) => void
}

export function RewardPagination({ page, totalPages, setPage }: Props) {
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
