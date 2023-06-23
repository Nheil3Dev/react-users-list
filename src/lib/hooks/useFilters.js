import { useState } from "react"
import { SORT_OPTIONS } from "../../constants/sortOptions"

export const useFilters = () => {
	const [filters, setFilters] = useState({
		search: '',
		onlyActive: false,
		sortBy: SORT_OPTIONS.DEFAULT,
		page: 1,
		itemsPerPage: 2
	})

	const setSearch = search =>
		setFilters({
			...filters,
			search,
			page: 1
		})

	const setOnlyActive = onlyActive => {
		// Cuando marcamos la opción 'sólo activos' y tenemos el filtro 'Por activación'
		// reseteamos el filtro a 'Por defecto'
		const newSortBy = onlyActive && filters.sortBy === SORT_OPTIONS.ACTIVE
			? SORT_OPTIONS.DEFAULT
			: filters.sortBy

		setFilters({
			...filters,
			sortBy: newSortBy,
			page: 1,
			onlyActive
		})
	}

	const setSortBy = sortBy =>
		setFilters({
			...filters,
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
			itemsPerPage
		})
	}

	return { filters, setSearch, setOnlyActive, setSortBy, setPage, setItemsPerPage }
}