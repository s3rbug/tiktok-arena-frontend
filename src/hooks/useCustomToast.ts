import { useToast } from "@chakra-ui/react"

export const useCustomToast = () => {
	const toast = useToast()

	function showToast(title: string, description: string) {
		toast({
			title,
			description,
			status: "warning",
			duration: 2500,
			isClosable: true,
			position: "bottom-right",
		})
	}

	return { showToast }
}
