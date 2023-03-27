export const TiktokUrl = {
	regex: {
		casual: /^https:\/\/www\.tiktok\.com\/@.+\/video\/[0-9]+\??.*$/,
		embeded: /^https:\/\/www\.tiktok\.com\/embed\/v2\/[0-9]+$/,
		id: /^[0-9]+$/,
	},
	toEmbeded: (url: string): string => {
		if (TiktokUrl.regex.casual.test(url)) {
			let tiktokId
			if (url.includes("?")) {
				tiktokId = url.substring(url.lastIndexOf("/") + 1, url.indexOf("?"))
			} else {
				tiktokId = url.substring(url.lastIndexOf("/") + 1)
			}
			return `https://www.tiktok.com/embed/v2/${tiktokId}`
		}
		if (TiktokUrl.regex.id.test(url)) {
			return `https://www.tiktok.com/embed/v2/${url}`
		}
		return url
	},
	isCorrectUrl: (url: string): boolean => {
		return (
			TiktokUrl.regex.casual.test(url) ||
			TiktokUrl.regex.embeded.test(url) ||
			TiktokUrl.regex.id.test(url)
		)
	},
}
