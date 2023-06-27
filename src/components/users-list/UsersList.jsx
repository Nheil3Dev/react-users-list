import { useReducer, useState } from 'react'
import { reset } from '../../lib/actions/filtersActions'
import { useUsers } from '../../lib/hooks/useUsers'
import {
	FILTERS_INITIAL_STATE,
	filtersReducers
} from '../../lib/reducers/filtersReducers'
import { UserFormsProvider } from '../providers/UserFormsProvider'
import { UserFormContainer } from '../user-forms/UserFormContainer'
import style from './UsersList.module.css'
import { UsersListFilters } from './UsersListFilters'
import { UsersListPagination } from './UsersListPagination'
import { UsersListRows } from './UsersListRows'
import { UsersListViewSelector } from './UsersListViewSelector'

export const UsersList = () => {
	const [showRowsFormat, setShowRowsFormat] = useState(true)

	const [filters, dispatchFilters] = useReducer(
		filtersReducers,
		FILTERS_INITIAL_STATE
	)

	const { users, totalUsers, usersError, usersLoading } = useUsers(filters)

	return (
		<div className={style.list}>
			<h1 className={style.title}>Lista de Usuarios</h1>
			<UserFormsProvider resetFilters={() => dispatchFilters(reset())}>
				<UsersListFilters
					search={filters.search}
					onlyActive={filters.onlyActive}
					sortBy={filters.sortBy}
					dispatchFilters={dispatchFilters}
				/>
				<UserFormContainer />
				<UsersListViewSelector
					showRowsFormat={showRowsFormat}
					setShowRowsFormat={setShowRowsFormat}
				/>
				<UsersListRows
					users={users}
					error={usersError}
					loading={usersLoading}
					view={showRowsFormat}
				/>
			</UserFormsProvider>

			{!usersError && (
				<UsersListPagination
					page={filters.page}
					itemsPerPage={filters.itemsPerPage}
					dispatchFilters={dispatchFilters}
					totalUsers={totalUsers}
				/>
			)}
		</div>
	)
}
