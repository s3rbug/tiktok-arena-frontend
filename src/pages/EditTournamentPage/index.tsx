import { editTournament } from "../../redux/middleware/tournament"
import { uiActions } from "../../redux/slices/ui/ui"
import { useTypedDispatch, useTypedSelector } from "../../redux/store"
import { TikToksForm } from "../../components/TikToksForm"
import { useParams } from "react-router-dom"
import { NotFoundPage } from "../NotFoundPage"
import { useEffect } from "react"
import { getTikToks, getTournament } from "../../redux/middleware/tournament"
import { useAuth } from "../../hooks/useAuth"
import { tournamentActions } from "../../redux/slices/tournament/tournament"
import { Loading } from "../../components"
import { CreateTournamentPayloadType } from "../../api/tournament/tournament.types"
import { TournamentFormType } from "../../redux/slices/tournament/tournament.types"

export function EditTournamentPage() {
	const { tournamentId } = useParams()

	const user = useAuth()

	const dispatch = useTypedDispatch()

	useEffect(() => {
		if (tournamentId && user?.token) {
			dispatch(getTikToks({ data: { tournamentId } }))
			dispatch(getTournament({ tournamentId }))
		}

		return () => {
			dispatch(tournamentActions.setTiktoks({ newTiktoks: null }))
			dispatch(tournamentActions.setTournament({ tournament: null }))
		}
	}, [dispatch, tournamentId, user?.token])

	const tournament = useTypedSelector(
		(state) => state.arena?.tournamentData?.tournament
	)

	const tiktoks = useTypedSelector((state) => state.arena?.tiktoks)

	const serverError = useTypedSelector(
		(state) => state.ui.errors?.editTournament
	)

	const success = useTypedSelector((state) => state.ui.success?.editTournament)

	if (!tournamentId) {
		return <NotFoundPage />
	}

	if (!user || !tournament || !tiktoks) {
		return <Loading />
	}

	const defaultValue: TournamentFormType = {
		name: tournament.name,
		photoURL: tournament.photoURL || null,
		isPrivate: tournament.isPrivate,
		tiktoks: [
			...tiktoks.map((tiktok) => ({ url: tiktok.url, name: tiktok.name })),
		],
	}

	function onSubmit(data: CreateTournamentPayloadType) {
		if (user?.token && tournamentId) {
			dispatch(
				editTournament({
					data: {
						...data,
						size: data.tiktoks.length,
						photoURL: data.photoURL || null,
					},
					tournamentId,
				})
			)
		}
	}

	function clearStoreErrors() {
		dispatch(uiActions.setSuccess({ success: { editTournament: null } }))
		dispatch(uiActions.setError({ errors: { editTournament: null } }))
	}

	return (
		<TikToksForm
			submitText="Edit tournament"
			warning="Be carefull! Changing TikTok URL resets its tournament's statistics."
			success={success}
			successRedirect={"/user"}
			serverError={serverError}
			changeStoreOnSubmit={onSubmit}
			clearStoreErrors={clearStoreErrors}
			defaultValues={defaultValue}
		/>
	)
}
