import style from './Button.module.css'

const KIND_CLASSNAME = {
	primary: style.primary,
	secondary: style.secondary
}

export const Button = ({ kind = 'primary', className, ...props }) => {
	return (
		<button
			{...props}
			className={`${style.button} ${KIND_CLASSNAME[kind]} ${className || ''}`}
		></button>
	)
}
