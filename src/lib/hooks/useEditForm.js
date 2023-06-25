import { useEffect, useState } from 'react'
import { findUsersByUsername } from '../api/usersApi'
import { validateUsername, validatename } from '../users/userValidations'

export const useEditForm = user => {
	const [formValues, setformValues] = useState(() => getInitialState(user))

	const setName = newName => {
		const error = validatename(newName)

		setformValues({
			...formValues,
			name: { value: newName, error }
		})
	}

	const setUsername = newUsername => {
		const error = validateUsername(newUsername)
		const isInitial = newUsername === user.username
		setformValues({
			...formValues,
			username: { value: newUsername, loading: !error && !isInitial, error }
		})
	}

	const setRole = newRole => {
		setformValues({
			...formValues,
			role: newRole
		})
	}

	const setActive = newActive => {
		setformValues({
			...formValues,
			active: newActive
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
		setformValues(getInitialState(user))
	}, [user])

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

	const isFormInvalid =
		areInitialValues(formValues, user) ||
		formValues.name.error ||
		formValues.username.error ||
		formValues.username.loading

	return {
		...formValues,
		setName,
		setUsername,
		setRole,
		setActive,
		setUsernameError,
		isFormInvalid
	}
}

const getInitialState = user => ({
	name: {
		value: user.name,
		error: undefined
	},
	username: {
		value: user.username,
		loading: false,
		error: undefined
	},
	role: user.role,
	active: user.active
})

const areInitialValues = (formValues, user) =>
	formValues.name.value === user.name &&
	formValues.username.value === user.username &&
	formValues.active === user.active &&
	formValues.role === user.role

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
