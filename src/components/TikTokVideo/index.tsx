type PropsType = {
	tiktokVideoURL?: string
}

export function TikTokVideo({ tiktokVideoURL }: PropsType) {
	if (!tiktokVideoURL) {
		return <div>No url given</div>
	}
	return (
		<iframe src={tiktokVideoURL} width="100%" height="760px" allowFullScreen />
	)
}
