import { CircularProgress, Text, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { loadingMessages } from "../../utils/loadingMessages/loadingMessages"
import { randomArrayItem } from "../../utils/randomArrayItem/randomArrayItem"

export const Loading = () => {
	const [text, setText] = useState(randomArrayItem(loadingMessages))

	useEffect(() => {
		const interval = setInterval(
			() => setText(randomArrayItem(loadingMessages)),
			2000
		)
		return () => clearInterval(interval)
	}, [])

	return (
		<VStack mt={8} gap={4} justifyContent="center">
			<CircularProgress isIndeterminate color="blue.300" />
			<Text fontSize={"xl"}>{text}</Text>
		</VStack>
	)
}
