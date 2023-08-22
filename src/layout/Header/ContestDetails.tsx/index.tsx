import { Flex, Heading } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { useTypedSelector } from "../../../redux/store"
import { useTranslation } from "react-i18next"

export function ContestDetails() {
	const { t } = useTranslation()

	const { matchIndex, roundIndex } = useTypedSelector(
		(state) => state.contest.contestProgress
	)
	const matchesInRound = useTypedSelector(
		(state) => state.contest.currentContest.rounds?.[roundIndex].matches.length
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
			<Heading fontSize={"3xl"} textColor="blue.600">
				{`${t("tournament.round")} ${roundIndex + 1}:`}
			</Heading>
			<Heading fontSize={"3xl"} fontWeight={"normal"}>
				{`${matchIndex + 1} / ${matchesInRound}`}
			</Heading>
		</Flex>
	)
}
