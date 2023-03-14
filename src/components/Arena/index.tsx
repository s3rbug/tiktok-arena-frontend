import {
	ContestType,
	TournamentFormat,
} from "../../redux/slices/tournament.types"
import { TikTokVideo } from "../"
import { Box, Button, CircularProgress, HStack, VStack } from "@chakra-ui/react"
import { useTypedDispatch, useTypedSelector } from "../../redux/store"
import { tournamentActions } from "../../redux/slices/tournament"
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
	}, [])

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
		return (
			<div>
				<TikTokVideo tiktokVideoURL={winnerURL} />
			</div>
		)
	}

	return (
		<HStack justifyContent={"space-evenly"} p={0}>
			<VStack alignItems="stretch">
				<TikTokVideo tiktokVideoURL={firstTikTokURL} />
				<Button
					onClick={handleChooseButton(firstTikTokURL)}
					colorScheme={"linkedin"}
				>
					Обрати
				</Button>
			</VStack>
			<VStack alignItems="stretch">
				<TikTokVideo tiktokVideoURL={secondTikTokURL} />
				<Button
					onClick={handleChooseButton(secondTikTokURL)}
					colorScheme={"linkedin"}
				>
					Обрати
				</Button>
			</VStack>
		</HStack>
	)
}
