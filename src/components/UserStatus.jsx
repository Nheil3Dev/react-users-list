import style from './UserStatus.module.css'

export const UserStatus = ({ active }) => {
	const statusStyle = active ? style.active : style.inactive

	return <span className={statusStyle}>{active ? 'Activo' : 'Inactivo'}</span>
}
