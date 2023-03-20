import {
	Alert,
	AlertIcon,
	Box,
	Button,
	CircularProgress,
	Flex,
	FormControl,
	FormErrorMessage,
	Input,
	useToast,
} from "@chakra-ui/react"
import { useCallback, useEffect, useState } from "react"
import {
	useFieldArray,
	useForm,
	Controller,
	useWatch,
	ControllerRenderProps,
} from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { TiktokUrl } from "../TikTokVideo/TikTokUrl"
import { useAuth } from "../../hooks/useAuth"
import { TournamentFormType } from "../../redux/slices/tournament/tournament.types"
import { useTypedDispatch } from "../../redux/store"
import { TournamentFields } from "./TournamentFields"

type PropsType = {
	defaultValues: TournamentFormType
	serverError: string | null | undefined
	success: boolean | null | undefined
	clearStoreErrors: () => void
	changeStoreOnSubmit: (data: TournamentFormType) => void
	submitText: string
	warning?: string
}

export function TikToksForm({
	defaultValues,
	serverError,
	success,
	clearStoreErrors,
	changeStoreOnSubmit,
	submitText,
	warning,
}: PropsType) {
	const [minTiktoksCount, maxTiktoksCount] = [4, 64]
	const [minTournamentNameLength, maxTournamentNameLength] = [4, 30]

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<TournamentFormType>({
		defaultValues,
	})

	const { fields, append, remove } = useFieldArray({
		name: "tiktoks",
		control,
	})

	const tiktoks = useWatch({
		name: "tiktoks",
		control,
	})

	const [errorUnique, setErrorUnique] = useState<null | string>(null)

	const dispatch = useTypedDispatch()

	const toast = useToast()

	const navigate = useNavigate()

	const user = useAuth()

	const clearErrors = useCallback(() => {
		if (success || serverError) {
			clearStoreErrors()
		}
		setErrorUnique(null)
	}, [clearStoreErrors, success, serverError])

	useEffect(() => {
		if (success) {
			clearErrors()
			navigate("/tournaments")
		}
		return () => {
			clearErrors()
		}
	}, [success, dispatch, navigate, clearErrors])

	if (!user) {
		return <CircularProgress isIndeterminate />
	}

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

	function customOnChange(
		event: React.FormEvent<HTMLInputElement>,
		field: ControllerRenderProps<TournamentFormType, `tiktoks.${number}.url`>
	) {
		clearErrors()

		return field.onChange(event)
	}

	const onSubmit = (data: TournamentFormType) => {
		const uniqueValues = new Set(
			tiktoks.map((field) => TiktokUrl.toEmbeded(field.url))
		)

		if (uniqueValues.size !== fields.length) {
			setErrorUnique("Duplicate tiktoks")
		} else {
			clearErrors()

			changeStoreOnSubmit(data)
		}
	}

	function handleCreateTiktok() {
		if (fields.length !== maxTiktoksCount) {
			append({ url: "" })
		} else {
			showToast(
				"Can not add tiktok",
				`Maximum tiktok count is ${maxTiktoksCount}`
			)
		}
	}

	function handleDeleteTiktok(index: number) {
		if (fields.length !== minTiktoksCount) {
			remove(index)
		} else {
			showToast(
				"Can not delete tiktok",
				`Minimum tiktok count is ${minTiktoksCount}`
			)
		}
	}

	return (
		<Box p={8}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormControl
					isInvalid={!!serverError || !!errorUnique}
					display={"flex"}
					flexDirection={"column"}
					gap={4}
				>
					<Flex flexDirection="column">
						<Controller
							name={"name"}
							control={control}
							rules={{
								required: "Tournament name is required",
								minLength: {
									value: minTournamentNameLength,
									message: `Min tournament name length is ${minTournamentNameLength}`,
								},
								maxLength: {
									value: maxTournamentNameLength,
									message: `Max tournament name length is ${maxTournamentNameLength}`,
								},
							}}
							render={({ field }) => (
								<Input
									tabIndex={1}
									isInvalid={!!errors?.name?.message}
									errorBorderColor="crimson"
									placeholder="Tournament name"
									{...field}
								/>
							)}
						/>
						{!!errors?.name && (
							<FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
						)}
					</Flex>
					<TournamentFields
						control={control}
						customOnChange={customOnChange}
						errors={errors}
						fields={fields}
						handleDeleteTiktok={handleDeleteTiktok}
						tiktoks={tiktoks}
					/>
					{!!errorUnique && <FormErrorMessage>{errorUnique}</FormErrorMessage>}
					{!!serverError && <FormErrorMessage>{serverError}</FormErrorMessage>}
				</FormControl>
				{warning && (
					<Alert status="warning" mt={6}>
						<AlertIcon />
						{warning}
					</Alert>
				)}
				<Flex justifyContent={"space-between"} align="flex-start" mt={6}>
					<Button type="submit" colorScheme={"blue"}>
						{submitText}
					</Button>
					<Button
						onClick={handleCreateTiktok}
						variant={"link"}
						colorScheme={"blue"}
					>
						Add tiktok
					</Button>
				</Flex>
			</form>
		</Box>
	)
}
