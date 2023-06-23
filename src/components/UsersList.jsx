import { useFilters } from '../lib/hooks/useFilters'
import { useUsers } from '../lib/hooks/useUsers'
import { UserListPagination } from './UserListPagination'
import style from './UsersList.module.css'
import { UsersListFilters } from './UsersListFilters'
import { UsersListRows } from './UsersListRows'

export const UsersList = ({ initialUsers }) => {
	const { filters, setPage, setItemsPerPage, ...setFiltersFunction } =
		useFilters()

	const { users, totalPages } = useUsers({ initialUsers, ...filters })

	return (
		<div className={style.list}>
			<h1 className={style.title}>Lista de Usuarios</h1>
			<UsersListFilters
				search={filters.search}
				onlyActive={filters.onlyActive}
				sortBy={filters.sortBy}
				{...setFiltersFunction}
			/>

			<UsersListRows users={users} />

			<UserListPagination
				page={filters.page}
				itemPerPage={filters.itemsPerPage}
				setPage={setPage}
				setItemPerPage={setItemsPerPage}
				totalPages={totalPages}
			/>
		</div>
	)
}
