import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { LanguageIcon } from "../../assets/chakraIcons"
import { LOCALS } from "../../redux/slices/ui/ui.types"
import { uiActions } from "../../redux/slices/ui/ui"
import { useTypedDispatch } from "../../redux/store"
import { useTranslation } from "react-i18next"

export function LanguageMenu() {
	const dispatch = useTypedDispatch()
	const { i18n } = useTranslation()

	function changeLanguage(language: LOCALS) {
		i18n.changeLanguage(language)
		dispatch(uiActions.setLanguage({ language }))
	}

	return (
		<Menu isLazy>
			<MenuButton as={Button} colorScheme="blue">
				<LanguageIcon w={6} h={6} />
			</MenuButton>
			<MenuList>
				<MenuItem onClick={() => changeLanguage(LOCALS.EN)}>English</MenuItem>
				<MenuItem onClick={() => changeLanguage(LOCALS.UA)}>
					Українська
				</MenuItem>
			</MenuList>
		</Menu>
	)
}
