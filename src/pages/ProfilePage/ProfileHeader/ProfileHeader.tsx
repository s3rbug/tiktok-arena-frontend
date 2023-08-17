import { Avatar, Box, Flex, FlexProps, Text } from "@chakra-ui/react"
import { ChangeEvent } from "react"
import { imageApi } from "../../../api/image/image"
import { PhotoIcon } from "../../../assets/chakraIcons"
import { changeUserPicture } from "../../../redux/middleware/user"
import { useTypedDispatch } from "../../../redux/store"

type PropsType = {
	avatarSrc: string
	username: string
	totalTournaments: number
	isEditable?: boolean
} & FlexProps

export const ProfileHeader = ({
	avatarSrc,
	username,
	totalTournaments,
	isEditable,
	...flexProps
}: PropsType) => {
	const dispatch = useTypedDispatch()

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
				{isEditable && (
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
					Name: <b>{username}</b>
				</Text>
				<Text fontSize={"lg"}>
					Tournament count: <b>{totalTournaments}</b>
				</Text>
			</Flex>
		</Flex>
	)
}
