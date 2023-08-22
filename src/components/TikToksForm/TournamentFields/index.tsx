import { Button, Flex, FormControl, Input } from "@chakra-ui/react"
import {
	Control,
	Controller,
	ControllerRenderProps,
	FieldArrayWithId,
	FieldErrors,
	UseFormSetError,
	UseFormSetValue,
} from "react-hook-form"
import { TiktokUrl } from "../../../utils/tiktokUrl/tiktokUrl"
import { TournamentFormType } from "../../../redux/slices/tournament/tournament.types"
import { tiktokApi } from "../../../api/tiktok/tiktok"
import { FormError } from "../FormError"
import { PreviewTiktok } from "../PreviewTiktok"
import { useTranslation } from "react-i18next"

type PropsType = {
	control: Control<TournamentFormType>
	fields: FieldArrayWithId<TournamentFormType, "tiktoks", "id">[]
	setValue: UseFormSetValue<TournamentFormType>
	tiktoks: {
		url: string
		name: string
	}[]
	handleDeleteTiktok: (index: number) => void
	errors: FieldErrors<TournamentFormType>
	setError: UseFormSetError<TournamentFormType>
	clearAllErrors: () => void
}

const tiktokNameLength = {
	min: 4,
	max: 60,
}

export const TournamentFields = ({
	control,
	fields,
	tiktoks,
	handleDeleteTiktok,
	setValue,
	errors,
	setError,
	clearAllErrors,
}: PropsType) => {
	const { t } = useTranslation()

	function customOnChange(
		event: React.FormEvent<HTMLInputElement>,
		field:
			| ControllerRenderProps<TournamentFormType, `tiktoks.${number}.name`>
			| ControllerRenderProps<TournamentFormType, `tiktoks.${number}.url`>
	) {
		clearAllErrors()

		return field.onChange(event)
	}

	const handleLoadNameClick = (index: number) => () => {
		const url = tiktoks[index].url
		if (url === "") {
			setError(`tiktoks.${index}.name`, {
				type: "required",
				message: t("form-message.required", {
					field: t("create-tournament.tiktok-url"),
				}),
			})
			return
		}

		tiktokApi
			.getDetails({ url })
			.then((data) => {
				const name = data?.title
				if (name) {
					setValue(`tiktoks.${index}.name`, name)
				}
			})
			.catch(() => {
				setError(`tiktoks.${index}.name`, {
					message: t("form-message.failed-to-load", {
						field: t("create-tournament.tiktok-name"),
						url,
					}),
				})
			})
	}

	return (
		<>
			{fields.map((field, index) => {
				return (
					<Flex key={field.id} gap={2}>
						<Flex
							flexDirection={{ lg: "row", sm: "column" }}
							flexGrow={1}
							align="flex-start"
							gap={2}
						>
							<Flex flexGrow={1} gap={4} w={"100%"}>
								<FormControl
									w="initial"
									flexGrow={1}
									isInvalid={!!errors?.tiktoks?.[index]?.name}
									display="flex"
									flexDirection="column"
									alignItems="flex-start"
								>
									<Controller
										name={`tiktoks.${index}.name`}
										control={control}
										rules={{
											required: t("form-message.required", {
												field: t("create-tournament.tiktok-name"),
											}),
											minLength: {
												value: tiktokNameLength.min,
												message: t("form-message.min-length", {
													field: t("create-tournament.tiktok-name"),
													minLength: tiktokNameLength.min,
												}),
											},
											maxLength: {
												value: tiktokNameLength.max,
												message: t("form-message.max-length", {
													field: t("create-tournament.tiktok-name"),
													minLength: tiktokNameLength.max,
												}),
											},
										}}
										render={({ field }) => (
											<Input
												tabIndex={index + 2}
												isInvalid={!!errors?.tiktoks?.[index]?.name}
												errorBorderColor="crimson"
												placeholder={t("create-tournament.tiktok-name")}
												{...field}
												onChange={(e) => customOnChange(e, field)}
											/>
										)}
									/>
									<FormError error={errors?.tiktoks?.[index]?.name?.message} />
								</FormControl>
								<Button
									onClick={handleLoadNameClick(index)}
									variant={"outline"}
									colorScheme={"blue"}
									w={{ lg: "initial", sm: "40%" }}
								>
									{t("create-tournament.load-name")}
								</Button>
							</Flex>
							<Flex flexGrow={1} gap={4} w={"100%"}>
								<FormControl
									w="initial"
									flexGrow={1}
									isInvalid={!!errors?.tiktoks?.[index]?.url}
									display="flex"
									flexDirection="column"
									alignItems="flex-start"
								>
									<Controller
										name={`tiktoks.${index}.url`}
										control={control}
										rules={{
											required: t("form-message.required", {
												field: t("create-tournament.tiktok-url"),
											}),
											validate: {
												correctTikTokUrl: (value) =>
													TiktokUrl.isCorrectUrl(value) ||
													t("form-message.incorrect", {
														field: t("create-tournament.tiktok-url"),
													}),
											},
										}}
										render={({ field }) => (
											<Input
												tabIndex={index + 2}
												isInvalid={!!errors?.tiktoks?.[index]?.url}
												errorBorderColor="crimson"
												placeholder={t("create-tournament.tiktok-url")}
												{...field}
												onChange={(e) => customOnChange(e, field)}
											/>
										)}
									/>
									<FormError error={errors?.tiktoks?.[index]?.url?.message} />
								</FormControl>
								<Flex
									gap={2}
									w={{ lg: "initial", sm: "40%" }}
									justifyContent={"stretch"}
								>
									<PreviewTiktok
										flexGrow={1}
										w="100%"
										url={tiktoks[index]?.url}
									/>

									<Button
										onClick={() => handleDeleteTiktok(index)}
										flexGrow={1}
										colorScheme="blue"
									>
										{t("dialog-buttons.delete")}
									</Button>
								</Flex>
							</Flex>
						</Flex>
					</Flex>
				)
			})}
		</>
	)
}
