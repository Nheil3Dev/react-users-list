import { USER_FORMS } from '../constants/userForms'
import { useFilters } from '../lib/hooks/useFilters'
import { useForm } from '../lib/hooks/useForm'
import { useUsers } from '../lib/hooks/useUsers'
import { UserListPagination } from './UserListPagination'
import style from './UsersList.module.css'
import { UsersListFilters } from './UsersListFilters'
import { UsersListRows } from './UsersListRows'
import { Button } from './buttons/Button'
import { UserCreateForm } from './user-forms/UserCreateForm'

export const UsersList = () => {
	const { filters, setPage, setItemsPerPage, ...setFiltersFunction } =
		useFilters()

	const { users, totalPages, error, loading } = useUsers(filters)

	const { currentForm, setCreateForm, setFiltersForm } = useForm()

	return (
		<div className={style.list}>
			<h1 className={style.title}>Lista de Usuarios</h1>
			{currentForm === USER_FORMS.FILTERS ? (
				<UsersListFilters
					search={filters.search}
					onlyActive={filters.onlyActive}
					sortBy={filters.sortBy}
					slot={<Button onClick={setCreateForm}>Añadir usuario</Button>}
					{...setFiltersFunction}
				/>
			) : (
				<UserCreateForm setFiltersForm={setFiltersForm} />
			)}

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
