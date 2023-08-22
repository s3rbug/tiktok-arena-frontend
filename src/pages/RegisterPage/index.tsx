import { SubmitHandler } from "react-hook-form/dist/types"
import { Navigate } from "react-router-dom"
import { Auth } from "../../components"
import { FormInputType } from "../../components"
import { useAuth } from "../../hooks/useAuth"
import { register } from "../../redux/middleware/auth"
import { useTypedDispatch } from "../../redux/store"
import { useTranslation } from "react-i18next"

export function RegisterPage() {
	const dispatch = useTypedDispatch()
	const { t } = useTranslation()
	const user = useAuth()

	const onSubmit: SubmitHandler<FormInputType> = (data) => {
		dispatch(register({ name: data.name, password: data.password }))
	}

	if (user) {
		return <Navigate replace to="/tournaments?page=1" />
	}

	return <Auth onSubmit={onSubmit} title={t("auth.register")} isRegister />
}
