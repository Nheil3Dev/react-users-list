import { CREATE_FORM_ACTIONS } from '../../constants/createFormActions'
import { validateUsername, validatename } from '../users/userValidations'

export const CREATE_FORM_INITIAL_STATE = {
	name: {
		value: '',
		error: undefined
	},
	username: {
		value: '',
		loading: false,
		error: undefined
	}
}

export const createFormReducer = (state, action) => {
	switch (action.type) {
		case CREATE_FORM_ACTIONS.NAME: {
			const error = validatename(action.payload)

			return {
				...state,
				name: { value: action.payload, error }
			}
		}
		case CREATE_FORM_ACTIONS.USERNAME: {
			const error = validateUsername(action.payload)
			return {
				...state,
				username: { value: action.payload, loading: !error, error }
			}
		}
		case CREATE_FORM_ACTIONS.USERNAME_ERROR:
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
