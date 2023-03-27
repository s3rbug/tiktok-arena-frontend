import {
	Avatar,
	Box,
	Button,
	Flex,
	Heading,
	Text,
	useDisclosure,
	useToast,
} from "@chakra-ui/react"
import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { DeleteTournamentsPayload } from "../../api/tournament"
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

export function ProfilePage() {
	const dispatch = useTypedDispatch()

	const { isOpen, onOpen, onClose } = useDisclosure()

	const user = useAuth()

	const toast = useToast()

	const dialogRef = useRef(null)

	const tournaments = useTypedSelector((state) => state.arena.userTournaments)
	const searchField = useTypedSelector((state) => state.arena.search.user)

	const { currentPage, lastPage, maxLength, pageSize, total } =
		useTypedSelector((state) => state.pagination.userTournaments)

	useEffect(() => {
		if (user?.token && currentPage && pageSize) {
			dispatch(
				getUserTournaments({ page: currentPage, pageSize, search: searchField })
			)
		}
	}, [dispatch, user?.token, currentPage, pageSize, searchField])

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

	function showDeleteDialog() {
		onOpen()
	}

	function handleDelete() {
		if (!tournaments || !user?.token) {
			return
		}

		const tournamentsToDelete: DeleteTournamentsPayload = {
			TournamentIds: tournaments
				.filter((tournament) => tournament?.checked)
				.map((tournament) => tournament.ID),
		}

		if (tournamentsToDelete.TournamentIds.length === 0) {
			toast({
				title: "Delete error",
				description: "No tournaments chosen!",
				status: "error",
				position: "bottom-right",
				duration: 2500,
				isClosable: true,
			})
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
				<Flex gap={16}>
					<Avatar h={"100%"} w={"250px"} src="https://bit.ly/kent-c-dodds" />
					<Flex flexDirection={"column"} gap={2}>
						<Text fontSize={"lg"}>
							Name: <b>{user?.name}</b>
						</Text>
						<Text fontSize={"lg"}>
							Tournament count: <b>{total}</b>
						</Text>
					</Flex>
				</Flex>
				<Flex mt={16} align="center" justifyContent={"space-between"}>
					<Heading size="md">My tournaments</Heading>
					<Flex gap={4}>
						<Button
							ref={dialogRef}
							colorScheme={"red"}
							onClick={showDeleteDialog}
						>
							Delete chosen
						</Button>
						<Button colorScheme={"blue"}>
							<Link to="/user/create">Create new</Link>
						</Button>
					</Flex>
				</Flex>
				<Box pt={6}>
					<Tournaments editable tournaments={tournaments} />
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
		</>
	)
}
