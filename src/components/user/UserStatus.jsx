import CheckCircleIcon from '../icons/CheckCircleIcon'
import CrossCircleIcon from '../icons/CrossCircleIcon'
import style from './UserStatus.module.css'

export const UserStatus = ({ active }) => {
	const statusStyle = active ? style.active : style.inactive
	const Icon = active ? CheckCircleIcon : CrossCircleIcon
	return (
		<div className={statusStyle}>
			<Icon className={style.icon} />
			<span>{active ? 'Activo' : 'Inactivo'}</span>
		</div>
	)
}
