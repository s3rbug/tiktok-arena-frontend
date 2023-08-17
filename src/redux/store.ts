import { paginationReducer } from "./slices/pagination/pagination"
import { uiReducer } from "./slices/ui/ui"
import { AnyAction } from "redux"
import { ThunkAction } from "redux-thunk"
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { tournamentReducer } from "./slices/tournament/tournament"
import { authReducer } from "./slices/auth/auth"
import { contestReducer } from "./slices/contest/contest"

export const store = configureStore({
	reducer: {
		arena: tournamentReducer,
		contest: contestReducer,
		auth: authReducer,
		ui: uiReducer,
		pagination: paginationReducer,
	},
})

export type AppDispatchType = typeof store.dispatch
export type AppStateType = ReturnType<typeof store.getState>

export type AppThunkType<ReturnType = Promise<void>> = ThunkAction<
	ReturnType,
	AppStateType,
	unknown,
	AnyAction
>

export const useTypedSelector: TypedUseSelectorHook<AppStateType> = useSelector
export const useTypedDispatch = () => useDispatch<AppDispatchType>()
