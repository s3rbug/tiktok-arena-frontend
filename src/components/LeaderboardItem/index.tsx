import { Badge, Box, Progress, Text, VStack } from "@chakra-ui/react"
import { TikTok } from "../../redux/slices/tournament/tournament.types"

type PropsType = {
	tiktok: TikTok
	winnerURL: string
	timesPlayed: number
}

export const LeaderboardItem = ({
	tiktok,
	winnerURL,
	timesPlayed,
}: PropsType) => {
	function getProgressValue() {
		if (timesPlayed <= 1) {
			return 0
		}
		return (100 * tiktok.Wins) / (timesPlayed - 1)
	}

	const isWinner = tiktok.URL === winnerURL

	return (
		<VStack align={"flex-start"} w={"100%"}>
			<Badge
				fontSize={"xl"}
				colorScheme={"green"}
				fontWeight={isWinner ? "bold" : "normal"}
			>
				{`${Math.round(getProgressValue())}%`}
			</Badge>

			<Text fontWeight={isWinner ? "bold" : "normal"}>{tiktok.Name}</Text>
			<Box w={"100%"}>
				<Progress
					size="lg"
					colorScheme={isWinner ? "facebook" : "blue"}
					value={getProgressValue()}
				/>
			</Box>
		</VStack>
	)
}
