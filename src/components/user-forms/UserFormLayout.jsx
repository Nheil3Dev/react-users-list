import { IconButton } from '../buttons/IconButton'
import CrossIcon from '../icons/CrossIcon'
import style from './UserFormLayout.module.css'

export const UserFormLayout = ({ onClose, children }) => {
	return (
		<div className={style.wrapper}>
			<IconButton
				className={style.close}
				icon={CrossIcon}
				onClick={onClose}
				filled
			/>
			{children}
		</div>
	)
}
