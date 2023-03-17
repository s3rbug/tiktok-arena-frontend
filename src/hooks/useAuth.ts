import { UserType } from "../redux/slices/auth/auth.types"
import { useTypedSelector } from "./../redux/store"

export function useAuth(): UserType | null {
	const user = useTypedSelector((state) => state.auth.user)

	return user
}
