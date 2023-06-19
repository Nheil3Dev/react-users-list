import { UserRole } from './UserRole'
import style from './UserRow.module.css'
import { UserStatus } from './UserStatus'

export const UserRow = ({ name, active, role }) => {
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
		</div>
	)
}
