import { Box, HStack } from "@chakra-ui/react"

export function Filters() {
	return (
		<HStack
			alignItems={"center"}
			justifyContent={"space-between"}
			bgColor={"pink"}
			marginBottom={4}
		>
			<Box>Filter 1</Box>
			<Box>Filter 2</Box>
			<Box>Filter 3</Box>
			<Box>Filter 4</Box>
			<Box>Filter 5</Box>
		</HStack>
	)
}
