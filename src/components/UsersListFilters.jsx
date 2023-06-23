import style from './UsersListFilters.module.css'
import { InputCheckbox } from './forms/InputCheckbox'
import { InputSearch } from './forms/InputSearch'
import { Select } from './forms/Select'

export const UsersListFilters = ({
	search,
	setSearch,
	onlyActive,
	setOnlyActive,
	sortBy,
	setSortBy
}) => {
	const handleChange = event => {
		setSearch(event.target.value)
	}

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
					onChange={event => setSortBy(Number(event.target.value))}
				>
					<option value={0}>Por defecto</option>
					<option value={1}>Por nombre</option>
					<option value={2}>Por rol</option>
					{!onlyActive && <option value={3}>Por activos</option>}
				</Select>
			</div>

			<div className={style.row}>
				<div className={style.active}>
					<InputCheckbox
						checked={onlyActive}
						onChange={event => setOnlyActive(Number(event.target.checked))}
					/>
					<p>Mostrar sólo activos</p>
				</div>
			</div>
		</div>
	)
}
