import {
	Box,
	Button,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@chakra-ui/react"
import { TikTokVideo } from "../../TikTokVideo"

type PropsType = {
	url?: string
}

export const PreviewTiktok = ({ url }: PropsType) => {
	return (
		<Box>
			<Popover placement="left" isLazy closeOnBlur={false}>
				{({ isOpen }) => (
					<>
						<PopoverTrigger>
							<Button variant={"outline"} colorScheme={"blue"} minW={"120px"}>
								{isOpen ? "Close" : "Preview"}
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
