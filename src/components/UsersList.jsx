import { useFilters } from '../lib/hooks/useFilters'
import { useUsers } from '../lib/hooks/useUsers'
import { getUsersToDisplay } from '../lib/users/filterUsers'
import { UserListPagination } from './UserListPagination'
import style from './UsersList.module.css'
import { UsersListFilters } from './UsersListFilters'
import { UsersListRows } from './UsersListRows'
import { UsersFormProvider } from './providers/UserFormsProvider'
import { UserFormContainer } from './user-forms/UserFormContainer'

export const UsersList = () => {
	const {
		filters,
		pagination,
		filterSetters,
		paginationSetters,
		resetFilters
	} = useFilters()

	const { users, usersError, usersLoading, reloadUsers } = useUsers()

	const { paginatedUsers, totalPages } = getUsersToDisplay(
		users,
		filters,
		pagination
	)

	return (
		<div className={style.list}>
			<h1 className={style.title}>Lista de Usuarios</h1>
			<UsersFormProvider reloadUsers={reloadUsers} resetFilters={resetFilters}>
				<UsersListFilters {...filters} {...filterSetters} />

				<UserFormContainer />

				<UsersListRows
					users={paginatedUsers}
					error={usersError}
					loading={usersLoading}
				/>
			</UsersFormProvider>

			{!usersError && (
				<UserListPagination
					{...pagination}
					{...paginationSetters}
					totalPages={totalPages}
				/>
			)}
		</div>
	)
}
