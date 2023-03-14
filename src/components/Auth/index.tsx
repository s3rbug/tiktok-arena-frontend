import {
	Box,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	IconButton,
	Input,
} from "@chakra-ui/react"
import { useState } from "react"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { useTypedDispatch, useTypedSelector } from "../../redux/store"
import { authActions } from "../../redux/slices/auth"

export type FormInputType = {
	name: string
	password: string
}

type PropsType = {
	title: string
	onSubmit: SubmitHandler<FormInputType>
	isRegister?: boolean
}

export function Auth({ onSubmit, title, isRegister }: PropsType) {
	const [usernameMinLength, usernameMaxLength] = [4, 16]
	const [passwordMinLength, passwordMaxLength] = [5, 16]

	const [focus, setFocus] = useState(false)
	const [isPasswordHidden, setIsPasswordHidden] = useState(true)

	const {
		control,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm({
		defaultValues: {
			name: "",
			password: "",
		} as FormInputType,
	})

	const authError = useTypedSelector((state) => state.auth.error)
	const authErrorMessage: string | null = isRegister
		? authError.register
		: authError.login

	const dispatch = useTypedDispatch()
	const navigate = useNavigate()

	const clearAuthError = () => {
		if (isRegister && authErrorMessage) {
			dispatch(authActions.setRegisterError({ error: null }))
		} else {
			dispatch(authActions.setLoginError({ error: null }))
		}
	}

	const handleRegisterButton = () => {
		navigate("/register")
	}

	const changeFocus = (newFocus: boolean) => {
		return () => {
			setFocus(newFocus)
		}
	}

	const togglePasswordHidden = () => {
		setIsPasswordHidden(!isPasswordHidden)
	}

	return (
		<Flex width="full" align={"center"} justifyContent="center" mt={8}>
			<Box
				borderWidth={2}
				borderRadius={8}
				boxShadow={focus ? "2xl" : "lg"}
				transition={"ease-in-out"}
				transitionDuration=".4s"
				_hover={{
					boxShadow: "2xl",
				}}
			>
				<Box textAlign="center" py={4}>
					<Heading size={"xl"}>{title}</Heading>
				</Box>
				<Box as="form" p={8} onSubmit={handleSubmit(onSubmit)}>
					<FormControl isRequired isInvalid={!!errors.name}>
						<FormLabel>Username</FormLabel>
						<Controller
							name="name"
							control={control}
							rules={{
								required: "Username is required",
								minLength: {
									value: usernameMinLength,
									message: `Minimum username length is ${usernameMinLength}`,
								},
								maxLength: {
									value: usernameMaxLength,
									message: `Maximum username length is ${usernameMaxLength}`,
								},
							}}
							render={({ field }) => (
								<Input
									{...field}
									onBlur={changeFocus(false)}
									onFocus={changeFocus(true)}
									onChange={(e) => {
										clearAuthError()

										return field.onChange(e)
									}}
								/>
							)}
						/>
						<FormErrorMessage>{errors.name?.message}</FormErrorMessage>
					</FormControl>
					<FormControl isRequired isInvalid={!!errors.password}>
						<FormLabel mt={4}>Password</FormLabel>
						<Flex>
							<Controller
								name={"password"}
								control={control}
								rules={{
									required: "Password is required",
									minLength: {
										value: passwordMinLength,
										message: `Minimum password length is ${passwordMinLength}`,
									},
									maxLength: {
										value: passwordMaxLength,
										message: `Maximum password length is ${passwordMaxLength}`,
									},
								}}
								render={({ field }) => (
									<Input
										{...field}
										type={isPasswordHidden ? "password" : "text"}
										onBlur={changeFocus(false)}
										onFocus={changeFocus(true)}
										onChange={(e) => {
											clearAuthError()

											return field.onChange(e)
										}}
									/>
								)}
							/>
							<IconButton
								aria-label="view icon"
								icon={isPasswordHidden ? <ViewOffIcon /> : <ViewIcon />}
								onClick={togglePasswordHidden}
							/>
						</Flex>
						<FormErrorMessage>{errors.password?.message}</FormErrorMessage>
					</FormControl>
					<FormControl isInvalid={!!authErrorMessage}>
						<FormErrorMessage>{authErrorMessage}</FormErrorMessage>
						<Button width="full" mt={8} type="submit" colorScheme={"blue"}>
							{title}
						</Button>
					</FormControl>
					{!isRegister && (
						<Flex justify={"center"} mt={4}>
							<Button
								onClick={handleRegisterButton}
								variant="link"
								colorScheme={"blue"}
							>
								Register
							</Button>
						</Flex>
					)}
				</Box>
			</Box>
		</Flex>
	)
}
