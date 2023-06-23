import { useFilters } from '../hooks/useFilters'
import { useUsers } from '../hooks/useUsers'
import style from './UsersList.module.css'
import { UsersListFilters } from './UsersListFilters'
import { UsersListRows } from './UsersListRows'

export const UsersList = ({ initialUsers }) => {
	const { search, onlyActive, sortBy, ...setFiltersFunction } = useFilters()

	const { users } = useUsers({ initialUsers })

	let usersFiltered = filterActiveUsers(users, onlyActive)
	usersFiltered = filterUsersByName(usersFiltered, search)
	usersFiltered = sortUsers(usersFiltered, sortBy)

	return (
		<div className={style.list}>
			<h1 className={style.title}>Lista de Usuarios</h1>
			<UsersListFilters
				search={search}
				onlyActive={onlyActive}
				sortBy={sortBy}
				{...setFiltersFunction}
			/>

			<UsersListRows users={usersFiltered} />
		</div>
	)
}

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
		case 1:
			return sortedUsers.sort((a, b) => {
				if (a.name > b.name) return 1
				if (a.name < b.name) return -1
				return 0
			})
		case 2:
			return sortedUsers.sort((a, b) => {
				if (a.role === b.role) return 0
				if (a.role === 'teacher') return -1
				if (a.role === 'student' && b.role === 'other') return -1
				return 1
			})
		case 3:
			return sortedUsers.sort((a, b) => {
				if (a.status && !b.status) return -1
				if (!a.status && b.status) return 1
				return 0
			})
		default:
			return sortedUsers
	}
}
