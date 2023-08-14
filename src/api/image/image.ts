import { toBase64 } from "../../utils/toBase64/toBase64"
import { jsonFetch } from "../jsonFetch"

export const imageApi = {
	saveImageToCloud: async (image: File) => {
		const apiKey = import.meta.env.ENV_IMAGE_CLOUD_API_KEY
		if (!apiKey) {
			return
		}

		let imageBase64 = await toBase64(image)
		if (imageBase64.includes(",")) {
			imageBase64 = imageBase64.substring(imageBase64.lastIndexOf(",") + 1)
		}

		return jsonFetch
			.post<{ data: { url: string } }>(
				`https://api.imgbb.com/1/upload?key=${apiKey}`,
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
					body: new URLSearchParams({ image: imageBase64 }),
				},
				true
			)
			.then((response) => {
				return response?.data.url
			})
	},
}
