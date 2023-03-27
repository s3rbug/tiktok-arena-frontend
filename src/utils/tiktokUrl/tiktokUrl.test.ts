import { TiktokUrl } from "./tiktokUrl"

describe("utilities for using tiktok URL", () => {
	const { casual, embeded, id } = TiktokUrl.regex
	const { toEmbeded } = TiktokUrl

	it("casual tiktok URL regex", () => {
		expect(
			casual.test("https://www.tiktok.com/@user/video/7204073653393100037")
		).toBe(true)
		expect(casual.test("https://www.tiktok.com/@user/video/1233333")).toBe(true)
		expect(casual.test("https://www.tiktok.com/@user/video/1")).toBe(true)
		expect(
			casual.test("https://www.tiktok.com/user/video/7214073653393100037")
		).toBe(false)
		expect(casual.test("www.tiktok.com/@user/video/7214073653393100037")).toBe(
			false
		)
		expect(
			casual.test("https:/www.tiktok.com/@user/video/7214073653393100037")
		).toBe(false)
		expect(
			casual.test("https://www.tiktok.com/video/7214073653393100037")
		).toBe(false)
		expect(
			casual.test("https://www.tiktok.com/embed/v2/7201108451286633722")
		).toBe(false)
		expect(
			casual.test(
				"https://www.tiktok.com/@username/video/3131231?is_from_webapp=1&sender_device=pc"
			)
		).toBe(true)
	})
	it("embeded tiktok URL regex", () => {
		expect(
			embeded.test("https://www.tiktok.com/embed/v2/7201108451286633722")
		).toBe(true)
		expect(embeded.test("https://www.tiktok.com/embed/v2/123333")).toBe(true)
		expect(embeded.test("https://www.tiktok.com/embed/v2/1")).toBe(true)
		expect(embeded.test("www.tiktok.com/embed/v2/123333")).toBe(false)
		expect(embeded.test("https://www.tiktok.com/embed/123333")).toBe(false)
		expect(embeded.test("https://www.tiktok.com/123333")).toBe(false)
		expect(
			embeded.test("https://www.tiktok.com/@user/video/7204073653393100037")
		).toBe(false)
	})
	it("tiktok id regex", () => {
		expect(id.test("123123")).toBe(true)
		expect(
			id.test("https://www.tiktok.com/@user/video/7204073653393100037")
		).toBe(false)
		expect(id.test("https://www.tiktok.com/embed/v2/123333")).toBe(false)
	})
	it("to embeded function", () => {
		expect(
			toEmbeded(
				"https://www.tiktok.com/@username/video/7201108451286633722?is_from_webapp=1&sender_device=pc"
			)
		).toBe("https://www.tiktok.com/embed/v2/7201108451286633722")
		expect(
			toEmbeded("https://www.tiktok.com/@username/video/7201108451286633722")
		).toBe("https://www.tiktok.com/embed/v2/7201108451286633722")
	})
})
