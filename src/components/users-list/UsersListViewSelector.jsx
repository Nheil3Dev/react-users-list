import GridIcon from '../icons/GridIcon'
import ListIcon from '../icons/ListIcon'
import style from './UsersListViewSelector.module.css'

export const UsersListViewSelector = ({
	showRowsFormat,
	setShowRowsFormat
}) => {
	return (
		<div className={style.wrapper}>
			<button
				className={style.button}
				onClick={() => setShowRowsFormat(!showRowsFormat)}
				disabled={!showRowsFormat}
			>
				<GridIcon className={style.icon} />
			</button>
			<div className={style.divider}></div>
			<button
				className={style.button}
				onClick={() => setShowRowsFormat(!showRowsFormat)}
				disabled={showRowsFormat}
			>
				<ListIcon className={style.icon} />
			</button>
		</div>
	)
}
