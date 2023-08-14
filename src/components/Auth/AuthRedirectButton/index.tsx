import { Button, Flex } from "@chakra-ui/react"

type PropsType = {
	handleClick: () => void
	title: string
	tabIndex?: number
}

export const AuthRedirectButton = ({
	title,
	handleClick,
	tabIndex,
}: PropsType) => {
	return (
		<Flex justify={"center"} mt={4} tabIndex={tabIndex}>
			<Button onClick={handleClick} variant="link" colorScheme={"blue"}>
				{title}
			</Button>
		</Flex>
	)
}
