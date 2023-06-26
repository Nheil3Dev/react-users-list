import { useState } from 'react'
import { useFilters } from '../../lib/hooks/useFilters'
import { useUsers } from '../../lib/hooks/useUsers'
import { getUsersToDisplay } from '../../lib/users/filterUsers'
import { UserFormsProvider } from '../providers/UserFormsProvider'
import { UserFormContainer } from '../user-forms/UserFormContainer'
import style from './UsersList.module.css'
import { UsersListFilters } from './UsersListFilters'
import { UsersListPagination } from './UsersListPagination'
import { UsersListRows } from './UsersListRows'
import { UsersListViewSelector } from './UsersListViewSelector'

export const UsersList = () => {
	const [view, setView] = useState(true)

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
			<UserFormsProvider reloadUsers={reloadUsers} resetFilters={resetFilters}>
				<UsersListFilters {...filters} {...filterSetters} />

				<UserFormContainer />
				<UsersListViewSelector view={view} setView={setView} />
				<UsersListRows
					users={paginatedUsers}
					error={usersError}
					loading={usersLoading}
					view={view}
				/>
			</UserFormsProvider>

			{!usersError && (
				<UsersListPagination
					{...pagination}
					{...paginationSetters}
					totalPages={totalPages}
				/>
			)}
		</div>
	)
}
