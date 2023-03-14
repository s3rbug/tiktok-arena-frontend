import { SubmitHandler } from "react-hook-form/dist/types"
import { Auth } from "../../components"
import { FormInputType } from "../../components"

export function RegisterPage() {
	const onSubmit: SubmitHandler<FormInputType> = (data) => {
		console.log(data)
	}
	return <Auth onSubmit={onSubmit} title={"Register"} isRegister />
}
