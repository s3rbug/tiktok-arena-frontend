import { QuestionOutlineIcon } from "@chakra-ui/icons"
import { Box, Button, Tooltip } from "@chakra-ui/react"
import { ReactNode } from "react"
import { TournamentFormat } from "../../../redux/slices/tournament/tournament.types"

type PropsType = {
	format: TournamentFormat
	setFormat: (format: TournamentFormat) => void
	children: ReactNode
}

export function FormatButton({ setFormat, format, children }: PropsType) {
	const typesExplanation = {
		[TournamentFormat.SINGLE_ELIMINATION]:
			"Each match-up is immediately eliminated from the tournament. Each winner will play another in the next round, until the final match-up, whose winner becomes the tournament champion",
		[TournamentFormat.KING_OF_THE_HILL]:
			"Winner plays in the next match against a new opponent. The loser is out of the tournament.",
	}

	return (
		<Button
			onClick={() => {
				setFormat(format)
			}}
			colorScheme={"blue"}
		>
			<Box mr={2}>{children}</Box>
			<Tooltip
				label={typesExplanation[format]}
				ml={2}
				hasArrow
				placement="right-end"
			>
				<QuestionOutlineIcon boxSize={5} />
			</Tooltip>
		</Button>
	)
}
