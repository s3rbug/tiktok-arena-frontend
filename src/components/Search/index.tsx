import { HStack, Input, IconButton } from "@chakra-ui/react"
import { Search2Icon } from "@chakra-ui/icons"
import { Controller, useForm } from "react-hook-form"
import { tournamentActions } from "../../redux/slices/tournament/tournament"
import { useTypedDispatch, useTypedSelector } from "../../redux/store"
import { useEffect } from "react"
import { useMatch, useNavigate } from "react-router-dom"

type SearchFormType = {
	searchField: string
}

export function Search() {
	const dispatch = useTypedDispatch()

	const navigate = useNavigate()

	const isUserRoute = useMatch("/user")

	const search = useTypedSelector((state) => state.arena.search)

	const searchField = isUserRoute ? search.user : search.global

	const { handleSubmit, control, setValue, watch } = useForm<SearchFormType>({
		defaultValues: { searchField: "" },
	})

	useEffect(() => {
		if (watch("searchField") !== searchField) {
			setValue("searchField", searchField || "")
		}
	}, [watch, setValue, searchField])

	function onSubmit(data: SearchFormType) {
		dispatch(
			tournamentActions.setSearchField({
				searchField: data.searchField,
				key: isUserRoute ? "user" : "global",
			})
		)

		if (isUserRoute) {
			return
		}

		if (data.searchField !== "") {
			navigate(`/tournaments?search=${data.searchField}`, { replace: true })
		} else {
			navigate("/tournaments", { replace: true })
		}
	}

	return (
		<HStack
			as={"form"}
			onSubmit={handleSubmit(onSubmit)}
			alignItems="center"
			flexGrow={1}
			maxW="300px"
		>
			<Controller
				name="searchField"
				control={control}
				render={({ field }) => (
					<Input
						{...field}
						borderColor={"blue.300"}
						variant="outline"
						placeholder={
							isUserRoute ? `Search user tournament` : "Search tournament"
						}
					/>
				)}
			/>
			<IconButton
				colorScheme="blue"
				aria-label="search"
				type="submit"
				role="group"
				icon={
					<Search2Icon
						transitionDuration={".5s"}
						transitionTimingFunction="ease-in-out"
						_groupHover={{ transform: "scale(1.2)" }}
					/>
				}
			/>
		</HStack>
	)
}
