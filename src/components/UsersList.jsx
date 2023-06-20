import { useFilters } from '../hooks/useFilters'
import { useUsers } from '../hooks/useUsers'
import style from './UsersList.module.css'
import { UsersListFilters } from './UsersListFilters'
import { UsersListRows } from './UsersListRows'

export const UsersList = ({ initialUsers }) => {
	const { search, onlyActive, sortBy, ...setFiltersFunction } = useFilters()

	const { users, toggleUserActive } = useUsers({ initialUsers })

	let usersFiltered = filterActiveUsers(users, onlyActive)
	usersFiltered = filterUsersByName(usersFiltered, search)
	usersFiltered = sortUsers(usersFiltered, sortBy)

	return (
		<div className={style.list}>
			<h1>Lista de Usuarios</h1>
			<UsersListFilters
				search={search}
				onlyActive={onlyActive}
				sortBy={sortBy}
				{...setFiltersFunction}
			/>
			<UsersListRows
				users={usersFiltered}
				toggleUserActive={toggleUserActive}
			/>
		</div>
	)
}

const filterUsersByName = (users, search) => {
	if (!search) return [...users]

	const lowerCasedSearch = search.toLowerCase()

	return users.filter(user =>
		user.name.toLowerCase().startsWith(lowerCasedSearch)
	)
}

const filterActiveUsers = (users, active) => {
	if (!active) return [...users]

	return users.filter(user => user.active)
}

const sortUsers = (users, sortBy) => {
	const sortedUsers = [...users]
	if (sortBy === 0) return sortedUsers
	return sortedUsers.sort((a, b) => {
		if (a.name > b.name) return 1
		if (a.name < b.name) return -1
		return 0
	})
}
