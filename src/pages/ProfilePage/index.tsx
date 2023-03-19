import {
	Avatar,
	Box,
	Button,
	CircularProgress,
	Flex,
	Heading,
	Text,
	useToast,
} from "@chakra-ui/react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { DeleteTournamentsPayload } from "../../api/tournament"
import { Tournaments } from "../../components"
import { useAuth } from "../../hooks/useAuth"
import {
	deleteTournaments,
	getUserTournaments,
} from "../../redux/middleware/tournament"
import { useTypedDispatch, useTypedSelector } from "../../redux/store"

export function ProfilePage() {
	const dispatch = useTypedDispatch()

	const user = useAuth()

	const toast = useToast()

	const tournaments = useTypedSelector((state) => state.arena.userTournaments)

	useEffect(() => {
		if (user?.token) {
			dispatch(getUserTournaments(user.token))
		}
	}, [dispatch, user?.token])

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

		dispatch(deleteTournaments(tournamentsToDelete, user.token))
	}

	if (!user || !tournaments) {
		return <CircularProgress isIndeterminate />
	}

	return (
		<Box p={8} pt={16}>
			<Flex gap={16}>
				<Avatar
					h={"100%"}
					w={"250px"}
					src="https://bit.ly/kent-c-dodds"
				></Avatar>
				<Flex flexDirection={"column"} gap={2}>
					<Text fontSize={"lg"}>
						Name: <b>{user?.name}</b>
					</Text>
					<Text fontSize={"lg"}>
						Tournament count: <b>{tournaments?.length}</b>
					</Text>
				</Flex>
			</Flex>
			<Flex mt={16} align="center" justifyContent={"space-between"}>
				<Heading size="md">My tournaments</Heading>
				<Flex gap={4}>
					<Button colorScheme={"red"} onClick={handleDelete}>
						Delete chosen
					</Button>
					<Button colorScheme={"blue"}>
						<Link to="/user/create">Create new</Link>
					</Button>
				</Flex>
			</Flex>
			<Box pt={6}>
				<Tournaments editable tournaments={tournaments} />
			</Box>
		</Box>
	)
}
