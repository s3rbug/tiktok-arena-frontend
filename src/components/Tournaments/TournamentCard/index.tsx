import { Card, CardBody, Heading, Image, Stack } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

type PropsType = {
	id: string
	title: string
}

export function TournamentCard({ id, title }: PropsType) {
	const navigate = useNavigate()
	function handleClick() {
		navigate(`/tournaments/${id}`)
	}
	return (
		<Card maxW="sm" outline={"2px solid grey"} onClick={handleClick}>
			<CardBody>
				<Image
					cursor="pointer"
					transition="ease-out"
					transitionDuration=".5s"
					_hover={{
						transform: "scale(1.05);",
					}}
					src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
					alt="Tournament card"
					borderRadius="lg"
				/>
				<Stack mt={3}>
					<Heading textAlign={"center"} size="md">
						{title}
					</Heading>
				</Stack>
			</CardBody>
		</Card>
	)
}
