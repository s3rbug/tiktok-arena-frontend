import "i18next"
import en from "../i18n/en/index.json"
import ua from "../i18n/ua/index.json"

declare module "i18next" {
	interface CustomTypeOptions {
		defaultNS: "en"
		resources: {
			en: typeof en
			ua: typeof ua
		}
	}
}
