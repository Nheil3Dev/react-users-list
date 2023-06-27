import { useReducer } from 'react'
import { PAGINATION } from '../../constants/pagination'
import { SORT_OPTIONS } from '../../constants/sortOptions'

const INITIAL_STATE = {
	search: '',
	onlyActive: false,
	sortBy: SORT_OPTIONS.DEFAULT,
	page: PAGINATION.DEFAULT_PAGE,
	itemsPerPage: PAGINATION.DEFAULT_ITEMS_PER_PAGE
}

const filtersReducers = (state, action) => {
	switch (action.type) {
		case 'search_changed':
			return {
				...state,
				search: action.payload,
				page: PAGINATION.DEFAULT_PAGE
			}
		case 'only_active_changed': {
			const newSortBy =
				action.payload && state.sortBy === SORT_OPTIONS.ACTIVE
					? SORT_OPTIONS.DEFAULT
					: state.sortBy

			return {
				...state,
				sortBy: newSortBy,
				page: PAGINATION.DEFAULT_PAGE,
				onlyActive: action.payload
			}
		}
		case 'sort_by_changed':
			return {
				...state,
				page: PAGINATION.DEFAULT_PAGE,
				sortBy: action.payload
			}
		case 'page_changed':
			return {
				...state,
				page: action.payload
			}
		case 'items_per_page_changed':
			return {
				...state,
				page: PAGINATION.DEFAULT_PAGE,
				itemsPerPage: action.payload
			}
		case 'reset':
			return { ...INITIAL_STATE }
		default:
			throw new Error('Invalid action type')
	}
}

export const useFilters = () => {
	const [filters, dispatchFilters] = useReducer(filtersReducers, INITIAL_STATE)

	return {
		filters,
		dispatchFilters
	}
}
