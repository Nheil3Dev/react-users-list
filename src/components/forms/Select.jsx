import ArrowDownIcon from '../icons/ArrowDownIcon'
import style from './Select.module.css'

export const Select = ({ className, ...props }) => {
	return (
		<div className={style.wrapper}>
			<select
				{...props}
				className={`${style.select} ${className || ''}`}
			></select>
			<ArrowDownIcon className={style.icon} />
		</div>
	)
}
