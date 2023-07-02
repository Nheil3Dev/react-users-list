import { UserDisplay } from '../user/UserDisplay'
import { UserRole } from '../user/UserRole'
import { UserStatus } from '../user/UserStatus'
import { UserActions } from '../user/userActions'
import style from './UserCard.module.css'

export const UserCard = ({ user }) => {
	return (
		<div className={style.wrapper}>
			<div className={style.card}>
				<div className={style.name}>
					<UserDisplay name={user.name} username={user.username} />
				</div>
				<div className={style.info}>
					<UserRole role={user.role} />
					<UserStatus active={user.active} />
					<div className={style.actions}>
						<UserActions user={user} />
					</div>
				</div>
			</div>
		</div>
	)
}
