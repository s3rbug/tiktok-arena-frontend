import { Flex } from "@chakra-ui/react"
import { useRoutePagination } from "../../hooks/useRoutePagination"
import { getPaginationItems } from "../../utils/pagination/pagination"
import { Loading } from "../Loading"
import PaginationLink from "./PaginationLink"

type PropsType = {
	currentPage: number | null
	lastPage: number | null
	maxLength: number
	setCurrentPage: (newCurrentPage: number) => void
	searchField: string | null
	setSearchField: (newSearchField: string | null) => void
}

export const Pagination = ({
	lastPage,
	maxLength,
	searchField,
	setSearchField,
	currentPage,
	setCurrentPage,
}: PropsType) => {
	const { changeCurrentPage } = useRoutePagination({
		currentPage,
		lastPage,
		setCurrentPage,
		searchField,
		setSearchField,
	})

	if (!currentPage || !lastPage) {
		return <Loading />
	}

	const pageNumbers = getPaginationItems(currentPage, lastPage, maxLength)

	return (
		<Flex mt={8} gap={2} justifyContent="center">
			<PaginationLink
				onClick={() => changeCurrentPage(currentPage - 1)}
				isDisabled={currentPage === 1}
			>
				Previous
			</PaginationLink>
			{pageNumbers.map((pageNumber, index) => {
				if (isNaN(pageNumber)) {
					return (
						<PaginationLink key={index} isDisabled={true}>
							...
						</PaginationLink>
					)
				}
				return (
					<PaginationLink
						key={index}
						onClick={() => changeCurrentPage(pageNumber)}
						isCurrent={currentPage === pageNumber}
					>
						{pageNumber}
					</PaginationLink>
				)
			})}
			<PaginationLink
				onClick={() => changeCurrentPage(currentPage + 1)}
				isDisabled={currentPage === lastPage}
			>
				Next
			</PaginationLink>
		</Flex>
	)
}
