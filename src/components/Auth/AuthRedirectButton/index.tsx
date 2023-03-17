import { Button, Flex } from "@chakra-ui/react"

type PropsType = {
	handleClick: () => void
	title: string
}

export const AuthRedirectButton = ({ title, handleClick }: PropsType) => {
	return (
		<Flex justify={"center"} mt={4}>
			<Button onClick={handleClick} variant="link" colorScheme={"blue"}>
				{title}
			</Button>
		</Flex>
	)
}
