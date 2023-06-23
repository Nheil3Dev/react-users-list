import { UserDisplay } from './UserDisplay'
import { UserRole } from './UserRole'
import style from './UserRow.module.css'
import { UserStatus } from './UserStatus'

export const UserRow = ({ username, name, active, role }) => {
	return (
		<div className={style.wrapper}>
			<div className={style.name}>
				<UserDisplay name={name} username={username} />
			</div>
			<div className={style.status}>
				<UserStatus active={active} />
			</div>
			<div>
				<UserRole role={role} />
			</div>
			<div className={style.action}></div>
		</div>
	)
}
