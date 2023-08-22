import i18next from "i18next"
import { initReactI18next } from "react-i18next"
// import LanguageDetector from "i18next-browser-languagedetector"
import { LOCALS } from "../redux/slices/ui/ui.types"
import en from "./en/index.json"
import ua from "./ua/index.json"
import { uiActions } from "../redux/slices/ui/ui"
import { store } from "../redux/store"

export const resources = {
	[LOCALS.EN]: {
		translation: en,
	},
	[LOCALS.UA]: {
		translation: ua,
	},
} as const

i18next
	.use(initReactI18next)
	// .use(LanguageDetector)
	.init(
		{
			resources,
			fallbackLng: LOCALS.EN,
			debug: true,
		},
		() => {
			store.dispatch(
				uiActions.setLanguage({ language: i18next.language as LOCALS })
			)
		}
	)

if (i18next.services?.formatter) {
	i18next.services.formatter.add("lowercase", (value: string) => {
		return value?.toLowerCase()
	})
	i18next.services.formatter.add("uppercase", (value: string) => {
		return value?.toUpperCase()
	})
}

export default i18next
