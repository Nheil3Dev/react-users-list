import { useContext, useState } from 'react'
import { USER_ROLES } from '../../constants/userRoles'
import {
	activeChanged,
	nameChanged,
	roleChanged,
	usernameChanged
} from '../../lib/actions/editFormActions'
import { updateUser } from '../../lib/api/usersApi'
import { UsersFormContext } from '../../lib/context/UsersFormContext'
import { useEditForm } from '../../lib/hooks/useEditForm'
import { Button } from '../buttons/Button'
import { InputCheckbox } from '../forms/InputCheckbox'
import { InputText } from '../forms/InputText'
import { InputTextAsync } from '../forms/InputTextAsync'
import { Select } from '../forms/Select'
import style from './UserEditForm.module.css'

export const UserEditForm = () => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const { currentUser, onSuccess } = useContext(UsersFormContext)
	const { name, username, role, active, dispatchFormValues, isFormInvalid } =
		useEditForm(currentUser)

	return (
		<form
			onSubmit={ev =>
				handleSubmit(
					ev,
					{
						id: currentUser.id,
						name: name.value,
						username: username.value,
						role,
						active
					},
					setIsSubmitting,
					onSuccess
				)
			}
		>
			<div className={style.row}>
				<InputText
					className={style.input}
					label='Nombre'
					placeholder='John Doe'
					value={name.value}
					onChange={ev => dispatchFormValues(nameChanged(ev.target.value))}
					error={name.error}
				/>
				<InputTextAsync
					className={style.input}
					label='Username'
					placeholder='johndoe'
					value={username.value}
					onChange={ev =>
						dispatchFormValues(
							usernameChanged(ev.target.value, currentUser.username)
						)
					}
					error={username.error}
					loading={username.loading}
					success={
						username.value !== currentUser.username &&
						!username.loading &&
						!username.error
					}
				/>
			</div>
			<div className={style.row}>
				<Select
					value={role}
					onChange={ev => dispatchFormValues(roleChanged(ev.target.value))}
				>
					<option value={USER_ROLES.TEACHER}>Profesor</option>
					<option value={USER_ROLES.STUDENT}>Estudiante</option>
					<option value={USER_ROLES.OTHER}>Otro</option>
				</Select>
				<div className={style.active}>
					<InputCheckbox
						checked={active}
						onChange={ev => dispatchFormValues(activeChanged(ev.target.value))}
					/>
					<span>¿Activo?</span>
				</div>
				<Button type='submit' disabled={isFormInvalid || isSubmitting}>
					{isSubmitting ? 'Cargando...' : 'Editar usuario'}
				</Button>
			</div>
		</form>
	)
}

const handleSubmit = async (ev, user, setIsSubmitting, onSuccess) => {
	ev.preventDefault()

	setIsSubmitting(true)

	const success = await updateUser(user)

	if (success) {
		onSuccess()
	} else {
		setIsSubmitting(false)
	}
}
