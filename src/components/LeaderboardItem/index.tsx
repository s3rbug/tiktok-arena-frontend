import { Box, Progress, Text, VStack } from "@chakra-ui/react"
import { TikTok } from "../../redux/slices/tournament/tournament.types"

type PropsType = {
	tiktok: TikTok
	winnerURL: string
}

export const LeaderboardItem = ({ tiktok, winnerURL }: PropsType) => {
	const isWinner = tiktok.URL === winnerURL

	return (
		<VStack align={"flex-start"} w={"100%"} maxWidth="600px">
			<Text fontWeight={isWinner ? "bold" : "normal"}>{tiktok.URL}</Text>
			<Box w={"100%"}>
				<Progress
					size="lg"
					colorScheme={isWinner ? "facebook" : "blue"}
					value={(100 * tiktok.wins) / tiktok.TimesPlayed}
				/>
			</Box>
		</VStack>
	)
}
