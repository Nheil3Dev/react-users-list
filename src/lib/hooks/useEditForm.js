import { useEffect, useReducer } from 'react'
import { EDIT_FORM_ACTIONS } from '../../constants/editFormActions'
import { findUsersByUsername } from '../api/usersApi'
import {
	editFormReducer,
	getEditFormInitialState
} from '../reducers/editFormReducer'

export const useEditForm = user => {
	const [formValues, dispatchFormValues] = useReducer(
		editFormReducer,
		user,
		getEditFormInitialState
	)

	useEffect(() => {
		dispatchFormValues({
			type: EDIT_FORM_ACTIONS.REPLACE,
			payload: getEditFormInitialState(user)
		})
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
			type: EDIT_FORM_ACTIONS.USERNAME_ERROR,
			payload: 'Error al validar'
		})

	dispatchFormValues({
		type: EDIT_FORM_ACTIONS.USERNAME_ERROR,
		payload: user ? 'Ya está en uso' : undefined
	})
}
