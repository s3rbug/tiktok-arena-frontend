import {
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
import { TiktokUrl } from "../../components/TikTokVideo/TikTokUrl"
import { useAuth } from "../../hooks/useAuth"
import { createTournament } from "../../redux/middleware/tournament"
import { CreateTournamentType } from "../../redux/slices/tournament/tournament.types"
import { uiActions } from "../../redux/slices/ui/ui"
import { useTypedDispatch, useTypedSelector } from "../../redux/store"
import { TournamentFields } from "./TournamentFields"

export function CreateTournamentPage() {
	const [minTiktoksCount, maxTiktoksCount] = [4, 64]
	const [minTournamentNameLength, maxTournamentNameLength] = [4, 30]

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateTournamentType>({
		defaultValues: {
			name: "",
			tiktoks: [{ url: "" }, { url: "" }, { url: "" }, { url: "" }],
		},
	})

	const { fields, append, remove } = useFieldArray({
		name: "tiktoks",
		control,
	})

	const tiktoks = useWatch({
		control,
		name: "tiktoks",
	})

	const [errorUnique, setErrorUnique] = useState<null | string>(null)

	const dispatch = useTypedDispatch()

	const toast = useToast()

	const navigate = useNavigate()

	const serverError = useTypedSelector(
		(state) => state.ui.errors?.createTournament
	)

	const success = useTypedSelector(
		(state) => state.ui.success?.createTournament
	)

	const user = useAuth()

	const clearErrors = useCallback(() => {
		dispatch(uiActions.setSuccess({ success: { createTournament: null } }))
		dispatch(uiActions.setError({ errors: { createTournament: null } }))
		setErrorUnique(null)
	}, [dispatch])

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
		field: ControllerRenderProps<CreateTournamentType, `tiktoks.${number}.url`>
	) {
		clearErrors()

		return field.onChange(event)
	}

	const onSubmit = (data: CreateTournamentType) => {
		const uniqueValues = new Set(
			tiktoks.map((field) => TiktokUrl.toEmbeded(field.url))
		)

		if (uniqueValues.size !== fields.length) {
			setErrorUnique("Duplicate tiktoks")
		} else {
			clearErrors()

			dispatch(
				createTournament({
					...data,
					size: data.tiktoks.length,
				})
			)
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
				<Flex justifyContent={"space-between"} align="flex-start" mt={6}>
					<Button type="submit" colorScheme={"blue"}>
						Create tournament
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
