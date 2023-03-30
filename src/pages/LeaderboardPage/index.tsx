import { Flex, Text, VStack } from "@chakra-ui/react"
import { useEffect } from "react"
import { Loading, TikTokVideo } from "../../components"
import { LeaderboardItem } from "../../components/LeaderboardItem"
import { getTikToks, getTournament } from "../../redux/middleware/tournament"
import { useTypedDispatch, useTypedSelector } from "../../redux/store"

type PropsType = {
	tournamentId: string
	winnerURL: string
}

export const LeaderboardPage = ({ tournamentId, winnerURL }: PropsType) => {
	const dispatch = useTypedDispatch()

	const tournament = useTypedSelector((state) => state.arena.tournament)

	const tiktoks = useTypedSelector((state) => state.arena.tiktoks)

	useEffect(() => {
		dispatch(getTikToks({ data: { tournamentId } }))
		dispatch(getTournament({ tournamentId }))
	}, [dispatch, tournamentId])

	if (!tiktoks || !tournament) {
		return <Loading />
	}

	return (
		<Flex px={8} pt={8} gap={16} justifyContent="stretch">
			<VStack justifyContent={"center"}>
				<Text fontSize={"2xl"}>Your winner</Text>
				<TikTokVideo url={winnerURL} />
			</VStack>
			<VStack gap={2} flexGrow={1}>
				<Text fontSize={"2xl"}>Leaderboard</Text>
				{[...tiktoks]
					.sort((tiktok1, tiktok2) => tiktok2.Wins - tiktok1.Wins)
					.map((tiktok) => {
						return (
							<LeaderboardItem
								timesPlayed={tournament.TimesPlayed}
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
