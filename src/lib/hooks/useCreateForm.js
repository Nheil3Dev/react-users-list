import { useEffect, useReducer } from 'react'
import { findUsersByUsername } from '../api/usersApi'
import { validateUsername, validatename } from '../users/userValidations'

const formValuesReducer = (state, action) => {
	switch (action.type) {
		case 'name_changed': {
			const error = validatename(action.payload)

			return {
				...state,
				name: { value: action.payload, error }
			}
		}
		case 'username_changed': {
			const error = validateUsername(action.payload)
			return {
				...state,
				username: { value: action.payload, loading: !error, error }
			}
		}
		case 'username_error_changed':
			return {
				...state,
				username: {
					value: state.username.value,
					error: action.payload,
					loading: false
				}
			}
		default:
			throw new Error('Invalid action type')
	}
}

export const useCreateForm = () => {
	const [formValues, dispatchFormValues] = useReducer(formValuesReducer, {
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

	useEffect(() => {
		if (!formValues.username.loading) return

		const controller = new AbortController()

		const timeoutId = setTimeout(() => {
			validateUsernameIsAvailable(
				formValues.username.value,
				dispatchFormValues,
				controller.signal
			)
		}, 500)

		return () => {
			controller.abort()
			clearTimeout(timeoutId)
		}
	}, [formValues.username.loading, formValues.username.value])

	const isFormInvalid =
		!formValues.name.value ||
		!formValues.username.value ||
		formValues.name.error ||
		formValues.username.error ||
		formValues.username.loading

	return {
		...formValues,
		dispatchFormValues,
		isFormInvalid
	}
}

const validateUsernameIsAvailable = async (
	username,
	dispatchFormValues,
	signal
) => {
	const { user, error, aborted } = await findUsersByUsername(username, signal)

	if (aborted) return
	if (error)
		return dispatchFormValues({
			type: 'username_error_changed',
			payload: 'Error al validar'
		})

	dispatchFormValues({
		type: 'username_error_changed',
		payload: user ? 'Ya está en uso' : undefined
	})
}
