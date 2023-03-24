import { FormErrorMessage } from "@chakra-ui/react"

type PropsType = {
	error?: string | null
}

export const FormError = ({ error }: PropsType) => {
	if (!error) {
		return null
	}

	return <FormErrorMessage>{error}</FormErrorMessage>
}
