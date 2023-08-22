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
import { Control, Controller, FieldError, UseFormWatch } from "react-hook-form"
import { FormInputType } from ".."
import { useTranslation } from "react-i18next"

type PropsType = {
	error?: FieldError
	control: Control<FormInputType>
	minLength: number
	maxLength: number
	changeFocus: (newFocus: boolean) => () => void
	clearAuthError: () => void
	title: string
	name: keyof FormInputType
	isPassword?: boolean
	watch?: UseFormWatch<FormInputType>
	tabIndex?: {
		input: number
		button?: number
	}
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
	tabIndex,
}: PropsType) => {
	const [isPasswordHidden, setIsPasswordHidden] = useState(true)

	const { t } = useTranslation()

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
						required: t("form-message.required", { field: title }),
						minLength: {
							value: minLength,
							message: t("form-message.min-length", {
								field: title,
								minLength,
							}),
						},
						maxLength: {
							value: maxLength,
							message: t("form-message.max-length", {
								field: title,
								maxLength,
							}),
						},
						validate:
							name === "confirmPassword"
								? {
										checkIfPasswordsMatch: (value) => {
											if (watch && value !== watch("password")) {
												return t("form-message.passwords-dont-match")
											}
										},
								  }
								: {},
					}}
					render={({ field }) => (
						<Input
							{...field}
							tabIndex={tabIndex?.input}
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
						tabIndex={tabIndex?.button}
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
