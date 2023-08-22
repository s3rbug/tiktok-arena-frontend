import { Flex, Text, VStack } from "@chakra-ui/react"
import { useEffect } from "react"
import { Loading, TikTokVideo } from "../../components"
import { LeaderboardItem } from "../../components/LeaderboardItem"
import { contestActions } from "../../redux/slices/contest/contest"
import { useTypedDispatch, useTypedSelector } from "../../redux/store"
import { useTranslation } from "react-i18next"

type PropsType = {
	winnerURL: string
}

export const LeaderboardPage = ({ winnerURL }: PropsType) => {
	const dispatch = useTypedDispatch()
	const { t } = useTranslation()

	const tournament = useTypedSelector(
		(state) => state.arena.tournamentData?.tournament
	)
	const tiktoks = useTypedSelector((state) => state.arena.tiktoks)

	useEffect(() => {
		return () => {
			dispatch(contestActions.resetContestProgress())
		}
	}, [dispatch])

	if (!tiktoks || !tournament) {
		return <Loading />
	}

	return (
		<Flex px={8} pt={8} gap={16} justifyContent="stretch">
			<VStack justifyContent={"center"}>
				<Text fontSize={"2xl"} textShadow={".1em .1em 0 hsl(200 50% 30%)"}>
					{t("tournament.your-winner")}
				</Text>
				<TikTokVideo url={winnerURL} />
			</VStack>
			<VStack gap={2} flexGrow={1}>
				<Text fontSize={"2xl"}>{t("tournament.leaderboard")}</Text>
				{[...tiktoks]
					.sort((tiktok1, tiktok2) => tiktok2.wins - tiktok1.wins)
					.map((tiktok) => {
						return (
							<LeaderboardItem
								timesPlayed={tournament.timesPlayed}
								key={tiktok.url}
								winnerURL={winnerURL}
								tiktok={tiktok}
							/>
						)
					})}
			</VStack>
		</Flex>
	)
}
