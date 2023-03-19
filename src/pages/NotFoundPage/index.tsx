import { Flex, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"

export function NotFoundPage() {
	return (
		<Flex justifyContent={"center"} p={8}>
			<Text fontSize={"2xl"}>
				Page not found{" "}
				<Link
					target="_blank"
					rel="noopener noreferrer"
					to={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
				>
					💀
				</Link>
			</Text>
		</Flex>
	)
}
