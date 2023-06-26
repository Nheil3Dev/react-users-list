import GridIcon from '../icons/GridIcon'
import ListIcon from '../icons/ListIcon'
import style from './UsersListViewSelector.module.css'

export const UsersListViewSelector = ({ view, setView }) => {
	return (
		<div className={style.wrapper}>
			<button
				className={style.button}
				onClick={() => setView(!view)}
				disabled={!view}
			>
				<GridIcon className={style.icon} />
			</button>
			<div className={style.divider}></div>
			<button
				className={style.button}
				onClick={() => setView(!view)}
				disabled={view}
			>
				<ListIcon className={style.icon} />
			</button>
		</div>
	)
}
