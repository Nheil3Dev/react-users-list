import SearchIcon from '../icons/SearchIcon'
import style from './InputSearch.module.css'

export const InputSearch = ({ className, ...props }) => {
	return (
		<div className={`${style.wrapper} ${className || ''}`}>
			<SearchIcon className={style.icon} />
			<input {...props} type='text' className={style.input}></input>
		</div>
	)
}
