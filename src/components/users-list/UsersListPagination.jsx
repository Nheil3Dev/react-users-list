import { PAGINATION } from '../../constants/pagination'
import {
	itemsPerPageChanged,
	pageChanged
} from '../../lib/actions/filtersActions'
import { PageSelector } from '../forms/PageSelector'
import { Select } from '../forms/Select'
import style from './UsersListPagination.module.css'

export const UsersListPagination = ({
	page,
	itemsPerPage,
	dispatchFilters,
	totalUsers
}) => {
	return (
		<div className={style.wrapper}>
			<div className={style.itemsPerPage}>
				<Select
					value={itemsPerPage}
					onChange={ev =>
						dispatchFilters(itemsPerPageChanged(Number(ev.target.value)))
					}
				>
					{PAGINATION.ITEMS_PER_PAGE_VALUES.map(value => (
						<option key={value} value={value}>
							{value}
						</option>
					))}
				</Select>
				<p>Elementos por página</p>
			</div>
			<PageSelector
				page={page}
				totalPages={Math.ceil(totalUsers / itemsPerPage)}
				setPage={newPage => dispatchFilters(pageChanged(newPage))}
			/>
		</div>
	)
}
