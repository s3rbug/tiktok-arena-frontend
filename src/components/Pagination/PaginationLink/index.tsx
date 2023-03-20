import { Button } from "@chakra-ui/react"
export type PropsType = {
	isDisabled?: boolean
	isCurrent?: boolean
	onClick?: () => void
	children: React.ReactNode
}

export default function PaginationLink({
	isDisabled,
	children,
	onClick,
	isCurrent,
}: PropsType) {
	return (
		<Button
			colorScheme={"blue"}
			variant={isCurrent ? "solid" : "outline"}
			onClick={onClick}
			isDisabled={isDisabled}
			_disabled={{ cursor: "default", color: "gray" }}
		>
			{children}
		</Button>
	)
}
