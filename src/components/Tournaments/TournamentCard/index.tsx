import { EditIcon } from "@chakra-ui/icons"
import {
	Card,
	CardBody,
	Checkbox,
	Flex,
	Heading,
	Image,
	Stack,
	Text,
} from "@chakra-ui/react"
import { ChangeEvent } from "react"
import { Link } from "react-router-dom"
import { tournamentActions } from "../../../redux/slices/tournament/tournament"
import { useTypedDispatch } from "../../../redux/store"

type PropsType = {
	id: string
	title: string
	editable?: boolean
	checked?: boolean
}

export function TournamentCard({ id, title, editable, checked }: PropsType) {
	const dispatch = useTypedDispatch()

	function handleCheckboxChange(event: ChangeEvent<HTMLInputElement>) {
		console.log(event.target.checked)
		dispatch(
			tournamentActions.setChecked({
				tournamentId: id,
				checked: event.target.checked,
			})
		)
	}

	return (
		<Card maxW="sm" outline={"2px solid grey"}>
			<CardBody>
				{editable && (
					<Flex justifyContent={"flex-start"} mb={8}>
						<Checkbox
							checked={checked}
							borderColor={"blue.700"}
							size="lg"
							onChange={handleCheckboxChange}
						></Checkbox>
					</Flex>
				)}
				<Link to={`/tournaments/${id}`}>
					<Image
						transition="ease-out"
						transitionDuration=".5s"
						_hover={{
							transform: "scale(1.05)",
						}}
						src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
						alt="Tournament card"
						borderRadius="lg"
					/>
				</Link>

				<Stack mt={3}>
					<Heading size="md">
						<Flex justifyContent={"center"} gap={2} align="top">
							<Link to={`/tournaments/${id}`}>
								<Text fontSize="lg">{title}</Text>
							</Link>
							{editable && (
								<Link to={`/tournaments/${id}/edit`}>
									<EditIcon
										color="blue.800"
										mb={1}
										boxSize={"5"}
										transitionDuration={".4s"}
										transitionTimingFunction="ease-in-out"
										_hover={{ color: "blue.500" }}
									/>
								</Link>
							)}
						</Flex>
					</Heading>
				</Stack>
			</CardBody>
		</Card>
	)
}
