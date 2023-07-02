import style from './UserDisplay.module.css'

export const UserDisplay = ({ name, username, picture }) => {
	return (
		<div className={style.wrapper}>
			<img
				className={style.picture}
				alt={`Foto de ${name}`}
				src={picture || '/user-pic.svg'}
			/>
			<div className={style.display}>
				<span>{name}</span>
				<span className={style.username}>@{username}</span>
			</div>
		</div>
	)
}
