type PropsType = {
	tiktokVideoURL?: string
}

export function TikTokVideo({ tiktokVideoURL }: PropsType) {
	function isIncorrectURL(url: string): boolean {
		const regex = /^https:\/\/www\.tiktok\.com\/embed\/v2\/[0-9]+$/gm
		return !regex.test(url)
	}

	if (!tiktokVideoURL) {
		return <div>No url given</div>
	}

	if (isIncorrectURL(tiktokVideoURL)) {
		return <div>Incorrect tiktok URL</div>
	}

	return (
		<iframe
			src={tiktokVideoURL}
			width="100%"
			height="770px"
			allowFullScreen
			allow="accelerometer; autoplay; encrypted-media; gyroscope"
		/>
	)
}
