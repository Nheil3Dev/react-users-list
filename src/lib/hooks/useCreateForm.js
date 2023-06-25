import { useEffect, useState } from 'react'
import { findUsersByUsername } from '../api/usersApi'
import { validateUsername, validatename } from '../users/userValidations'

export const useCreateForm = () => {
	const [formValues, setformValues] = useState({
		name: {
			value: '',
			error: undefined
		},
		username: {
			value: '',
			loading: false,
			error: undefined
		}
	})

	const setName = newName => {
		const error = validatename(newName)

		setformValues({
			...formValues,
			name: { value: newName, error }
		})
	}

	const setUsername = newUsername => {
		const error = validateUsername(newUsername)
		setformValues({
			...formValues,
			username: { value: newUsername, loading: !error, error }
		})
	}

	const setUsernameError = error => {
		setformValues(prevFormValues => ({
			...prevFormValues,
			username: {
				value: prevFormValues.username.value,
				error,
				loading: false
			}
		}))
	}

	useEffect(() => {
		if (!formValues.username.loading) return

		const controller = new AbortController()

		const timeoutId = setTimeout(() => {
			validateUsernameIsAvailable(
				formValues.username.value,
				setUsernameError,
				controller.signal
			)
		}, 500)

		return () => {
			controller.abort()
			clearTimeout(timeoutId)
		}
	}, [formValues.username.loading, formValues.username.value])

	const isFormValid =
		!formValues.name.value ||
		!formValues.username.value ||
		formValues.name.error ||
		formValues.username.error ||
		formValues.username.loading

	return { ...formValues, setName, setUsername, setUsernameError, isFormValid }
}

const validateUsernameIsAvailable = async (
	username,
	setUsernameError,
	signal
) => {
	const { user, error, aborted } = await findUsersByUsername(username, signal)

	if (aborted) return
	if (error) return setUsernameError('Error al validar')

	setUsernameError(user ? 'Ya está en uso' : undefined)
}
