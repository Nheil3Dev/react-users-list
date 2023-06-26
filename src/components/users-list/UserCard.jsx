import { useContext } from 'react'
import { UsersFormContext } from '../../lib/context/UsersFormContext'
import { IconButton } from '../buttons/IconButton'
import PencilIcon from '../icons/PencilIcon'
import TrashIcon from '../icons/TrashIcon'
import { UserDisplay } from '../user/UserDisplay'
import { UserRole } from '../user/UserRole'
import { UserStatus } from '../user/UserStatus'
import style from './UserCard.module.css'

export const UserCard = ({ id, username, name, active, role }) => {
	const { setEditForm, setDeleteForm } = useContext(UsersFormContext)
	return (
		<div className={style.wrapper}>
			<div className={style.card}>
				<div className={style.name}>
					<UserDisplay name={name} username={username} />
				</div>
				<div className={style.info}>
					<UserRole role={role} />
					<UserStatus active={active} />
					<div className={style.actions}>
						<IconButton
							icon={PencilIcon}
							onClick={() => {
								setEditForm({ id, name, username, active, role })
							}}
						/>
						<IconButton
							kind='red'
							icon={TrashIcon}
							onClick={() => setDeleteForm({ id, name })}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
