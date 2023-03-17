import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	Input,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@chakra-ui/react"
import {
	Control,
	Controller,
	ControllerRenderProps,
	FieldArrayWithId,
	FieldErrors,
} from "react-hook-form"
import { TikTokVideo } from "../../../components"
import { TiktokUrl } from "../../../components/TikTokVideo/TikTokUrl"
import { CreateTournamentType } from "../../../redux/slices/tournament/tournament.types"

type PropsType = {
	control: Control<CreateTournamentType, any>
	fields: FieldArrayWithId<CreateTournamentType, "tiktoks", "id">[]
	tiktoks: {
		url: string
	}[]
	handleDeleteTiktok: (index: number) => void
	customOnChange: (
		event: React.FormEvent<HTMLInputElement>,
		field: ControllerRenderProps<CreateTournamentType, `tiktoks.${number}.url`>
	) => any
	errors: FieldErrors<CreateTournamentType>
}

export const TournamentFields = ({
	control,
	fields,
	tiktoks,
	handleDeleteTiktok,
	customOnChange,
	errors,
}: PropsType) => {
	return (
		<>
			{fields.map((field, index) => {
				return (
					<Flex key={field.id} gap={4}>
						<FormControl
							isInvalid={!!errors?.tiktoks?.[index]?.url}
							display={"flex"}
							w={"100%"}
							flexDirection="column"
						>
							<Controller
								name={`tiktoks.${index}.url`}
								control={control}
								rules={{
									required: "TikTok URL is required",
									validate: {
										correctTikTokUrl: (value) =>
											TiktokUrl.isCorrectUrl(value) || "Incorrect TikTok URL",
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
								<FormErrorMessage>
									{errors?.tiktoks?.[index]?.url?.message}
								</FormErrorMessage>
							)}
						</FormControl>
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
		</>
	)
}
