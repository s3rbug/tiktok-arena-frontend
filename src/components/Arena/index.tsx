import { TournamentFormat } from "../../redux/slices/tournament/tournament.types"
import { HStack } from "@chakra-ui/react"
import { useTypedDispatch, useTypedSelector } from "../../redux/store"
import { useEffect, useState } from "react"
import { endContest, getContest } from "../../redux/middleware/contest"
import { LeaderboardPage } from "../../pages"
import { Loading } from "../"
import { AnimatePresence } from "framer-motion"
import { ArenaItem } from "./ArenaItem"
import { contestActions } from "../../redux/slices/contest/contest"

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

	useEffect(() => {
		if (tournamentId) {
			dispatch(getContest({ tournamentId, tournamentFormat: format }))
		}
	}, [dispatch, format, tournamentId])

	useEffect(() => {
		return () => {
			dispatch(
				contestActions.setIsContestInProgress({ isContestInProgress: false })
			)
		}
	}, [dispatch])

	function handleChooseButton(choiceToHide: Choice, winnerURL?: string) {
		if (!winnerURL) {
			return
		}
		setHidden(choiceToHide)
		setTimeout(() => {
			setHidden(null)
			dispatch(contestActions.contestChoiceMade({ winnerURL }))
		}, 1500)
	}

	const { isContestOver, matchIndex, roundIndex } = useTypedSelector(
		(state) => state.contest.contestProgress
	)

	const currentMatch = useTypedSelector((state) => {
		if (state.contest.currentContest.rounds) {
			return state.contest.currentContest.rounds[roundIndex].matches[matchIndex]
		}
		return undefined
	})

	if (!currentMatch || !tournamentId) {
		return <Loading />
	}

	const [firstTikTokURL, secondTikTokURL] = [
		currentMatch.firstOption.tiktokURL,
		currentMatch.secondOption.tiktokURL,
	]

	if (isContestOver) {
		const winnerURL = currentMatch.firstOptionChosen
			? currentMatch.firstOption.tiktokURL
			: currentMatch.secondOption.tiktokURL

		if (!winnerURL) {
			return <Loading />
		}

		dispatch(
			endContest({
				tournamentId,
				winnerURL,
			})
		)

		return <LeaderboardPage winnerURL={winnerURL} />
	}

	return (
		<HStack
			justifyContent={"space-evenly"}
			p={0}
			pt={2}
			flexDirection={{ lg: "row", sm: "column" }}
		>
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
