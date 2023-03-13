export type TournamentType = {
	ID: string
	Name: string
	Size: TournamentSize
	UserId: string
}

export enum TournamentFormat {
	SINGLE_ELIMINATION = "single elimination",
}

export type TournamentSize = 8 | 16 | 32

export type ContestType = {
	ContestSize: number
	Rounds: ContestRound[]
}

export type ContestRound = {
	Round: number
	Matches: ContestMatch[]
}

export type ContestMatch = {
	MatchID: string
	FirstOption: {
		TikTokURL?: string
		OptionID?: string
	}
	SecondOption: {
		TikTokURL?: string
		OptionID?: string
	}
	firstOptionChosen?: boolean
}

export type ContestProgressType = {
	roundIndex: number
	matchIndex: number
	isContestOver: boolean
}
