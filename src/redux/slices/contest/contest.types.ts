export type ContestStateType = {
	currentContest: ContestType
	contestProgress: ContestProgressType
}

export type ContestProgressType = {
	roundIndex: number
	matchIndex: number
	isContestOver: boolean
	isContestInProgress: boolean
}

export type ContestType = {
	countMatches: number
	rounds: ContestRound[]
}

export type ContestRound = {
	round: number
	matches: ContestMatch[]
}

export type OptionType = {
	tiktokURL?: string
	matchID?: string
}

export type ContestMatch = {
	matchID: string
	firstOption: OptionType
	secondOption: OptionType
	firstOptionChosen?: boolean
}
