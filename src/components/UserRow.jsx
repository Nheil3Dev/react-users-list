import { UserRole } from './UserRole'
import style from './UserRow.module.css'
import { UserStatus } from './UserStatus'

export const UserRow = ({ id, name, active, role, toggleUserActive }) => {
	return (
		<div className={style.wrapper}>
			<div className={style.name}>
				<span>{name}</span>
			</div>
			<div className={style.status}>
				<UserStatus active={active} />
			</div>
			<div>
				<UserRole role={role} />
			</div>
			<div className={style.action}>
				<button
					onClick={() => {
						toggleUserActive(id)
					}}
				>
					{active ? 'Desactivar' : 'Activar'}
				</button>
			</div>
		</div>
	)
}