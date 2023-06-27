import { useContext, useState } from 'react'
import { USER_ROLES } from '../../constants/userRoles'
import {
	nameChanged,
	usernameChanged
} from '../../lib/actions/createFormActions'
import { createUser } from '../../lib/api/usersApi'
import { UsersFormContext } from '../../lib/context/UsersFormContext'
import { useCreateForm } from '../../lib/hooks/useCreateForm'
import { Button } from '../buttons/Button'
import { InputCheckbox } from '../forms/InputCheckbox'
import { InputText } from '../forms/InputText'
import { InputTextAsync } from '../forms/InputTextAsync'
import { Select } from '../forms/Select'
import style from './UserCreateForm.module.css'

export const UserCreateForm = () => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const { name, username, dispatchFormValues, isFormInvalid } = useCreateForm()
	const { onSuccess } = useContext(UsersFormContext)

	return (
		<form
			onSubmit={ev =>
				handleSubmit(ev, name, username, setIsSubmitting, onSuccess)
			}
		>
			<div className={style.row}>
				<InputText
					className={style.input}
					label='Nombre'
					placeholder='John Doe'
					value={name.value}
					error={name.error}
					onChange={ev => dispatchFormValues(nameChanged(ev.target.value))}
				/>
				<InputTextAsync
					className={style.input}
					label='Username'
					placeholder='johndoe'
					value={username.value}
					error={username.error}
					loading={username.loading}
					success={username.value && !username.loading && !username.error}
					onChange={ev => dispatchFormValues(usernameChanged(ev.target.value))}
				/>
			</div>
			<div className={style.row}>
				<Select name='role'>
					<option value={USER_ROLES.TEACHER}>Profesor</option>
					<option value={USER_ROLES.STUDENT}>Estudiante</option>
					<option value={USER_ROLES.OTHER}>Otro</option>
				</Select>
				<div className={style.active}>
					<InputCheckbox name='active' />
					<span>¿Activo?</span>
				</div>
				<Button type='submit' disabled={isFormInvalid || isSubmitting}>
					{isSubmitting ? 'Cargando...' : 'Crear usuario'}
				</Button>
			</div>
		</form>
	)
}

const handleSubmit = async (ev, name, username, setIsSubmitting, onSuccess) => {
	ev.preventDefault()

	setIsSubmitting(true)

	const user = {
		id: crypto.randomUUID(),
		name: name.value,
		username: username.value,
		role: ev.target.role.value,
		active: ev.target.active.checked
	}

	const success = await createUser(user)

	if (success) {
		onSuccess()
	} else {
		setIsSubmitting(false)
	}
}
