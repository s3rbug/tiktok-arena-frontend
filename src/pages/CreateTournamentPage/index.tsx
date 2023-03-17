import {
	Box,
	Button,
	CircularProgress,
	Flex,
	Input,
	Popover,
	PopoverContent,
	PopoverTrigger,
	useToast,
} from "@chakra-ui/react"
import { useEffect } from "react"
import {
	useFieldArray,
	useForm,
	Controller,
	useWatch,
	ControllerRenderProps,
} from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { TikTokVideo } from "../../components"
import { TiktokUrl } from "../../components/TikTokVideo/TikTokUrl"
import { useAuth } from "../../hooks/useAuth"
import { createTournament } from "../../redux/middleware/tournament"
import { CreateTournamentType } from "../../redux/slices/tournament/tournament.types"
import { uiActions } from "../../redux/slices/ui/ui"
import { useTypedDispatch, useTypedSelector } from "../../redux/store"

export function CreateTournamentPage() {
	const [minTiktoksCount, maxTiktoksCount] = [4, 64]
	const [minTournamentNameLength, maxTournamentNameLength] = [4, 30]

	const {
		control,
		handleSubmit,
		setError,
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

	const dispatch = useTypedDispatch()

	const toast = useToast()

	const navigate = useNavigate()

	const uiError = useTypedSelector((state) => state.ui.errors?.createTournament)
	const success = useTypedSelector(
		(state) => state.ui.success?.createTournament
	)

	const user = useAuth()

	useEffect(() => {
		if (success) {
			dispatch(uiActions.setSuccess({ success: { createTournament: null } }))
			navigate("/tournaments")
		}
	}, [success])

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
		setError("root.unique", {})
		dispatch(uiActions.setError({ errors: { createTournament: null } }))

		return field.onChange(event)
	}

	const onSubmit = (data: CreateTournamentType) => {
		const uniqueValues = new Set(
			tiktoks.map((field) => TiktokUrl.toEmbeded(field.url))
		)

		if (uniqueValues.size !== fields.length) {
			setError("root.unique", {
				type: "duplicate",
				message: "Duplicate tiktoks",
			})
		} else {
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
				<Flex flexDirection={"column"} gap={4}>
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
							<Box pl={6} color="red.500">
								{errors?.name?.message}
							</Box>
						)}
					</Flex>
					{fields.map((field, index) => {
						return (
							<Flex key={field.id} gap={4}>
								<Flex w={"100%"} flexDirection="column">
									<Controller
										name={`tiktoks.${index}.url`}
										control={control}
										rules={{
											required: "TikTok URL is required",
											validate: {
												correctTikTokUrl: (value) =>
													TiktokUrl.isCorrectUrl(value) ||
													"Incorrect TikTok URL",
											},
										}}
										render={({ field }) => (
											<Input
												tabIndex={index + 2}
												isInvalid={!!errors?.tiktoks?.[index]?.url}
												errorBorderColor="crimson"
												placeholder="TikTok URL"
												{...field}
												onChange={(e) => customOnChange(e, field)}
											/>
										)}
									/>
									{!!errors?.tiktoks?.[index]?.url && (
										<Box pl={6} color="red.500">
											{errors?.tiktoks?.[index]?.url?.message}
										</Box>
									)}
								</Flex>
								<Popover placement="left" isLazy closeOnBlur={false}>
									{({ isOpen }) => (
										<>
											<PopoverTrigger>
												<Button
													variant={"outline"}
													colorScheme={"blue"}
													w={"100px"}
												>
													{isOpen ? "Close" : "Preview"}
												</Button>
											</PopoverTrigger>
											<PopoverContent>
												<TikTokVideo url={tiktoks[index]?.url} />
											</PopoverContent>
										</>
									)}
								</Popover>
								<Button
									onClick={() => handleDeleteTiktok(index)}
									colorScheme={"blue"}
								>
									Delete
								</Button>
							</Flex>
						)
					})}
					{!!errors?.root?.unique && (
						<Box pl={6} color="red.500">
							{errors?.root?.unique?.message}
						</Box>
					)}
					{!!uiError && (
						<Box pl={6} color="red.500">
							{uiError}
						</Box>
					)}
				</Flex>
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
