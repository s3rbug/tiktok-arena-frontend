import { SubmitHandler } from "react-hook-form"
import { Navigate, redirect, useNavigate } from "react-router-dom"
import { Auth } from "../../components"
import { FormInputType } from "../../components"
import { login } from "../../redux/middleware/auth"
import { useTypedDispatch, useTypedSelector } from "../../redux/store"

export function LoginPage() {
	const dispatch = useTypedDispatch()
	const token = useTypedSelector((state) => state.auth.token)

	const onSubmit: SubmitHandler<FormInputType> = (data) => {
		dispatch(login({ name: data.name, password: data.password }))
	}

	if (token) {
		return <Navigate replace to="/tournaments" />
	}

	return <Auth onSubmit={onSubmit} title={"Login"}></Auth>
}
