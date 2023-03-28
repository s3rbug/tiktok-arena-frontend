import { jsonFetch } from "./jsonFetch"

export const tiktokApi = {
	getDetails: ({ url }: { url: string }) => {
		return jsonFetch.get<{ title: string; thumbnail_url: string }>(
			`https://www.tiktok.com/oembed?url=${url}`,
			{},
			true
		)
	},
}
