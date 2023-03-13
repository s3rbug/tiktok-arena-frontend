import { TournamentFormat } from "../../redux/slices/tournament.types"
import { TikTokVideo } from "../"
import { Box, Button, HStack, VStack } from "@chakra-ui/react"
import { useTypedDispatch, useTypedSelector } from "../../redux/store"
import { tournamentActions } from "../../redux/slices/tournament"

type PropsType = {
	tournamentId: string | undefined
	format: TournamentFormat
}

export function Arena({}: PropsType) {
	const dispatch = useTypedDispatch()
	const contestProgress = useTypedSelector(
		(state) => state.arena.contestProgress
	)
	const { isContestOver, matchIndex, roundIndex } = contestProgress
	const currentMatch = useTypedSelector(
		(state) => state.arena.contest.Rounds[roundIndex].Matches[matchIndex]
	)
	const firstTikTokURL = currentMatch.FirstOption.TikTokURL
	const secondTikTokURL = currentMatch.SecondOption.TikTokURL

	console.log({ matchIndex, roundIndex })

	function handleChooseButton(winnerURL?: string) {
		return () => {
			if (winnerURL) {
				dispatch(tournamentActions.contestChoiceMade({ winnerURL }))
			}
		}
	}

	if (isContestOver) {
		return (
			<div>
				{"Contest is over! Winner is "}
				{currentMatch.firstOptionChosen
					? currentMatch.FirstOption.TikTokURL
					: currentMatch.SecondOption.TikTokURL}
			</div>
		)
	}

	return (
		<HStack justifyContent={"space-evenly"}>
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
