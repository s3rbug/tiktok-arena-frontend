import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import {
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	IconButton,
	Input,
} from "@chakra-ui/react"
import { useState } from "react"
import { Control, Controller, FieldError } from "react-hook-form"
import { FormInputType } from ".."

type PropsType = {
	error?: FieldError
	control: Control<FormInputType, any>
	minLength: number
	maxLength: number
	changeFocus: (newFocus: boolean) => () => void
	clearAuthError: () => void
	title: string
	name: keyof FormInputType
	isPassword?: boolean
	watch?: any
}

export const AuthInput = ({
	error,
	control,
	minLength,
	maxLength,
	changeFocus,
	clearAuthError,
	title,
	name,
	isPassword,
	watch,
}: PropsType) => {
	const [isPasswordHidden, setIsPasswordHidden] = useState(true)

	const togglePasswordHidden = () => {
		setIsPasswordHidden(!isPasswordHidden)
	}

	const getInputType = (): "password" | "text" => {
		if (!isPassword) {
			return "text"
		}

		return isPasswordHidden ? "password" : "text"
	}

	return (
		<FormControl isRequired isInvalid={!!error} mb={8}>
			<FormLabel>{title}</FormLabel>
			<Flex>
				<Controller
					name={name}
					control={control}
					rules={{
						required: `${title} is required`,
						minLength: {
							value: minLength,
							message: `Minimum ${title.toLowerCase()} length is ${minLength}`,
						},
						maxLength: {
							value: maxLength,
							message: `Maximum ${title.toLowerCase()} length is ${maxLength}`,
						},
						validate:
							name === "confirmPassword"
								? {
										checkIfPasswordsMatch: (value) => {
											if (value !== watch("password")) {
												return "Passwords do not match!"
											}
										},
								  }
								: {},
					}}
					render={({ field }) => (
						<Input
							{...field}
							type={getInputType()}
							onBlur={changeFocus(false)}
							onFocus={changeFocus(true)}
							onChange={(e) => {
								clearAuthError()

								return field.onChange(e)
							}}
						/>
					)}
				/>
				{isPassword && (
					<IconButton
						aria-label="view icon"
						icon={isPasswordHidden ? <ViewOffIcon /> : <ViewIcon />}
						onClick={togglePasswordHidden}
					/>
				)}
			</Flex>
			<FormErrorMessage>{error?.message}</FormErrorMessage>
		</FormControl>
	)
}
