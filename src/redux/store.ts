import { AnyAction } from "redux"
import { ThunkAction } from "redux-thunk"
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { tournamentReducer } from "./slices/tournament"
import { authReducer } from "./slices/auth"

export const store = configureStore({
	reducer: { arena: tournamentReducer, auth: authReducer },
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
