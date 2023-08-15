import { TournamentFormat } from "../../redux/slices/tournament/tournament.types"
import { HStack } from "@chakra-ui/react"
import { useTypedDispatch, useTypedSelector } from "../../redux/store"
import { tournamentActions } from "../../redux/slices/tournament/tournament"
import { useEffect, useState } from "react"
import { endTournament, getContest } from "../../redux/middleware/tournament"
import { LeaderboardPage } from "../../pages"
import { Loading } from "../"
import { AnimatePresence } from "framer-motion"
import { ArenaItem } from "./ArenaItem"

type PropsType = {
	tournamentId: string | undefined
	format: TournamentFormat
}

export enum Choice {
	FIRST = 1,
	SECOND = 2,
}

export function Arena({ tournamentId, format }: PropsType) {
	const dispatch = useTypedDispatch()
	const [hidden, setHidden] = useState<null | Choice>(null)

	function handleChooseButton(choiceToHide: Choice, winnerURL?: string) {
		if (!winnerURL) {
			return
		}
		setHidden(choiceToHide)
		setTimeout(() => {
			setHidden(null)
			dispatch(tournamentActions.contestChoiceMade({ winnerURL }))
		}, 1500)
	}

	const { isContestOver, matchIndex, roundIndex } = useTypedSelector(
		(state) => state.arena.contestProgress
	)

	const currentMatch = useTypedSelector((state) => {
		if (state.arena.contest.Rounds) {
			return state.arena.contest.Rounds[roundIndex].Matches[matchIndex]
		}
		return undefined
	})

	useEffect(() => {
		if (tournamentId) {
			dispatch(getContest({ tournamentId, tournamentFormat: format }))
		}
	}, [dispatch, format, tournamentId])

	useEffect(() => {
		return () => {
			dispatch(
				tournamentActions.setIsContestInProgress({ isContestInProgress: false })
			)
		}
	}, [dispatch])

	if (!currentMatch || !tournamentId) {
		return <Loading />
	}

	if (isContestOver) {
		const winnerURL = currentMatch.firstOptionChosen
			? currentMatch.FirstOption.TiktokURL
			: currentMatch.SecondOption.TiktokURL

		if (!winnerURL) {
			return <Loading />
		}

		dispatch(
			endTournament({
				tournamentId,
				winnerURL,
			})
		)

		return <LeaderboardPage winnerURL={winnerURL} />
	}

	const [firstTikTokURL, secondTikTokURL] = [
		currentMatch.FirstOption.TiktokURL,
		currentMatch.SecondOption.TiktokURL,
	]

	return (
		<HStack justifyContent={"space-evenly"} p={0} pt={2}>
			<AnimatePresence>
				{hidden !== Choice.FIRST && (
					<ArenaItem
						key="first-choice"
						url={firstTikTokURL ?? ""}
						hidden={hidden}
						onClick={() => handleChooseButton(Choice.SECOND, firstTikTokURL)}
						animateDirection="left"
					/>
				)}
				{hidden !== Choice.SECOND && (
					<ArenaItem
						key="second-choice"
						url={secondTikTokURL ?? ""}
						hidden={hidden}
						onClick={() => handleChooseButton(Choice.FIRST, secondTikTokURL)}
						animateDirection="right"
					/>
				)}
			</AnimatePresence>
		</HStack>
	)
}
