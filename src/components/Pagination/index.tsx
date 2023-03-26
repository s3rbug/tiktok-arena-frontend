import { Flex } from "@chakra-ui/react"
import { useRoutePagination } from "../../hooks/useRoutePagination"
import { getPaginationItems } from "../../utils/pagination/pagination"
import PaginationLink from "./PaginationLink"

type PropsType = {
	currentPage: number | null
	lastPage: number | null
	maxLength: number
	setCurrentPage: (newCurrentPage: number) => void
}

export const Pagination = ({
	currentPage,
	lastPage,
	maxLength,
	setCurrentPage,
}: PropsType) => {
	const { changeCurrentPage } = useRoutePagination({
		currentPage,
		lastPage,
		setCurrentPage,
	})

	if (!currentPage || !lastPage) {
		return null
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
