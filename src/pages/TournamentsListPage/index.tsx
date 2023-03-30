import { Box } from "@chakra-ui/react"
import { useEffect } from "react"
import { Loading, Tournaments } from "../../components"
import { Pagination } from "../../components/Pagination"
import { getTournaments } from "../../redux/middleware/tournament"
import { paginationActions } from "../../redux/slices/pagination/pagination"
import { tournamentActions } from "../../redux/slices/tournament/tournament"
import { useTypedDispatch, useTypedSelector } from "../../redux/store"

export function TournamentsListPage() {
	const dispatch = useTypedDispatch()

	const tournaments = useTypedSelector((state) => state.arena.tournaments)

	const { currentPage, lastPage, maxLength, pageSize } = useTypedSelector(
		(state) => state.pagination.globalTournaments
	)
	const searchField = useTypedSelector((state) => state.arena.search.global)

	useEffect(() => {
		if (currentPage) {
			dispatch(
				getTournaments({
					page: currentPage,
					pageSize: pageSize,
					search: searchField,
				})
			)
		}
	}, [dispatch, currentPage, pageSize, searchField])

	function setCurrentPage(page: number) {
		dispatch(
			paginationActions.setCurrentPage({ page, key: "globalTournaments" })
		)
	}

	function setSearchField(searchField: string | null) {
		dispatch(tournamentActions.setSearchField({ searchField, key: "global" }))
	}

	if (!tournaments) {
		return <Loading />
	}

	return (
		<Box p={8}>
			<Tournaments tournaments={tournaments} />
			<Pagination
				currentPage={currentPage}
				lastPage={lastPage}
				maxLength={maxLength}
				setCurrentPage={setCurrentPage}
				searchField={searchField}
				setSearchField={setSearchField}
			/>
		</Box>
	)
}
