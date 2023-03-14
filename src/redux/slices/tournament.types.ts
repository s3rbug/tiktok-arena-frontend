export type TournamentType = {
	ID: string
	Name: string
	Size: TournamentSize
	UserId: string
}

export enum TournamentFormat {
	SINGLE_ELIMINATION = "single_elimination",
}

export type TournamentSize = 8 | 16 | 32

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

export type ContestProgressType = {
	roundIndex: number
	matchIndex: number
	isContestOver: boolean
}
