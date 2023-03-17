import { Box } from "@chakra-ui/react"
import { TiktokUrl } from "./TikTokUrl"

type PropsType = {
	url?: string
	minWidth?: boolean
}

export function TikTokVideo({ url, minWidth }: PropsType) {
	if (!url) {
		return <Box p={2}>No url given</Box>
	}

	if (!TiktokUrl.isCorrectUrl(url)) {
		return <Box p={2}>Incorrect tiktok URL</Box>
	}

	return (
		<iframe
			title="tiktok"
			src={TiktokUrl.toEmbeded(url)}
			style={{
				width: "100%",
				height: "770px",
				minWidth: minWidth ? "400px" : "auto",
			}}
			allowFullScreen
			allow="accelerometer; autoplay; encrypted-media; gyroscope"
		/>
	)
}
