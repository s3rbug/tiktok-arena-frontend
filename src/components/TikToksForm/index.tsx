import {
	Alert,
	AlertIcon,
	Badge,
	Box,
	Button,
	Checkbox,
	Flex,
	FormControl,
	HStack,
	Image,
	Input,
	VStack,
} from "@chakra-ui/react"
import { ChangeEvent, useCallback, useEffect, useState } from "react"
import { useFieldArray, useForm, Controller, useWatch } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { TiktokUrl } from "../../utils/tiktokUrl/tiktokUrl"
import { useAuth } from "../../hooks/useAuth"
import { TournamentFormType } from "../../redux/slices/tournament/tournament.types"
import { useTypedDispatch } from "../../redux/store"
import { TournamentFields } from "./TournamentFields"
import { Loading } from "../Loading"
import { useCustomToast } from "../../hooks/useCustomToast"
import { FormError } from "./FormError"
import { imageApi } from "../../api/image/image"
import { CreateTournamentPayloadType } from "../../api/tournament/tournament.types"
import { useTranslation } from "react-i18next"

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

const tiktoksCount = {
	min: 4,
	max: 64,
}

const tournamentNameLength = {
	min: 4,
	max: 30,
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
	const { t } = useTranslation()
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

	const onSubmit = async (data: TournamentFormType) => {
		const uniqueURLs = new Set(
			tiktoks.map((field) => TiktokUrl.toEmbeded(field.url))
		)

		const uniqueNames = new Set(tiktoks.map((field) => field.name))

		if (uniqueURLs.size !== fields.length) {
			setErrorUnique(
				t("form-message.duplicate", {
					field: t("create-tournament.tiktok-url"),
				})
			)
			return
		}
		if (uniqueNames.size !== fields.length) {
			setErrorUnique(
				t("form-message.duplicate", {
					field: t("create-tournament.tiktok-name"),
				})
			)
			return
		}

		clearAllErrors()

		if (image) {
			await imageApi
				.saveImageToCloud(image)
				.then((url) => {
					changeStoreOnSubmit({
						...data,
						photoURL: url || null,
						size: data.tiktoks.length,
					})
				})
				.catch((error) => {
					console.log(error)
				})
		} else {
			changeStoreOnSubmit({
				...data,
				photoURL: null,
				size: data.tiktoks.length,
			})
		}
	}

	function handleCreateTiktok() {
		if (fields.length !== tiktoksCount.max) {
			append({ url: "", name: "" })
		} else {
			showToast(
				t("form-message.cant-create", { field: t("create-tournament.tiktok") }),
				t("form-message.max-length", {
					field: t("create-tournament.tiktok-count"),
					maxLength: tiktoksCount.max,
				})
			)
		}
	}

	function handleDeleteTiktok(index: number) {
		if (fields.length !== tiktoksCount.min) {
			remove(index)
		} else {
			showToast(
				t("form-message.cant-delete", { field: t("create-tournament.tiktok") }),
				t("form-message.min-length", {
					field: t("create-tournament.tiktok-count"),
					minLength: tiktoksCount.min,
				})
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
		<Box p={{ lg: 6, sm: 4 }} as="form" onSubmit={handleSubmit(onSubmit)}>
			<VStack gap={4} alignItems="stretch">
				<FormControl
					display={"flex"}
					flexDirection="column"
					isInvalid={!!errors?.name?.message}
					mb={2}
				>
					<HStack
						gap={4}
						justifyContent={{ lg: "flex-start", sm: "space-between" }}
					>
						<Controller
							name={"name"}
							control={control}
							rules={{
								required: t("form-message.required", {
									field: t("create-tournament.tournament-name"),
								}),
								minLength: {
									value: tournamentNameLength.min,
									message: t("form-message.min-length", {
										field: t("create-tournament.tournament-name"),
										minLength: tournamentNameLength.min,
									}),
								},
								maxLength: {
									value: tournamentNameLength.max,
									message: t("form-message.max-length", {
										field: t("create-tournament.tournament-name"),
										minLength: tournamentNameLength.max,
									}),
								},
							}}
							render={({ field }) => (
								<Input
									tabIndex={1}
									flexGrow={{ lg: 0, sm: 1 }}
									isInvalid={!!errors?.name}
									errorBorderColor="crimson"
									placeholder={t("create-tournament.tournament-name")}
									{...field}
									w="fit-content"
								/>
							)}
						/>
						<Controller
							name="isPrivate"
							control={control}
							render={({ field: { onChange, value, ref } }) => (
								<Checkbox
									onChange={onChange}
									isChecked={value}
									ref={ref}
									color={"initial"}
									isInvalid={false}
								>
									{t("create-tournament.private")}
								</Checkbox>
							)}
						/>
					</HStack>
					<FormError error={errors?.name?.message} />
				</FormControl>

				<TournamentFields
					setValue={setValue}
					control={control}
					errors={errors}
					setError={setError}
					fields={fields}
					handleDeleteTiktok={handleDeleteTiktok}
					tiktoks={tiktoks}
					clearAllErrors={clearAllErrors}
				/>
				<FormControl isInvalid={!!serverError || !!errorUnique}>
					<FormError error={errorUnique} />
					<FormError error={serverError} />
				</FormControl>
			</VStack>
			<VStack alignItems={"flex-start"} gap={4}>
				<Flex
					flexDirection={{ lg: "row", sm: "column-reverse" }}
					gap={{ lg: 16, sm: 4 }}
					w="100%"
				>
					<HStack as="label">
						<VStack justifyItems="center" w="100%">
							<Button as="div" colorScheme="blue" variant="outline">
								{t("create-tournament.change-picture")}
							</Button>
							{image && (
								<Badge
									maxW="200px"
									overflow="hidden"
									textOverflow="ellipsis"
									fontSize="sm"
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
					<Flex w="100%" justifyContent={{ lg: "flex-start", sm: "center" }}>
						{imageURL && <Image src={imageURL} maxH="350px" maxW="100%" />}
					</Flex>
				</Flex>
				{warning && (
					<Alert status="warning">
						<AlertIcon />
						{warning}
					</Alert>
				)}
				<Flex justifyContent="space-between" w="100%">
					<Button type="submit" colorScheme="blue">
						{submitText}
					</Button>
					<Button
						onClick={handleCreateTiktok}
						variant="link"
						colorScheme="blue"
					>
						{t("create-tournament.add-tiktok")}
					</Button>
				</Flex>
			</VStack>
		</Box>
	)
}
