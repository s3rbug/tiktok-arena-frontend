import { Button, Flex, FormControl, HStack, Input } from "@chakra-ui/react"
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
import { tiktokApi } from "../../../api/tiktok"
import { FormError } from "../FormError"
import { PreviewTiktok } from "../PreviewTiktok"

type PropsType = {
	control: Control<TournamentFormType>
	fields: FieldArrayWithId<TournamentFormType, "tiktoks", "id">[]
	setValue: UseFormSetValue<TournamentFormType>
	tiktoks: {
		url: string
		name: string
	}[]
	handleDeleteTiktok: (index: number) => void
	customOnChange: (
		event: React.FormEvent<HTMLInputElement>,
		field: ControllerRenderProps<TournamentFormType, any>
	) => any
	errors: FieldErrors<TournamentFormType>
	setError: UseFormSetError<TournamentFormType>
}

export const TournamentFields = ({
	control,
	fields,
	tiktoks,
	handleDeleteTiktok,
	customOnChange,
	setValue,
	errors,
	setError,
}: PropsType) => {
	const tiktokNameLength = {
		min: 4,
		max: 60,
	}
	const handleLoadNameClick = (index: number) => () => {
		const url = tiktoks[index].url
		if (url === "") {
			setError(`tiktoks.${index}.name`, {
				type: "required",
				message: "No URL given",
			})
			return
		}

		tiktokApi
			.getName({ url })
			.then((data) => {
				const name = data?.title
				if (name) {
					setValue(`tiktoks.${index}.name`, name)
				}
			})
			.catch(() => {
				setError(`tiktoks.${index}.name`, {
					message: `Failed to load name for ${url}`,
				})
			})
	}

	return (
		<>
			{fields.map((field, index) => {
				return (
					<Flex key={field.id} gap={2}>
						<Flex flexDirection="column" w={"100%"}>
							<HStack align={"flex-start"}>
								<FormControl
									isInvalid={!!errors?.tiktoks?.[index]?.name}
									display="flex"
									flexDirection={"column"}
									alignItems={"flex-start"}
								>
									<Controller
										name={`tiktoks.${index}.name`}
										control={control}
										rules={{
											required: "TikTok name is required",
											minLength: {
												value: tiktokNameLength.min,
												message: `Minimum tiktok name length is ${tiktokNameLength.min}`,
											},
											maxLength: {
												value: tiktokNameLength.max,
												message: `Maximum tiktok name length is ${tiktokNameLength.max}`,
											},
										}}
										render={({ field }) => (
											<Input
												tabIndex={index + 2}
												isInvalid={!!errors?.tiktoks?.[index]?.name}
												errorBorderColor="crimson"
												placeholder="TikTok name"
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
									minW={"120px"}
								>
									{"Load name"}
								</Button>
								<FormControl
									isInvalid={!!errors?.tiktoks?.[index]?.url}
									display="flex"
									flexDirection={"column"}
									alignItems={"flex-start"}
									w={"100%"}
								>
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
									<FormError error={errors?.tiktoks?.[index]?.url?.message} />
								</FormControl>
								<PreviewTiktok url={tiktoks[index]?.url} />
							</HStack>
						</Flex>
						<Button
							onClick={() => handleDeleteTiktok(index)}
							colorScheme={"blue"}
						>
							Delete
						</Button>
					</Flex>
				)
			})}
		</>
	)
}
