import { SubmitHandler } from "react-hook-form"
import { Navigate } from "react-router-dom"
import { Auth } from "../../components"
import { FormInputType } from "../../components"
import { useAuth } from "../../hooks/useAuth"
import { login } from "../../redux/middleware/auth"
import { useTypedDispatch } from "../../redux/store"

export function LoginPage() {
	const dispatch = useTypedDispatch()
	const user = useAuth()

	const onSubmit: SubmitHandler<FormInputType> = (data) => {
		dispatch(login({ name: data.name, password: data.password }))
	}

	if (user) {
		return <Navigate replace to="/tournaments" />
	}

	return <Auth onSubmit={onSubmit} title={"Login"}></Auth>
}
