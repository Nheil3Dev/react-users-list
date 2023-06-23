import style from './UserDisplay.module.css'

export const UserDisplay = ({ name, username }) => {
	return (
		<div className={style.wrapper}>
			<span>{name}</span>
			<span className={style.username}>@{username}</span>
		</div>
	)
}
