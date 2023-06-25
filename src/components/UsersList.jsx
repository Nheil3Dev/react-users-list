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
import { UserDeleteForm } from './user-forms/UserDeleteForm'
import { UserEditForm } from './user-forms/UserEditForm'
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

	const {
		currentForm,
		currentUser,
		setCreateForm,
		setFiltersForm,
		setDeleteForm,
		setEditForm
	} = useForm()

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
					{currentForm === USER_FORMS.CREATE && (
						<UserCreateForm onSuccess={onSuccess} />
					)}
					{currentForm === USER_FORMS.EDIT && (
						<UserEditForm onSuccess={onSuccess} user={currentUser} />
					)}
					{currentForm === USER_FORMS.DELETE && (
						<UserDeleteForm
							onSuccess={onSuccess}
							user={currentUser}
							onCancel={setFiltersForm}
						/>
					)}
				</UserFormLayout>
			)}

			<UsersListRows
				users={paginatedUsers}
				error={usersError}
				loading={usersLoading}
				setEditForm={setEditForm}
				setDeleteForm={setDeleteForm}
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
