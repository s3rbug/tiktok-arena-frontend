import { Flex, Heading } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { useTypedSelector } from "../../../redux/store"

export function ContestDetails() {
	const { matchIndex, roundIndex } = useTypedSelector(
		(state) => state.arena.contestProgress
	)

	const matchesInRound = useTypedSelector(
		(state) => state.arena.contest.Rounds?.[roundIndex].Matches.length
	)

	if (!matchesInRound) {
		return null
	}

	return (
		<Flex
			as={motion.div}
			initial={{ transform: "translateY(-50px)", opacity: 0 }}
			animate={{ transform: "translateY(0)", opacity: 1 }}
			gap={4}
		>
			<Heading fontSize={"3xl"}>{`Round ${roundIndex + 1}:`}</Heading>
			<Heading fontSize={"3xl"} fontWeight={"normal"}>{`${
				matchIndex + 1
			} / ${matchesInRound}`}</Heading>
		</Flex>
	)
}
