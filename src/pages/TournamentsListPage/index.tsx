import { Box } from "@chakra-ui/react"
import { useEffect } from "react"
import { Tournaments } from "../../components"
import { Pagination } from "../../components/Pagination"
import { getTournaments } from "../../redux/middleware/tournament"
import { paginationActions } from "../../redux/slices/pagination/pagination"
import { useTypedDispatch, useTypedSelector } from "../../redux/store"

export function TournamentsListPage() {
	const dispatch = useTypedDispatch()

	const tournaments = useTypedSelector((state) => state.arena.tournaments)

	const { currentPage, lastPage, maxLength, pageSize } = useTypedSelector(
		(state) => state.pagination.globalTournaments
	)

	useEffect(() => {
		if (currentPage) {
			dispatch(getTournaments({ page: currentPage, pageSize: pageSize }))
		}
	}, [dispatch, currentPage, pageSize])

	function setCurrentPage(page: number) {
		dispatch(
			paginationActions.setCurrentPage({ page, key: "globalTournaments" })
		)
	}

	return (
		<Box p={8}>
			<Tournaments tournaments={tournaments} />
			<Pagination
				currentPage={currentPage}
				lastPage={lastPage}
				maxLength={maxLength}
				setCurrentPage={setCurrentPage}
			/>
		</Box>
	)
}
