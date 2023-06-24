import style from './InputText.module.css'

export const InputText = ({ label, error, className, ...props }) => {
	return (
		<label className={className}>
			<span className={style.label}>{label}</span>
			<input
				{...props}
				type='text'
				className={`${style.input} ${error ? style.borderError : ''}`}
			></input>
			{error && <span className={style.error}>{error}</span>}
		</label>
	)
}
