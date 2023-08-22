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
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"

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

const [usernameMinLength, usernameMaxLength] = [4, 16]
const [passwordMinLength, passwordMaxLength] = [5, 16]

const tabIndex = {
	USER: 1,
	PASSWORD: 2,
	CONFIRM_PASSWORD: 3,
	HIDE_PASSWORD_BTN: 4,
	HIDE_CONFIRM_PASSWORD_BTN: 5,
	SUBMIT: 6,
	REDIRECT: 7,
}

export function Auth({ onSubmit, title, isRegister }: PropsType) {
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
	const { t } = useTranslation()

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
		<Flex
			as={motion.div}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { duration: 0.5 } }}
			width="full"
			align="center"
			justifyContent="center"
			mt={8}
		>
			<Box borderWidth={2} borderRadius={8} {...shadowStyleProps}>
				<Box textAlign="center" py={6}>
					<Heading size={"xl"}>{title}</Heading>
				</Box>
				<Box as="form" p={8} onSubmit={handleSubmit(onSubmit)}>
					<AuthInput
						title={t("auth.username")}
						name="name"
						changeFocus={changeFocus}
						clearAuthError={clearAuthError}
						control={control}
						maxLength={usernameMaxLength}
						minLength={usernameMinLength}
						error={errors?.name}
						tabIndex={{ input: tabIndex.USER }}
					/>
					<AuthInput
						title={t("auth.password")}
						name="password"
						changeFocus={changeFocus}
						clearAuthError={clearAuthError}
						control={control}
						maxLength={passwordMaxLength}
						minLength={passwordMinLength}
						error={errors?.password}
						tabIndex={{
							input: tabIndex.PASSWORD,
							button: tabIndex.HIDE_PASSWORD_BTN,
						}}
						isPassword
					/>
					{isRegister && (
						<AuthInput
							title={t("auth.confirm-password")}
							name="confirmPassword"
							changeFocus={changeFocus}
							clearAuthError={clearAuthError}
							control={control}
							maxLength={passwordMaxLength}
							minLength={passwordMinLength}
							error={errors?.confirmPassword}
							watch={watch}
							tabIndex={{
								input: tabIndex.CONFIRM_PASSWORD,
								button: tabIndex.HIDE_CONFIRM_PASSWORD_BTN,
							}}
							isPassword
						/>
					)}
					<FormControl isInvalid={!!authErrorMessage}>
						<FormErrorMessage>{authErrorMessage}</FormErrorMessage>
						<Button
							tabIndex={tabIndex.SUBMIT}
							width="full"
							mt={6}
							type="submit"
							colorScheme={"blue"}
						>
							{title}
						</Button>
					</FormControl>
					{isRegister ? (
						<AuthRedirectButton
							tabIndex={tabIndex.REDIRECT}
							handleClick={handleLoginButton}
							title={t("auth.login")}
						/>
					) : (
						<AuthRedirectButton
							tabIndex={tabIndex.REDIRECT}
							handleClick={handleRegisterButton}
							title={t("auth.register")}
						/>
					)}
				</Box>
			</Box>
		</Flex>
	)
}
