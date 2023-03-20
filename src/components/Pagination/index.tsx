import { Flex } from "@chakra-ui/react"
import { useCallback, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { paginationActions } from "../../redux/slices/pagination/pagination"
import { useTypedDispatch } from "../../redux/store"
import { getPaginationItems } from "../../utils/pagination"
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
	const dispatch = useTypedDispatch()

	const [searchParams, setSearchParams] = useSearchParams()

	const urlCurrentPage = Number(searchParams.get("page"))

	const changeCurrentPage = useCallback(
		(page: number) => {
			return () => {
				setSearchParams({ page: String(page) })
				setCurrentPage(page)
			}
		},
		[setCurrentPage, setSearchParams]
	)

	const resetCurrentPage = useCallback(() => {
		changeCurrentPage(1)()
	}, [changeCurrentPage])

	useEffect(() => {
		if (currentPage !== null) {
			return
		}

		if (isNaN(urlCurrentPage) || urlCurrentPage === 0) {
			resetCurrentPage()
		} else {
			dispatch(paginationActions.setCurrentPage({ page: urlCurrentPage }))
		}
	}, [dispatch, urlCurrentPage, currentPage, resetCurrentPage])

	useEffect(() => {
		if (
			currentPage !== null &&
			lastPage !== null &&
			(currentPage <= 0 || currentPage > lastPage)
		) {
			resetCurrentPage()
		}
	}, [currentPage, lastPage, resetCurrentPage])

	if (!currentPage || !lastPage) {
		return null
	}

	const pageNumbers = getPaginationItems(currentPage, lastPage, maxLength)

	return (
		<Flex mt={8} gap={2} justifyContent="center">
			<PaginationLink
				onClick={changeCurrentPage(currentPage - 1)}
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
						onClick={changeCurrentPage(pageNumber)}
						isCurrent={currentPage === pageNumber}
					>
						{pageNumber}
					</PaginationLink>
				)
			})}
			<PaginationLink
				onClick={changeCurrentPage(currentPage + 1)}
				isDisabled={currentPage === lastPage}
			>
				Next
			</PaginationLink>
		</Flex>
	)
}
