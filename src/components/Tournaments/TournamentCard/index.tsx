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
import { useCardShadow } from "../../../hooks/useCardShadow"
import { tournamentActions } from "../../../redux/slices/tournament/tournament"
import { useTypedDispatch } from "../../../redux/store"
import LogoSvg from "../../../assets/logo.svg"

type PropsType = {
	id: string
	title: string
	editable?: boolean
	checked?: boolean
}

export function TournamentCard({ id, title, editable, checked }: PropsType) {
	const dispatch = useTypedDispatch()

	const { shadowStyleProps } = useCardShadow({
		shadow: {
			default: "md",
			focused: "2xl",
		},
		transitionDuration: ".7s",
	})

	function handleCheckboxChange(event: ChangeEvent<HTMLInputElement>) {
		dispatch(
			tournamentActions.setChecked({
				tournamentId: id,
				checked: event.target.checked,
			})
		)
	}

	return (
		<Card
			maxW="sm"
			borderWidth={2}
			borderColor="gray.300"
			{...shadowStyleProps}
		>
			<CardBody>
				{editable && (
					<Flex justifyContent={"flex-start"} mb={8}>
						<Checkbox
							checked={checked}
							borderColor={"blue.700"}
							size="lg"
							onChange={handleCheckboxChange}
						/>
					</Flex>
				)}
				<Link to={`/tournaments/${id}`}>
					<Image
						transition="ease-out"
						transitionDuration=".5s"
						_hover={{
							transform: "scale(1.05)",
						}}
						src={LogoSvg}
						w={"250px"}
						h="250px"
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
