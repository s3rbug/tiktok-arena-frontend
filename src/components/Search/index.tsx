import { HStack, Input, Button } from "@chakra-ui/react"
import { Search2Icon } from "@chakra-ui/icons"

export function Search() {
	return (
		<HStack alignItems="center">
			<Input
				borderColor={"blue.300"}
				variant="flushed"
				placeholder="Пошук турніру"
			/>
			<Button colorScheme="telegram">
				<Search2Icon />
			</Button>
		</HStack>
	)
}
