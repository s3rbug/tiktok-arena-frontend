import { Badge, Box, Progress, Text, VStack } from "@chakra-ui/react"
import { motion } from "framer-motion"
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
		if (timesPlayed <= 0) {
			return 0
		}
		return (100.0 * tiktok.wins) / timesPlayed
	}

	const isWinner = tiktok.url === winnerURL

	return (
		<VStack align={"flex-start"} w={"100%"}>
			<Badge
				as={motion.span}
				initial={{ scale: 0 }}
				animate={{ scale: 1, transition: { duration: 0.75 } }}
				fontSize={"xl"}
				colorScheme={"green"}
				fontWeight={isWinner ? "bold" : "normal"}
			>
				{`${getProgressValue().toFixed(2)}%`}
			</Badge>

			<Text fontWeight={isWinner ? "bold" : "normal"}>{tiktok.name}</Text>
			<Box w={"100%"}>
				<Progress
					as={motion.div}
					initial={{ width: 0 }}
					animate={{
						width: `auto`,
						transition: { duration: 0.5 },
					}}
					style={{ overflow: "hidden" }}
					size="lg"
					colorScheme={isWinner ? "facebook" : "blue"}
					value={getProgressValue()}
				/>
			</Box>
		</VStack>
	)
}
