import { UserRow } from './UserRow'

export const UsersListRows = ({
	users,
	error,
	loading,
	setDeleteForm,
	setEditForm
}) => {
	if (loading) return <p>Cargando usuarios...</p>
	if (error) return <p>Error al cargar los usuarios</p>
	if (!users.length) return <p>No hay usuarios</p>

	return users.map(user => (
		<UserRow
			key={user.id}
			setDeleteForm={setDeleteForm}
			setEditForm={setEditForm}
			{...user}
		/>
	))
}
