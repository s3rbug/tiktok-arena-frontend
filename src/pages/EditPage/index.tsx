import { editTournament } from "../../redux/middleware/tournament"
import { TournamentFormType } from "../../redux/slices/tournament/tournament.types"
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

export function EditPage() {
	const { tournamentId } = useParams()

	const user = useAuth()

	const dispatch = useTypedDispatch()

	useEffect(() => {
		if (tournamentId && user?.token) {
			dispatch(getTikToks({ data: { tournamentId }, token: user.token }))
			dispatch(getTournament({ tournamentId }))
		}

		return () => {
			dispatch(tournamentActions.setTiktoks({ newTiktoks: null }))
			dispatch(tournamentActions.setTournament({ tournament: null }))
		}
	}, [dispatch, tournamentId, user?.token])

	const tournament = useTypedSelector((state) => state.arena?.tournament)

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

	const defaultValue = {
		name: tournament.Name,
		tiktoks: [...tiktoks.map((tiktok) => ({ url: tiktok.URL }))],
	}

	function onSubmit(data: TournamentFormType) {
		if (user?.token && tournamentId) {
			dispatch(
				editTournament({
					data: {
						...data,
						size: data.tiktoks.length,
					},
					token: user.token,
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
			serverError={serverError}
			changeStoreOnSubmit={onSubmit}
			clearStoreErrors={clearStoreErrors}
			defaultValues={defaultValue}
		/>
	)
}
