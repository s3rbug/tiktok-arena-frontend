import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
} from "@chakra-ui/react"
import { RefObject } from "react"
import { useTranslation } from "react-i18next"

type PropsType = {
	isOpen: boolean

	title: string
	description: string
	submitButtonText: string
	submitButtonColorScheme: string
	onSubmit: () => void
	onClose: () => void
	destructiveRef: RefObject<HTMLButtonElement>
}

export const ConfirmDialog = ({
	isOpen,
	title,
	description,
	submitButtonText,
	submitButtonColorScheme,
	onSubmit,
	onClose,
	destructiveRef,
}: PropsType) => {
	const { t } = useTranslation()
	function handleSubmit() {
		onSubmit()
		onClose()
	}

	return (
		<AlertDialog
			leastDestructiveRef={destructiveRef}
			isOpen={isOpen}
			onClose={onClose}
		>
			<AlertDialogOverlay>
				<AlertDialogContent>
					<AlertDialogHeader fontSize="lg" fontWeight="bold">
						{title}
					</AlertDialogHeader>

					<AlertDialogBody>{description}</AlertDialogBody>

					<AlertDialogFooter>
						<Button onClick={() => onClose()}>
							{t("dialog-buttons.cancel")}
						</Button>
						<Button
							colorScheme={submitButtonColorScheme}
							onClick={handleSubmit}
							ml={3}
						>
							{submitButtonText}
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	)
}
