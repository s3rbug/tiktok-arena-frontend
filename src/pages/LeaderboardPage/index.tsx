import { Flex, Text, VStack } from "@chakra-ui/react"
import { TikTokVideo } from "../../components"
import { LeaderboardItem } from "../../components/LeaderboardItem"
import { TikTok } from "../../redux/slices/tournament/tournament.types"

type PropsType = {
	tournamentId: string
	winnerURL: string
}

export const LeaderboardPage = ({ tournamentId, winnerURL }: PropsType) => {
	const tiktoks: TikTok[] = [
		{
			TournamentID: "id1",
			URL: "url1",
			wins: 25,
			AvgPoints: 10,
			TimesPlayed: 100,
		},
		{
			TournamentID: "id2",
			URL: "url2",
			wins: 40,
			AvgPoints: 10,
			TimesPlayed: 100,
		},
		{
			TournamentID: "id3",
			URL: "url3",
			wins: 10,
			AvgPoints: 10,
			TimesPlayed: 100,
		},
		{
			TournamentID: "id4",
			URL: "url4",
			wins: 20,
			AvgPoints: 10,
			TimesPlayed: 100,
		},
		{
			TournamentID: "id5",
			URL: "https://www.tiktok.com/@sr_fiot/video/7210021412008971525",
			wins: 5,
			AvgPoints: 10,
			TimesPlayed: 100,
		},
	]
	return (
		<Flex px={8} pt={8} gap={8} justifyContent="space-evenly">
			<VStack justifyContent={"center"}>
				<Text>Your winner</Text>
				<TikTokVideo url={winnerURL} />
			</VStack>
			<VStack gap={2}>
				<Text>Other people choice:</Text>
				{tiktoks
					.sort((tiktok1, tiktok2) => tiktok2.wins - tiktok1.wins)
					.map((tiktok) => {
						return (
							<LeaderboardItem
								key={tiktok.URL}
								winnerURL={winnerURL}
								tiktok={tiktok}
							/>
						)
					})}
			</VStack>
		</Flex>
	)
}
