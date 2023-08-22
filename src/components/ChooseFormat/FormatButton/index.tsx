import { QuestionOutlineIcon } from "@chakra-ui/icons"
import { Box, Button, Tooltip } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { ReactNode } from "react"
import { TournamentFormat } from "../../../redux/slices/tournament/tournament.types"
import { useTranslation } from "react-i18next"

type PropsType = {
	format: TournamentFormat
	setFormat: (format: TournamentFormat) => void
	animationDirection: "right" | "left"
	children: ReactNode
}

export function FormatButton({
	setFormat,
	format,
	animationDirection,
	children,
}: PropsType) {
	const { t } = useTranslation()

	const FORMAT_EXPLANATION = {
		[TournamentFormat.SINGLE_ELIMINATION]: t(
			"tournament-formats.standart.description"
		),
		[TournamentFormat.KING_OF_THE_HILL]: t(
			"tournament-formats.king-of-the-hill.description"
		),
	}

	return (
		<Button
			as={motion.button}
			initial={{
				opacity: 0,
				transform: `translateX(${
					animationDirection === "left" ? "-" : ""
				}100px)`,
			}}
			animate={{
				opacity: 1,
				transform: "translateX(0)",
				transition: { duration: 0.5 },
			}}
			onClick={() => {
				setFormat(format)
			}}
			colorScheme={"blue"}
		>
			<Box mr={2}>{children}</Box>
			<Tooltip
				label={FORMAT_EXPLANATION[format]}
				ml={2}
				hasArrow
				placement="right-end"
			>
				<QuestionOutlineIcon boxSize={5} />
			</Tooltip>
		</Button>
	)
}
