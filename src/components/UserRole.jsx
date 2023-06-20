import style from './UserRole.module.css'

const ROLE_STYLES = {
	teacher: ['Profesor', style.teacher],
	student: ['Alumno', style.student],
	other: ['Otro', style.other]
}

export const UserRole = ({ role }) => {
	const [roleName, roleClassName] = ROLE_STYLES[role] || ROLE_STYLES.other

	return <span className={`${style.role} ${roleClassName}`}>{roleName}</span>
}
