import { useFilters } from '../lib/hooks/useFilters'
import { useUsers } from '../lib/hooks/useUsers'
import {
	filterActiveUsers,
	filterUsersByName,
	sortUsers
} from '../lib/users/filterUsers'
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
