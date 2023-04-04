import {
	Alert,
	AlertIcon,
	Badge,
	Box,
	Button,
	Flex,
	FormControl,
	HStack,
	Image,
	Input,
	VStack,
} from "@chakra-ui/react"
import { ChangeEvent, useCallback, useEffect, useState } from "react"
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
import { imageApi } from "../../api/image"
import { CreateTournamentPayloadType } from "../../api/tournament"

type PropsType = {
	defaultValues: TournamentFormType
	serverError: string | null | undefined
	success: boolean | null | undefined
	clearStoreErrors: () => void
	changeStoreOnSubmit: (data: CreateTournamentPayloadType) => void
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

	const [image, setImage] = useState<null | File>(null)
	const [imageURL, setImageURL] = useState<null | string>(null)

	useEffect(() => {
		if (defaultValues.photoURL) {
			fetch(defaultValues.photoURL)
				.then((res) => res.blob())
				.then((blob) => {
					let imageName = defaultValues.photoURL || "photo url"
					if (imageName.includes("/")) {
						imageName = imageName.substring(imageName.lastIndexOf("/") + 1)
					}
					const newImage = new File([blob], imageName)
					setImage(newImage)
					setImageURL(URL.createObjectURL(newImage))
				})
		}
	}, [defaultValues.photoURL])

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

	const onSubmit = async (data: TournamentFormType) => {
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

		if (image) {
			await imageApi
				.saveImageToCloud(image)
				.then((url) => {
					changeStoreOnSubmit({
						...data,
						PhotoURL: url || null,
						size: data.tiktoks.length,
					})
				})
				.catch((error) => {
					console.log(error)
				})
		} else {
			changeStoreOnSubmit({
				...data,
				PhotoURL: null,
				size: data.tiktoks.length,
			})
		}
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

	async function uploadImage(event: ChangeEvent<HTMLInputElement>) {
		const fileImage = event.target?.files?.[0]

		if (!fileImage) {
			return
		}
		setImage(fileImage)
		setImageURL(URL.createObjectURL(fileImage))
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
			<HStack>
				<HStack as="label">
					<VStack>
						<Button as="div" colorScheme={"blue"} variant="outline">
							Change tournament picture
						</Button>

						{image && (
							<Badge
								maxW="200px"
								overflow={"hidden"}
								textOverflow="ellipsis"
								fontSize={"sm"}
								colorScheme="cyan"
							>
								{image.name}
							</Badge>
						)}
					</VStack>
					<input
						style={{ display: "none" }}
						onChange={uploadImage}
						type="file"
						name="image"
						accept="image/png, image/jpeg"
					/>
				</HStack>
				<Flex w="100%" justifyContent={"flex-start"}>
					{imageURL && (
						<Image src={imageURL} ml={16} h="350px" w="fit-content" />
					)}
				</Flex>
			</HStack>
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
