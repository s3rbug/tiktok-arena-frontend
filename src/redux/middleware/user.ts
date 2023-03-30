import { authActions } from "./../slices/auth/auth"
import { getToken } from "../../api/jsonFetch"
import { userApi } from "../../api/user"
import { AppThunkType } from "../store"

export const changeUserPicture =
	({ photoURL }: { photoURL: string }): AppThunkType =>
	async (dispatch, getState) => {
		const token = getToken(getState)
		if (!token) {
			return
		}
		return userApi
			.changePicture({ photoURL, token })
			.then(() => {
				dispatch(authActions.changeUserPicture({ photoURL }))
			})
			.catch((error) => {
				console.log(error)
			})
	}
