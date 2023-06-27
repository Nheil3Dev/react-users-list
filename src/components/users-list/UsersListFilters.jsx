import { useContext } from 'react'
import { SORT_OPTIONS } from '../../constants/sortOptions'
import { USER_FORMS } from '../../constants/userForms'
import { UsersFormContext } from '../../lib/context/UsersFormContext'
import { Button } from '../buttons/Button'
import { InputCheckbox } from '../forms/InputCheckbox'
import { InputSearch } from '../forms/InputSearch'
import { Select } from '../forms/Select'
import style from './UsersListFilters.module.css'

export const UsersListFilters = ({
	search,
	onlyActive,
	sortBy,
	dispatchFilters
}) => {
	const handleChange = event => {
		dispatchFilters({ type: 'search_changed', payload: event.target.value })
	}

	const { currentForm, setCreateForm } = useContext(UsersFormContext)

	if (currentForm !== USER_FORMS.FILTERS) return null

	return (
		<div className={style.form}>
			<div className={style.row}>
				<InputSearch
					placeholder='Buscar...'
					value={search}
					onChange={handleChange}
				/>

				<Select
					value={sortBy}
					onChange={event =>
						dispatchFilters({
							type: 'sort_by_changed',
							payload: Number(event.target.value)
						})
					}
				>
					<option value={SORT_OPTIONS.DEFAULT}>Por defecto</option>
					<option value={SORT_OPTIONS.NAME}>Por nombre</option>
					<option value={SORT_OPTIONS.ROLE}>Por rol</option>
					{!onlyActive && (
						<option value={SORT_OPTIONS.ACTIVE}>Por activos</option>
					)}
				</Select>
			</div>

			<div className={style.row}>
				<div className={style.active}>
					<InputCheckbox
						checked={onlyActive}
						onChange={event =>
							dispatchFilters({
								type: 'only_active_changed',
								payload: Number(event.target.checked)
							})
						}
					/>
					<p>Mostrar sólo activos</p>
				</div>
				<Button onClick={setCreateForm}>Añadir usuario</Button>
			</div>
		</div>
	)
}
