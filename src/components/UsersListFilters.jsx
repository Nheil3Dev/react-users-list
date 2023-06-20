import style from './UsersListFilters.module.css'

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
		<form className={style.form}>
			<input type='text' value={search} onChange={handleChange} />
			<div className={style.active}>
				<input
					type='checkbox'
					checked={onlyActive}
					onChange={event => setOnlyActive(Number(event.target.checked))}
				/>
				<span>Sólo activos</span>
			</div>
			<select
				value={sortBy}
				onChange={event => setSortBy(Number(event.target.value))}
			>
				<option value={0}>Por defecto</option>
				<option value={1}>Por nombre</option>
			</select>
		</form>
	)
}
