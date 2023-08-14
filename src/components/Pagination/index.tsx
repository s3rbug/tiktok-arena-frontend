import { Flex } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { useRoutePagination } from "../../hooks/useRoutePagination"
import { getPaginationItems } from "../../utils/pagination/pagination"
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
		return null
	}

	const pageNumbers = getPaginationItems(currentPage, lastPage, maxLength)

	return (
		<Flex
			as={motion.div}
			initial={{ transform: "translateY(100px)", opacity: 0 }}
			animate={{
				transform: "translateY(0)",
				opacity: 1,
				transition: { duration: 1 },
			}}
			mt={8}
			gap={2}
			justifyContent="center"
		>
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
