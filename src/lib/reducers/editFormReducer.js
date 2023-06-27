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
	switch (action.type) {
		case EDIT_FORM_ACTIONS.NAME: {
			const error = validatename(action.payload)

			return {
				...state,
				name: { value: action.payload, error }
			}
		}
		case EDIT_FORM_ACTIONS.USERNAME: {
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
		case EDIT_FORM_ACTIONS.ROLE:
			return {
				...state,
				role: action.payload
			}
		case EDIT_FORM_ACTIONS.ACTIVE:
			return {
				...state,
				active: action.payload
			}
		case EDIT_FORM_ACTIONS.USERNAME_ERROR:
			return {
				...state,
				username: {
					value: state.username.value,
					error: action.payload,
					loading: false
				}
			}
		case EDIT_FORM_ACTIONS.REPLACE:
			return action.payload
		default:
			throw new Error('Invalid action type')
	}
}
