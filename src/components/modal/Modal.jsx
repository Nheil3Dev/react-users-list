import { createPortal } from 'react-dom'
import { IconButton } from '../buttons/IconButton'
import CrossIcon from '../icons/CrossIcon'
import style from './Modal.module.css'

export const Modal = ({ closeModal, children }) => {
	if (!children) return null

	return createPortal(
		<div className={style.overlay}>
			<div className={style.modal}>
				<IconButton
					icon={CrossIcon}
					filled
					className={style.close}
					onClick={closeModal}
				/>
				{children}
			</div>
		</div>,
		document.getElementById('modal')
	)
}
