import { useCallback, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useCustomToast } from "./useCustomToast"

type PropsType = {
	currentPage: number | null
	lastPage: number | null
	searchField: string | null
	setCurrentPage: (currentPage: number) => void
	setSearchField: (search: string | null) => void
}

export const useRoutePagination = ({
	currentPage,
	lastPage,
	searchField,
	setCurrentPage,
	setSearchField,
}: PropsType) => {
	const { showToast } = useCustomToast()

	const [searchParams, setSearchParams] = useSearchParams()

	const changeCurrentPage = useCallback(
		(page: number, replace: boolean = false) => {
			// setSearchParams({ page: String(page) }, { replace })
			searchParams.set("page", String(page))
			setCurrentPage(page)
			setSearchParams(searchParams)
		},
		[setCurrentPage, searchParams, setSearchParams]
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
			if (urlCurrentPageString) {
				showToast(
					"Wrong page",
					`${urlCurrentPageString} is wrong page value! Redirected to first page`
				)
			}
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

	useEffect(() => {
		const urlSearchField = searchParams.get("search")

		if (!urlSearchField && searchField) {
			setSearchField(null)
		}

		if (urlSearchField && !searchField) {
			setSearchField(urlSearchField)
		}
	}, [searchParams, setSearchField, searchField])

	return { changeCurrentPage }
}
