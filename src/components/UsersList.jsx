import { useFilters } from '../lib/hooks/useFilters'
import { useUsers } from '../lib/hooks/useUsers'
import { UserListPagination } from './UserListPagination'
import style from './UsersList.module.css'
import { UsersListFilters } from './UsersListFilters'
import { UsersListRows } from './UsersListRows'

export const UsersList = () => {
	const { filters, setPage, setItemsPerPage, ...setFiltersFunction } =
		useFilters()

	const { users, totalPages, error, loading } = useUsers(filters)

	return (
		<div className={style.list}>
			<h1 className={style.title}>Lista de Usuarios</h1>
			<UsersListFilters
				search={filters.search}
				onlyActive={filters.onlyActive}
				sortBy={filters.sortBy}
				{...setFiltersFunction}
			/>

			<UsersListRows users={users} error={error} loading={loading} />

			{!error && (
				<UserListPagination
					page={filters.page}
					itemPerPage={filters.itemsPerPage}
					setPage={setPage}
					setItemPerPage={setItemsPerPage}
					totalPages={totalPages}
				/>
			)}
		</div>
	)
}
