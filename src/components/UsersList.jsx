import { UserRow } from './UserRow'
import style from './UsersList.module.css'

export const UsersList = ({ users, children }) => {
	const usersRendered =
		users.length > 0 ? (
			users.map(user => <UserRow key={user.name} {...user} />)
		) : (
			<p>No hay usuarios</p>
		)
	return (
		<div className={style.list}>
			{children}
			{usersRendered}
		</div>
	)
}
