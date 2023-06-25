import { SORT_OPTIONS } from '../../constants/sortOptions'
import { USER_ROLES } from '../../constants/userRoles'

const filterUsersByName = (users, search) => {
	if (!search) return [...users]

	const lowerCasedSearch = search.toLowerCase()

	return users.filter(user =>
		user.name.toLowerCase().includes(lowerCasedSearch)
	)
}

const filterActiveUsers = (users, active) => {
	if (!active) return [...users]

	return users.filter(user => user.active)
}

const sortUsers = (users, sortBy) => {
	const sortedUsers = [...users]
	// Lógica sacada de tablas de la verdad para cada caso
	switch (sortBy) {
		case SORT_OPTIONS.NAME:
			return sortedUsers.sort((a, b) => {
				if (a.name > b.name) return 1
				if (a.name < b.name) return -1
				return 0
			})
		case SORT_OPTIONS.ROLE:
			return sortedUsers.sort((a, b) => {
				if (a.role === b.role) return 0
				if (a.role === USER_ROLES.TEACHER) return -1
				if (a.role === USER_ROLES.STUDENT && b.role === USER_ROLES.OTHER)
					return -1
				return 1
			})
		case SORT_OPTIONS.ACTIVE:
			return sortedUsers.sort((a, b) => {
				if (a.status && !b.status) return -1
				if (!a.status && b.status) return 1
				return 0
			})
		default:
			return sortedUsers
	}
}

const paginateUsers = (users, page, itemsPerPage) => {
	const startIndex = (page - 1) * itemsPerPage
	const endIndex = startIndex + itemsPerPage
	const totalPages = Math.ceil(users.length / itemsPerPage)

	const paginatedUsers = users.slice(startIndex, endIndex)

	return { paginatedUsers, totalPages }
}

export const getUsersToDisplay = (
	users,
	{ search, onlyActive, sortBy },
	{ page, itemsPerPage }
) => {
	let usersFiltered = filterActiveUsers(users, onlyActive)
	usersFiltered = filterUsersByName(usersFiltered, search)
	usersFiltered = sortUsers(usersFiltered, sortBy)

	const { paginatedUsers, totalPages } = paginateUsers(
		usersFiltered,
		page,
		itemsPerPage
	)

	return { paginatedUsers, totalPages }
}
