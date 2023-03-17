export const TiktokUrl = {
	regex: {
		tiktokRegex: /^https:\/\/www\.tiktok\.com\/@.+\/video\/[0-9]+$/,
		embededTiktokRegex: /^https:\/\/www\.tiktok\.com\/embed\/v2\/[0-9]+$/,
		tiktokIdRegex: /^[0-9]+$/,
	},
	toEmbeded: (url: string): string => {
		if (TiktokUrl.regex.tiktokRegex.test(url)) {
			const tiktokId = url.substring(url.lastIndexOf("/") + 1)
			return `https://www.tiktok.com/embed/v2/${tiktokId}`
		}
		if (TiktokUrl.regex.tiktokIdRegex.test(url)) {
			return `https://www.tiktok.com/embed/v2/${url}`
		}
		return url
	},
	isCorrectUrl: (url: string) => {
		return (
			TiktokUrl.regex.tiktokRegex.test(url) ||
			TiktokUrl.regex.embededTiktokRegex.test(url) ||
			TiktokUrl.regex.tiktokIdRegex.test(url)
		)
	},
}
