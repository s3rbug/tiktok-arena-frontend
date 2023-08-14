import { Button, VStack } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { Choice } from ".."
import { TikTokVideo } from "../../TikTokVideo"

type PropsType = {
	url: string
	hidden: Choice | null
	onClick: () => void
	animateDirection: "left" | "right"
}

export function ArenaItem({
	url,
	hidden,
	onClick,
	animateDirection,
}: PropsType) {
	return (
		<VStack
			alignItems="stretch"
			as={motion.div}
			initial={{
				opacity: 0,
				transform: `translateX(${animateDirection === "left" ? "-" : ""}300px)`,
				overflow: "hidden",
			}}
			animate={{ opacity: 1, transform: "translateY(0)" }}
			exit={{
				opacity: 0,
				transform: `translateX(${animateDirection === "left" ? "" : "-"}300px)`,
				overflow: "hidden",
			}}
			layout
		>
			<TikTokVideo minWidth url={url} />
			<Button
				onClick={onClick}
				isDisabled={!!hidden}
				colorScheme={"blue"}
				position={"sticky"}
				bottom={4}
			>
				Choose
			</Button>
		</VStack>
	)
}
