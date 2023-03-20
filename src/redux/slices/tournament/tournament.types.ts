export type TournamentType = {
	ID: string
	Name: string
	Size: number
	UserId: string
	checked?: boolean
}

export enum TournamentFormat {
	SINGLE_ELIMINATION = "single_elimination",
	KING_OF_THE_HILL = "king_of_the_hill",
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

export type ContestProgressType = {
	roundIndex: number
	matchIndex: number
	isContestOver: boolean
}

export type TournamentFormType = {
	name: string
	tiktoks: {
		url: string
	}[]
}

export type TikTok = {
	TournamentID: string
	URL: string
	wins: number
	AvgPoints: number
	TimesPlayed: number
}
