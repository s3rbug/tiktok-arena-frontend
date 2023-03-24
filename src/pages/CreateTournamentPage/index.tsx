import { createTournament } from "../../redux/middleware/tournament"
import { TournamentFormType } from "../../redux/slices/tournament/tournament.types"
import { uiActions } from "../../redux/slices/ui/ui"
import { useTypedDispatch, useTypedSelector } from "../../redux/store"
import { TikToksForm } from "../../components/TikToksForm"

export function CreateTournamentPage() {
	const dispatch = useTypedDispatch()

	const serverError = useTypedSelector(
		(state) => state.ui.errors?.createTournament
	)

	const success = useTypedSelector(
		(state) => state.ui.success?.createTournament
	)

	function onSubmit(data: TournamentFormType) {
		console.log(data)

		dispatch(
			createTournament({
				data: { ...data, size: data.tiktoks.length },
			})
		)
	}

	function clearStoreErrors() {
		dispatch(uiActions.setSuccess({ success: { createTournament: null } }))
		dispatch(uiActions.setError({ errors: { createTournament: null } }))
	}

	const defaultValue = {
		name: "",
		tiktoks: [
			{ url: "", name: "" },
			{ url: "", name: "" },
			{ url: "", name: "" },
			{ url: "", name: "" },
		],
	}

	return (
		<TikToksForm
			submitText="Create tournament"
			success={success}
			successRedirect={"/user"}
			serverError={serverError}
			changeStoreOnSubmit={onSubmit}
			clearStoreErrors={clearStoreErrors}
			defaultValues={defaultValue}
		/>
	)
}
