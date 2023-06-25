import { useState } from 'react'
import { USER_ROLES } from '../../constants/userRoles'
import { updateUser } from '../../lib/api/usersApi'
import { useEditForm } from '../../lib/hooks/useEditForm'
import { Button } from '../buttons/Button'
import { InputCheckbox } from '../forms/InputCheckbox'
import { InputText } from '../forms/InputText'
import { InputTextAsync } from '../forms/InputTextAsync'
import { Select } from '../forms/Select'
import style from './UserEditForm.module.css'

export const UserEditForm = ({ onSuccess, user }) => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const {
		name,
		username,
		role,
		active,
		setName,
		setUsername,
		setRole,
		setActive,
		isFormInvalid
	} = useEditForm(user)

	return (
		<form
			onSubmit={ev =>
				handleSubmit(
					ev,
					{
						id: user.id,
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
					onChange={ev => setName(ev.target.value)}
					error={name.error}
				/>
				<InputTextAsync
					className={style.input}
					label='Username'
					placeholder='johndoe'
					value={username.value}
					onChange={ev => setUsername(ev.target.value)}
					error={username.error}
					loading={username.loading}
					success={
						username.value !== user.username &&
						!username.loading &&
						!username.error
					}
				/>
			</div>
			<div className={style.row}>
				<Select value={role} onChange={ev => setRole(ev.target.value)}>
					<option value={USER_ROLES.TEACHER}>Profesor</option>
					<option value={USER_ROLES.STUDENT}>Estudiante</option>
					<option value={USER_ROLES.OTHER}>Otro</option>
				</Select>
				<div className={style.active}>
					<InputCheckbox
						checked={active}
						onChange={ev => setActive(ev.target.checked)}
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
