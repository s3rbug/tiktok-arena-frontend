import { jsonFetch } from "./jsonFetch"

export const tiktokApi = {
	getName: ({ url }: { url: string }) => {
		return jsonFetch.get<{ title: string }>(
			`https://www.tiktok.com/oembed?url=${url}`,
			{},
			true
		)
	},
}
