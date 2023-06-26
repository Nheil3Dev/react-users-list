import { useState } from 'react'
import { useFilters } from '../../lib/hooks/useFilters'
import { useUsers } from '../../lib/hooks/useUsers'
import { UserFormsProvider } from '../providers/UserFormsProvider'
import { UserFormContainer } from '../user-forms/UserFormContainer'
import style from './UsersList.module.css'
import { UsersListFilters } from './UsersListFilters'
import { UsersListPagination } from './UsersListPagination'
import { UsersListRows } from './UsersListRows'
import { UsersListViewSelector } from './UsersListViewSelector'

export const UsersList = () => {
	const [view, setView] = useState(true)

	const { filters, filterSetters, paginationSetters, resetFilters } =
		useFilters()

	const { users, usersCount, usersError, usersLoading } = useUsers(filters)

	return (
		<div className={style.list}>
			<h1 className={style.title}>Lista de Usuarios</h1>
			<UserFormsProvider resetFilters={resetFilters}>
				<UsersListFilters
					search={filters.search}
					onlyActive={filters.onlyActive}
					sortBy={filters.sortBy}
					{...filterSetters}
				/>
				<UserFormContainer />
				<UsersListViewSelector view={view} setView={setView} />
				<UsersListRows
					users={users}
					error={usersError}
					loading={usersLoading}
					view={view}
				/>
			</UserFormsProvider>

			{!usersError && (
				<UsersListPagination
					page={filters.page}
					itemsPerPage={filters.itemsPerPage}
					{...paginationSetters}
					totalUsers={usersCount}
				/>
			)}
		</div>
	)
}
