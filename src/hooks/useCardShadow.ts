import { useState } from "react"

type PropsType = {
	transition?: string
	transitionDuration?: string
	shadow: {
		default: string
		focused: string
	}
}

export const useCardShadow = ({
	transition,
	transitionDuration,
	shadow,
}: PropsType) => {
	const [focus, setFocus] = useState(false)

	const shadowStyleProps = {
		boxShadow: focus ? shadow.focused : shadow.default,
		transition: transition ? transition : "ease-in-out",
		transitionDuration: transitionDuration ? transitionDuration : ".4s",
		_hover: {
			boxShadow: shadow.focused,
		},
	}

	return { shadowStyleProps, setFocus, focus }
}
