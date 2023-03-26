import { useCallback, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useCustomToast } from "./useCustomToast"

type PropsType = {
	currentPage: number | null
	lastPage: number | null
	setCurrentPage: (currentPage: number) => void
}

export const useRoutePagination = ({
	currentPage,
	lastPage,
	setCurrentPage,
}: PropsType) => {
	const { showToast } = useCustomToast()

	const [searchParams, setSearchParams] = useSearchParams()

	const changeCurrentPage = useCallback(
		(page: number) => {
			setSearchParams({ page: String(page) }, { replace: true })
			setCurrentPage(page)
		},
		[setCurrentPage, setSearchParams]
	)

	useEffect(() => {
		const urlCurrentPageString = searchParams.get("page")
		const urlCurrentPage = Number(urlCurrentPageString)

		if (
			currentPage === null ||
			lastPage == null ||
			currentPage === urlCurrentPage
		) {
			return
		}

		const isPositiveInteger = (value: string | null) =>
			value && /^\d+$/.test(value)

		if (
			isPositiveInteger(urlCurrentPageString) &&
			urlCurrentPage >= 1 &&
			urlCurrentPage <= lastPage
		) {
			setCurrentPage(urlCurrentPage)
		} else {
			showToast(
				"Wrong page",
				`${urlCurrentPageString} is wrong page value! Redirected to first page`
			)
			changeCurrentPage(1)
		}
	}, [
		showToast,
		setCurrentPage,
		currentPage,
		changeCurrentPage,
		lastPage,
		searchParams,
	])

	return { changeCurrentPage }
}
