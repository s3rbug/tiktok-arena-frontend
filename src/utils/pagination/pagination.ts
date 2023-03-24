function range(from: number, to: number): number[] {
	return Array.from({ length: to - from + 1 }, (_, index) => from + index)
}

export function getPaginationItems(
	currentPage: number,
	lastPage: number,
	maxLength: number
) {
	// handle lastPage less than maxLength
	if (lastPage <= maxLength) {
		return [...range(1, lastPage)]
	}

	// handle ellipsis logics

	const firstPage = 1
	const confirmedPagesCount = 3
	const deductedMaxLength = maxLength - confirmedPagesCount
	const sideLength = deductedMaxLength / 2

	// handle ellipsis in the middle
	if (
		currentPage - firstPage < sideLength ||
		lastPage - currentPage < sideLength
	) {
		return [
			...range(1, sideLength + firstPage),
			NaN,
			...range(lastPage - sideLength, lastPage),
		]
	}

	// handle two ellipsis
	if (
		currentPage - firstPage >= deductedMaxLength &&
		lastPage - currentPage >= deductedMaxLength
	) {
		const deductedSideLength = sideLength - 1

		return [
			1,
			NaN,
			...range(
				currentPage - deductedSideLength,
				currentPage + deductedSideLength
			),
			NaN,
			lastPage,
		]
	}

	// handle ellipsis not in the middle
	const isNearFirstPage = currentPage - firstPage < lastPage - currentPage

	if (isNearFirstPage) {
		return [
			...range(1, currentPage + 1),
			NaN,
			...range(lastPage - (maxLength - currentPage - 3), lastPage),
		]
	}

	return [
		...range(1, maxLength - (lastPage - currentPage + 3)),
		NaN,
		...range(currentPage - 1, lastPage),
	]
}
