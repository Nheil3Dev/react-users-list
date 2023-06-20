import { useState } from 'react'
import { UserRole } from './UserRole'
import style from './UserRow.module.css'
import { UserStatus } from './UserStatus'

export const UserRow = ({ name, active, role }) => {
	const [isActive, setIsActive] = useState(active)
	return (
		<div className={style.wrapper}>
			<div className={style.name}>
				<span>{name}</span>
			</div>
			<div className={style.status}>
				<UserStatus active={isActive} />
			</div>
			<div>
				<UserRole role={role} />
			</div>
			<div className={style.action}>
				<button
					onClick={() => {
						setIsActive(!isActive)
					}}
				>
					{isActive ? 'Desactivar' : 'Activar'}
				</button>
			</div>
		</div>
	)
}
