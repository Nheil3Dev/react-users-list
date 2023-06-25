import { USER_FORMS } from '../constants/userForms'
import { useFilters } from '../lib/hooks/useFilters'
import { useForm } from '../lib/hooks/useForm'
import { useUsers } from '../lib/hooks/useUsers'
import {
	filterActiveUsers,
	filterUsersByName,
	paginateUsers,
	sortUsers
} from '../lib/users/filterUsers'
import { UserListPagination } from './UserListPagination'
import style from './UsersList.module.css'
import { UsersListFilters } from './UsersListFilters'
import { UsersListRows } from './UsersListRows'
import { Button } from './buttons/Button'
import { UserCreateForm } from './user-forms/UserCreateForm'
import { UserFormLayout } from './user-forms/UserFormLayout'

export const UsersList = () => {
	const {
		filters,
		pagination,
		filterSetters,
		paginationSetters,
		resetFilters
	} = useFilters()

	const { users, usersError, usersLoading, reloadUsers } = useUsers()

	const { currentForm, setCreateForm, setFiltersForm } = useForm()

	const { paginatedUsers, totalPages } = getUsersToDisplay(
		users,
		filters,
		pagination
	)

	const onSuccess = () => {
		reloadUsers()
		resetFilters()
		setFiltersForm()
	}

	return (
		<div className={style.list}>
			<h1 className={style.title}>Lista de Usuarios</h1>
			{currentForm === USER_FORMS.FILTERS ? (
				<UsersListFilters
					{...filters}
					{...filterSetters}
					slot={<Button onClick={setCreateForm}>Añadir usuario</Button>}
				/>
			) : (
				<UserFormLayout onClose={setFiltersForm}>
					<UserCreateForm onSuccess={onSuccess} />
				</UserFormLayout>
			)}

			<UsersListRows
				users={paginatedUsers}
				error={usersError}
				loading={usersLoading}
			/>

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

const getUsersToDisplay = (
	users,
	{ search, onlyActive, sortBy },
	{ page, itemsPerPage }
) => {
	let usersFiltered = filterActiveUsers(users, onlyActive)
	usersFiltered = filterUsersByName(usersFiltered, search)
	usersFiltered = sortUsers(usersFiltered, sortBy)

	const { paginatedUsers, totalPages } = paginateUsers(
		usersFiltered,
		page,
		itemsPerPage
	)

	return { paginatedUsers, totalPages }
}
