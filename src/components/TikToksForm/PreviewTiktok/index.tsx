import {
	Box,
	Button,
	ButtonProps,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@chakra-ui/react"
import { TikTokVideo } from "../../TikTokVideo"
import { useTranslation } from "react-i18next"

type PropsType = {
	url?: string
} & ButtonProps

export const PreviewTiktok = ({ url, ...buttonProps }: PropsType) => {
	const { t } = useTranslation()
	return (
		<Box flexGrow={1}>
			<Popover placement="left" isLazy closeOnBlur={false}>
				{({ isOpen }) => (
					<>
						<PopoverTrigger>
							<Button variant={"outline"} colorScheme={"blue"} {...buttonProps}>
								{isOpen
									? t("dialog-buttons.delete")
									: t("dialog-buttons.preview")}
							</Button>
						</PopoverTrigger>
						<PopoverContent>
							<TikTokVideo url={url} />
						</PopoverContent>
					</>
				)}
			</Popover>
		</Box>
	)
}
