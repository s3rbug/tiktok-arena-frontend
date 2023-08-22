import { Avatar, Box, Flex, FlexProps, Text } from "@chakra-ui/react"
import { ChangeEvent } from "react"
import { imageApi } from "../../../api/image/image"
import { PhotoIcon } from "../../../assets/chakraIcons"
import { changeUserPicture } from "../../../redux/middleware/user"
import { useTypedDispatch, useTypedSelector } from "../../../redux/store"
import { useTranslation } from "react-i18next"

type PropsType = {
	avatarSrc: string
	isProfileOwner?: boolean
} & FlexProps

export const ProfileHeader = ({
	avatarSrc,
	isProfileOwner,
	...flexProps
}: PropsType) => {
	const dispatch = useTypedDispatch()
	const { t } = useTranslation()

	const username = useTypedSelector(
		(state) => state.arena.userTournamentsData?.user?.name || ""
	)

	const totalTournaments = useTypedSelector(
		(state) => state.arena.userTournamentsData?.totalTournamentCount || 0
	)

	async function changePicture(event: ChangeEvent<HTMLInputElement>) {
		const fileImage = event.target?.files?.[0]
		if (!fileImage) {
			return
		}
		imageApi.saveImageToCloud(fileImage).then((url) => {
			if (url) {
				dispatch(changeUserPicture({ photoURL: url }))
			}
		})
	}
	return (
		<Flex {...flexProps}>
			<Avatar
				as="label"
				role="group"
				position={"relative"}
				h={"250px"}
				w={"fit-content"}
				src={avatarSrc}
			>
				{isProfileOwner && (
					<>
						<input
							style={{ display: "none" }}
							onChange={changePicture}
							type="file"
							name="image"
							accept="image/png, image/jpeg"
						/>
						<Box
							position={"absolute"}
							borderRadius={"full"}
							backgroundColor="white"
							p={2}
							bottom={0}
							right={3}
							_groupHover={{ opacity: 1, bottom: 3 }}
							opacity={0}
							transition="opacity .25s ease-in, bottom .4s ease-in-out"
							border="2px solid black"
						>
							<PhotoIcon boxSize={8} color="black" />
						</Box>
					</>
				)}
			</Avatar>
			<Flex flexDirection={"column"} gap={2}>
				<Text fontSize={"lg"}>
					{`${t("profile.name")}: `}
					<b>{username}</b>
				</Text>
				<Text fontSize={"lg"}>
					{`${t("profile.tournament-count")}: `}
					<b>{totalTournaments}</b>
				</Text>
			</Flex>
		</Flex>
	)
}
