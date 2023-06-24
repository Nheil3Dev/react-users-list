import { Select } from './forms/Select'
import { PageSelector } from './PageSelector'
import style from './UserListPagination.module.css'

export const UserListPagination = ({
	page,
	itemPerPage,
	setPage,
	setItemPerPage,
	totalPages
}) => {
	return (
		<div className={style.wrapper}>
			<div className={style.itemsPerPage}>
				<Select
					value={itemPerPage}
					onChange={ev => setItemPerPage(Number(ev.target.value))}
				>
					<option value={4}>4</option>
					<option value={6}>6</option>
					<option value={8}>8</option>
				</Select>
				<p>Elementos por página</p>
			</div>
			<PageSelector page={page} totalPages={totalPages} setPage={setPage} />
		</div>
	)
}
