import {
	Box,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	Heading,
} from "@chakra-ui/react"
import { useForm, SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useTypedDispatch, useTypedSelector } from "../../redux/store"
import { uiActions } from "../../redux/slices/ui/ui"
import { AuthInput } from "./AuthInput"
import { AuthRedirectButton } from "./AuthRedirectButton"
import { useCardShadow } from "../../hooks/useCardShadow"

export type FormInputType = {
	name: string
	password: string
	confirmPassword?: string
}

type PropsType = {
	title: string
	onSubmit: SubmitHandler<FormInputType>
	isRegister?: boolean
}

export function Auth({ onSubmit, title, isRegister }: PropsType) {
	const [usernameMinLength, usernameMaxLength] = [4, 16]
	const [passwordMinLength, passwordMaxLength] = [5, 16]

	const { setFocus, shadowStyleProps } = useCardShadow({
		shadow: {
			default: "lg",
			focused: "2xl",
		},
	})

	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: "",
			password: "",
			confirmPassword: "",
		} as FormInputType,
	})

	const uiErrors = useTypedSelector((state) => state.ui.errors)
	const authErrorMessage: string | null | undefined = isRegister
		? uiErrors?.register
		: uiErrors?.login

	const dispatch = useTypedDispatch()
	const navigate = useNavigate()

	const clearAuthError = () => {
		if (isRegister && authErrorMessage) {
			dispatch(uiActions.setError({ errors: { register: null } }))
		} else {
			dispatch(uiActions.setError({ errors: { login: null } }))
		}
	}

	const handleRegisterButton = () => {
		navigate("/register")
	}

	const handleLoginButton = () => {
		navigate("/login")
	}

	const changeFocus = (newFocus: boolean) => {
		return () => {
			setFocus(newFocus)
		}
	}

	return (
		<Flex width="full" align={"center"} justifyContent="center" mt={8}>
			<Box borderWidth={2} borderRadius={8} {...shadowStyleProps}>
				<Box textAlign="center" py={6}>
					<Heading size={"xl"}>{title}</Heading>
				</Box>
				<Box as="form" p={8} onSubmit={handleSubmit(onSubmit)}>
					<AuthInput
						title="Username"
						name="name"
						changeFocus={changeFocus}
						clearAuthError={clearAuthError}
						control={control}
						maxLength={usernameMaxLength}
						minLength={usernameMinLength}
						error={errors?.name}
					/>
					<AuthInput
						title="Password"
						name="password"
						changeFocus={changeFocus}
						clearAuthError={clearAuthError}
						control={control}
						maxLength={passwordMaxLength}
						minLength={passwordMinLength}
						error={errors?.password}
						isPassword
					/>
					{isRegister && (
						<AuthInput
							title="Confirm password"
							name="confirmPassword"
							changeFocus={changeFocus}
							clearAuthError={clearAuthError}
							control={control}
							maxLength={passwordMaxLength}
							minLength={passwordMinLength}
							error={errors?.confirmPassword}
							watch={watch}
							isPassword
						/>
					)}
					<FormControl isInvalid={!!authErrorMessage}>
						<FormErrorMessage>{authErrorMessage}</FormErrorMessage>
						<Button width="full" mt={6} type="submit" colorScheme={"blue"}>
							{title}
						</Button>
					</FormControl>
					{isRegister ? (
						<AuthRedirectButton handleClick={handleLoginButton} title="Login" />
					) : (
						<AuthRedirectButton
							handleClick={handleRegisterButton}
							title="Register"
						/>
					)}
				</Box>
			</Box>
		</Flex>
	)
}
