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
	CountMatches: number
	Rounds: ContestRound[]
}

export type ContestRound = {
	Round: number
	Matches: ContestMatch[]
}

export type ContestMatch = {
	MatchID: string
	FirstOption: {
		TiktokURL?: string
		MatchID?: string
	}
	SecondOption: {
		TiktokURL?: string
		MatchID?: string
	}
	firstOptionChosen?: boolean
}
