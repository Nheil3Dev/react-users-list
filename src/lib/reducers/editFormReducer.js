import { EDIT_FORM_ACTIONS } from '../../constants/editFormActions'
import { validateUsername, validatename } from '../users/userValidations'

export const getEditFormInitialState = user => ({
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

export const editFormReducer = (state, action) => {
	const { type, payload } = action
	switch (type) {
		case EDIT_FORM_ACTIONS.NAME: {
			const error = validatename(payload)

			return {
				...state,
				name: { value: payload, error }
			}
		}
		case EDIT_FORM_ACTIONS.USERNAME: {
			const { username, isInitial } = payload
			const error = validateUsername(username)

			return {
				...state,
				username: {
					value: username,
					loading: !error && !isInitial,
					error
				}
			}
		}
		case EDIT_FORM_ACTIONS.ROLE:
			return {
				...state,
				role: payload
			}
		case EDIT_FORM_ACTIONS.ACTIVE:
			return {
				...state,
				active: payload
			}
		case EDIT_FORM_ACTIONS.USERNAME_ERROR:
			return {
				...state,
				username: {
					value: state.username.value,
					error: payload,
					loading: false
				}
			}
		case EDIT_FORM_ACTIONS.REPLACE:
			return payload
		default:
			throw new Error('Invalid action type')
	}
}
