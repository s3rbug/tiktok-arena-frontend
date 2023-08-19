import { Box, Button, Flex, Heading, useDisclosure } from "@chakra-ui/react"
import { useEffect, useRef } from "react"
import { Link, useParams } from "react-router-dom"
import { DeleteTournamentsPayload } from "../../api/tournament/tournament.types"
import { Loading, Tournaments } from "../../components"
import { ConfirmDialog } from "../../components/ConfirmDialog"
import { Pagination } from "../../components/Pagination"
import { useAuth } from "../../hooks/useAuth"
import {
	deleteTournaments,
	getUserTournaments,
} from "../../redux/middleware/tournament"
import { paginationActions } from "../../redux/slices/pagination/pagination"
import { tournamentActions } from "../../redux/slices/tournament/tournament"
import { useTypedDispatch, useTypedSelector } from "../../redux/store"
import UserSvg from "../../assets/userIcon.svg"
import { useCustomToast } from "../../hooks/useCustomToast"
import { ProfileHeader } from "./ProfileHeader/ProfileHeader"

export function ProfilePage() {
	const dispatch = useTypedDispatch()

	const { isOpen, onOpen, onClose } = useDisclosure()

	const currentUser = useAuth()

	const profileUser = useTypedSelector(
		(state) => state.arena.userTournaments?.User
	)

	const { userId } = useParams()

	const isProfileOwner = !userId || userId === currentUser?.ID

	const user = isProfileOwner ? currentUser : profileUser

	const { showToast } = useCustomToast()

	const dialogRef = useRef(null)

	const tournaments = useTypedSelector(
		(state) => state.arena.userTournaments?.Tournaments
	)

	const searchField = useTypedSelector(
		(state) => state.arena.tournamentSearch.user
	)

	const { currentPage, lastPage, maxLength, pageSize } = useTypedSelector(
		(state) => state.pagination.userTournaments
	)

	useEffect(() => {
		const userIdToFetch = userId || user?.ID

		if (!currentPage || !pageSize || !userIdToFetch) {
			return
		}

		dispatch(
			getUserTournaments({
				page: currentPage,
				pageSize,
				search: searchField,
				userId: userIdToFetch,
			})
		)
	}, [dispatch, user?.ID, currentPage, pageSize, searchField, userId])

	useEffect(() => {
		return () => {
			dispatch(tournamentActions.setUserTournaments({ tournamentsData: null }))
		}
	}, [dispatch])

	function setCurrentPage(page: number) {
		dispatch(paginationActions.setCurrentPage({ page, key: "userTournaments" }))
	}

	function setSearchField(searchField: string | null) {
		dispatch(
			tournamentActions.setSearchField({
				searchField,
				key: "user",
			})
		)
	}

	function handleDelete() {
		if (!tournaments || !currentUser?.Token) {
			return
		}

		const tournamentsToDelete: DeleteTournamentsPayload = {
			TournamentIds: tournaments
				.filter((tournament) => tournament?.checked)
				.map((tournament) => tournament.ID),
		}

		if (tournamentsToDelete.TournamentIds.length === 0) {
			showToast("Delete error", "No tournaments chosen!")
			return
		}

		dispatch(deleteTournaments({ data: tournamentsToDelete }))
	}

	if (!user || !tournaments) {
		return <Loading />
	}

	return (
		<>
			<Box p={8} pt={16}>
				<ProfileHeader
					gap={16}
					isProfileOwner={isProfileOwner}
					avatarSrc={user?.PhotoURL || UserSvg}
				/>
				<Flex mt={16} align="center" justifyContent={"space-between"}>
					<Heading size="md">
						{isProfileOwner ? "My tournaments" : `${user.Name}'s tournaments`}
					</Heading>
					{isProfileOwner && (
						<Flex gap={4}>
							<Button
								ref={dialogRef}
								colorScheme={"red"}
								onClick={() => onOpen()}
							>
								Delete chosen
							</Button>
							<Button colorScheme={"blue"}>
								<Link to="/user/create">Create new</Link>
							</Button>
						</Flex>
					)}
				</Flex>
				<Box pt={6}>
					<Tournaments isEditable={isProfileOwner} tournaments={tournaments} />
					<Pagination
						currentPage={currentPage}
						lastPage={lastPage}
						maxLength={maxLength}
						setCurrentPage={setCurrentPage}
						searchField={searchField}
						setSearchField={setSearchField}
					/>
				</Box>
			</Box>
			{isProfileOwner && (
				<ConfirmDialog
					isOpen={isOpen}
					onClose={onClose}
					title="Are you sure?"
					description="Do you really want to delete checked tournaments?"
					submitButtonText="Delete"
					submitButtonColorScheme="red"
					destructiveRef={dialogRef}
					onSubmit={handleDelete}
				/>
			)}
		</>
	)
}
