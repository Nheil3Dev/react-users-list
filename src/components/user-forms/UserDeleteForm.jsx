import { useContext, useState } from 'react'
import { deleteUserById } from '../../lib/api/usersApi'
import { UsersFormContext } from '../../lib/context/UsersFormContext'
import { Button } from '../buttons/Button'
import style from './UserDeleteForm.module.css'

export const UserDeleteForm = ({ currentUser, closeModal }) => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const { onSuccess } = useContext(UsersFormContext)

	return (
		<form
			className={style.form}
			onSubmit={ev =>
				handleSubmit(ev, currentUser.id, setIsSubmitting, onSuccess, closeModal)
			}
		>
			<p className={style.text}>
				{`Estás seguro de que quieres eliminar al usuario "${currentUser.name}" `}
			</p>

			<Button type='submit' disabled={isSubmitting}>
				{isSubmitting ? 'Cargando...' : 'Eliminar usuario'}
			</Button>

			<Button
				type='button'
				onClick={closeModal}
				kind='secondary'
				disabled={isSubmitting}
			>
				{isSubmitting ? 'Cargando...' : 'Cancelar'}
			</Button>
		</form>
	)
}

const handleSubmit = async (
	ev,
	userId,
	setIsSubmitting,
	onSuccess,
	closeModal
) => {
	ev.preventDefault()

	setIsSubmitting(true)

	const success = await deleteUserById(userId)

	if (success) {
		onSuccess()
		closeModal()
	} else {
		setIsSubmitting(false)
	}
}
