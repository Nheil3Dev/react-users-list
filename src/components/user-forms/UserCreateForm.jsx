import { useState } from 'react'
import { USER_ROLES } from '../../constants/userRoles'
import { useCreateForm } from '../../lib/hooks/useCreateForm'
import { Button } from '../buttons/Button'
import { IconButton } from '../buttons/IconButton'
import { InputCheckbox } from '../forms/InputCheckbox'
import { InputText } from '../forms/InputText'
import { InputTextAsync } from '../forms/InputTextAsync'
import { Select } from '../forms/Select'
import CrossIcon from '../icons/CrossIcon'
import style from './UserCreateForm.module.css'

export const UserCreateForm = ({ setFiltersForm }) => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const { name, username, setName, setUsername } = useCreateForm()

	const isDisabled =
		!name.value ||
		!username.value ||
		name.error ||
		username.error ||
		username.loading ||
		isSubmitting

	return (
		<div className={style.wrapper}>
			<IconButton
				className={style.close}
				icon={CrossIcon}
				onClick={setFiltersForm}
				filled
			/>
			<form
				onSubmit={ev =>
					handleSubmit(ev, name, username, setIsSubmitting, setFiltersForm)
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
						success={username.value && !username.loading && !username.error}
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
					<Button type='submit' disabled={isDisabled}>
						{isSubmitting ? 'Cargando...' : 'Crear usuario'}
					</Button>
				</div>
			</form>
		</div>
	)
}

const handleSubmit = async (
	ev,
	name,
	username,
	setIsSubmitting,
	setFiltersForm
) => {
	ev.preventDefault()

	setIsSubmitting(true)

	const user = {
		id: crypto.randomUUID(),
		name: name.value,
		username: username.value,
		role: ev.target.role.value,
		active: ev.target.active.checked
	}

	const res = await fetch('http://localhost:4000/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(user)
	})

	if (res.ok) {
		// TODO: Actualizar los usuarios
		setFiltersForm()
	} else {
		setIsSubmitting(false)
	}
}
