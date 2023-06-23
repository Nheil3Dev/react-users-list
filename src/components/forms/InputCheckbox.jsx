import CheckIcon from '../icons/CheckIcon'
import style from './InputCheckbox.module.css'

export const InputCheckbox = ({ className, ...props }) => {
	return (
		<label className={`${style.label} ${className || ''}`}>
			<input {...props} className={style.input} type='checkbox'></input>
			<CheckIcon className={style.icon} />
		</label>
	)
}
