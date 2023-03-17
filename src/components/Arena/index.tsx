import { TournamentFormat } from "../../redux/slices/tournament/tournament.types"
import { TikTokVideo } from "../"
import { Button, CircularProgress, HStack, VStack } from "@chakra-ui/react"
import { useTypedDispatch, useTypedSelector } from "../../redux/store"
import { tournamentActions } from "../../redux/slices/tournament/tournament"
import { useEffect } from "react"
import { getContest } from "../../redux/middleware/tournament"

type PropsType = {
	tournamentId: string | undefined
	format: TournamentFormat
}

export function Arena({ tournamentId, format }: PropsType) {
	const dispatch = useTypedDispatch()

	useEffect(() => {
		if (tournamentId) {
			dispatch(getContest({ tournamentId, tounamentFormat: format }))
		}
	}, [dispatch, format, tournamentId])

	const contestProgress = useTypedSelector(
		(state) => state.arena.contestProgress
	)
	const { isContestOver, matchIndex, roundIndex } = contestProgress

	const currentMatch = useTypedSelector((state) => {
		if (state.arena.contest.Rounds) {
			return state.arena.contest.Rounds[roundIndex].Matches[matchIndex]
		}
		return undefined
	})

	if (!currentMatch) {
		return (
			<HStack justifyContent="center">
				<CircularProgress isIndeterminate color="blue.300" />
			</HStack>
		)
	}

	const [firstTikTokURL, secondTikTokURL] = [
		currentMatch.FirstOption.TiktokURL,
		currentMatch.SecondOption.TiktokURL,
	]

	function handleChooseButton(winnerURL?: string) {
		return () => {
			if (winnerURL) {
				dispatch(tournamentActions.contestChoiceMade({ winnerURL }))
			}
		}
	}

	if (isContestOver) {
		const winnerURL = currentMatch.firstOptionChosen
			? currentMatch.FirstOption.TiktokURL
			: currentMatch.SecondOption.TiktokURL
		return <TikTokVideo url={winnerURL} />
	}

	return (
		<HStack justifyContent={"space-evenly"} p={0}>
			<VStack alignItems="stretch">
				<TikTokVideo minWidth url={firstTikTokURL} />
				<Button
					onClick={handleChooseButton(firstTikTokURL)}
					colorScheme={"blue"}
				>
					Обрати
				</Button>
			</VStack>
			<VStack alignItems="stretch">
				<TikTokVideo minWidth url={secondTikTokURL} />
				<Button
					onClick={handleChooseButton(secondTikTokURL)}
					colorScheme={"blue"}
				>
					Обрати
				</Button>
			</VStack>
		</HStack>
	)
}
