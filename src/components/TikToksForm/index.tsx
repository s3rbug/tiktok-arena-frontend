import {
	Alert,
	AlertIcon,
	Box,
	Button,
	Flex,
	FormControl,
	Input,
	VStack,
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
import { TiktokUrl } from "../../utils/tiktokUrl/tiktokUrl"
import { useAuth } from "../../hooks/useAuth"
import { TournamentFormType } from "../../redux/slices/tournament/tournament.types"
import { useTypedDispatch } from "../../redux/store"
import { TournamentFields } from "./TournamentFields"
import { Loading } from "../Loading"
import { useCustomToast } from "../../hooks/useCustomToast"
import { FormError } from "./FormError"

type PropsType = {
	defaultValues: TournamentFormType
	serverError: string | null | undefined
	success: boolean | null | undefined
	clearStoreErrors: () => void
	changeStoreOnSubmit: (data: TournamentFormType) => void
	submitText: string
	successRedirect: string
	warning?: string
}

export function TikToksForm({
	defaultValues,
	serverError,
	success,
	clearStoreErrors,
	changeStoreOnSubmit,
	submitText,
	successRedirect,
	warning,
}: PropsType) {
	const tiktoksCount = {
		min: 4,
		max: 64,
	}

	const tournamentNameLength = {
		min: 4,
		max: 30,
	}

	const {
		control,
		handleSubmit,
		setValue,
		setError,
		clearErrors,
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

	const { showToast } = useCustomToast()

	const navigate = useNavigate()

	const user = useAuth()

	const clearAllErrors = useCallback(() => {
		if (success || serverError) {
			clearStoreErrors()
		}
		setErrorUnique(null)
		clearErrors()
	}, [clearStoreErrors, success, serverError, clearErrors])

	useEffect(() => {
		if (success) {
			clearAllErrors()
			navigate(successRedirect)
		}
		return () => {
			clearAllErrors()
		}
	}, [success, dispatch, navigate, clearAllErrors, successRedirect])

	if (!user) {
		return <Loading />
	}

	function customOnChange(
		event: React.FormEvent<HTMLInputElement>,
		field: ControllerRenderProps<TournamentFormType, `tiktoks.${number}.url`>
	) {
		clearAllErrors()

		return field.onChange(event)
	}

	const onSubmit = (data: TournamentFormType) => {
		const uniqueURLs = new Set(
			tiktoks.map((field) => TiktokUrl.toEmbeded(field.url))
		)

		const uniqueNames = new Set(tiktoks.map((field) => field.name))

		if (uniqueURLs.size !== fields.length) {
			setErrorUnique("Duplicate tiktok URL")
			return
		}
		if (uniqueNames.size !== fields.length) {
			setErrorUnique("Duplicate tiktok name")
			return
		}

		clearAllErrors()

		changeStoreOnSubmit(data)
	}

	function handleCreateTiktok() {
		if (fields.length !== tiktoksCount.max) {
			append({ url: "", name: "" })
		} else {
			showToast(
				"Can not add tiktok",
				`Maximum tiktok count is ${tiktoksCount.max}`
			)
		}
	}

	function handleDeleteTiktok(index: number) {
		if (fields.length !== tiktoksCount.min) {
			remove(index)
		} else {
			showToast(
				"Can not delete tiktok",
				`Minimum tiktok count is ${tiktoksCount.min}`
			)
		}
	}

	return (
		<Box p={8} as="form" onSubmit={handleSubmit(onSubmit)}>
			<VStack gap={4} alignItems="stretch">
				<FormControl
					display={"flex"}
					flexDirection="column"
					isInvalid={!!errors?.name?.message}
					mb={2}
				>
					<Controller
						name={"name"}
						control={control}
						rules={{
							required: "Tournament name is required",
							minLength: {
								value: tournamentNameLength.min,
								message: `Min tournament name length is ${tournamentNameLength.min}`,
							},
							maxLength: {
								value: tournamentNameLength.max,
								message: `Max tournament name length is ${tournamentNameLength.max}`,
							},
						}}
						render={({ field }) => (
							<Input
								tabIndex={1}
								isInvalid={!!errors?.name}
								errorBorderColor="crimson"
								placeholder="Tournament name"
								{...field}
								w="fit-content"
							/>
						)}
					/>
					<FormError error={errors?.name?.message} />
				</FormControl>
				<TournamentFields
					setValue={setValue}
					control={control}
					customOnChange={customOnChange}
					errors={errors}
					setError={setError}
					fields={fields}
					handleDeleteTiktok={handleDeleteTiktok}
					tiktoks={tiktoks}
				/>
				<FormControl isInvalid={!!serverError || !!errorUnique}>
					<FormError error={errorUnique} />
					<FormError error={serverError} />
				</FormControl>
			</VStack>
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
		</Box>
	)
}
