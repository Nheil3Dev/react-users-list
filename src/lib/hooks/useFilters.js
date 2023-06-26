import { useState } from 'react'
import { PAGINATION } from '../../constants/pagination'
import { SORT_OPTIONS } from '../../constants/sortOptions'

const INITIAL_STATE = {
	search: '',
	onlyActive: false,
	sortBy: SORT_OPTIONS.DEFAULT,
	page: PAGINATION.DEFAULT_PAGE,
	itemsPerPage: PAGINATION.DEFAULT_ITEMS_PER_PAGE
}

export const useFilters = () => {
	const [filters, setFilters] = useState(INITIAL_STATE)

	const setSearch = search =>
		setFilters({
			...filters,
			search,
			page: 1
		})

	const setOnlyActive = onlyActive => {
		// Cuando marcamos la opción 'sólo activos' y tenemos el filtro 'Por activación'
		// reseteamos el filtro a 'Por defecto'
		const newSortBy =
			onlyActive && filters.sortBy === SORT_OPTIONS.ACTIVE
				? SORT_OPTIONS.DEFAULT
				: filters.sortBy

		setFilters({
			...filters,
			sortBy: newSortBy,
			page: PAGINATION.DEFAULT_PAGE,
			onlyActive
		})
	}

	const setSortBy = sortBy =>
		setFilters({
			...filters,
			page: PAGINATION.DEFAULT_PAGE,
			sortBy
		})

	const setPage = page =>
		setFilters({
			...filters,
			page
		})

	const setItemsPerPage = itemsPerPage => {
		setFilters({
			...filters,
			page: PAGINATION.DEFAULT_PAGE,
			itemsPerPage
		})
	}

	const resetFilters = () => {
		setFilters({ ...INITIAL_STATE })
	}

	return {
		filters,
		filterSetters: {
			setSearch,
			setOnlyActive,
			setSortBy
		},
		paginationSetters: {
			setPage,
			setItemsPerPage
		},
		resetFilters
	}
}
