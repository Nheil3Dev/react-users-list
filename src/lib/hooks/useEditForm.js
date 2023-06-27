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
			const isInitial = action.payload === action.currentUsername
			return {
				...state,
				username: {
					value: action.payload,
					loading: !error && !isInitial,
					error
				}
			}
		}
		case 'role_chaged':
			return {
				...state,
				role: action.payload
			}
		case 'active_changed':
			return {
				...state,
				active: action.payload
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
		case 'replace':
			return action.payload
		default:
			throw new Error('Invalid action type')
	}
}

export const useEditForm = user => {
	const [formValues, dispatchFormValues] = useReducer(
		formValuesReducer,
		user,
		getInitialState
	)

	useEffect(() => {
		dispatchFormValues({ type: 'replace', payload: getInitialState(user) })
	}, [user])

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
		areInitialValues(formValues, user) ||
		formValues.name.error ||
		formValues.username.error ||
		formValues.username.loading

	return {
		...formValues,
		dispatchFormValues,
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
