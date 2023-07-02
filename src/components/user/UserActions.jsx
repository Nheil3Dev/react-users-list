import { useState } from 'react'
import { useDropdown } from '../../lib/hooks/useDropdown'
import { IconButton } from '../buttons/IconButton'
import DotsIcon from '../icons/DotsIcon'
import PencilIcon from '../icons/PencilIcon'
import TrashIcon from '../icons/TrashIcon'
import { Modal } from '../modal/Modal'
import { UserDeleteForm } from '../user-forms/UserDeleteForm'
import { UserEditForm } from '../user-forms/UserEditForm'
import style from './UserActions.module.css'

export const UserActions = ({ user }) => {
	const { modalContent, closeModal, openEditModal, openDeleteModal } =
		useModal(user)

	const { dropdownOpened, openDropdown, closeDropdown, dropdownRef } =
		useDropdown()
	return (
		<div className={style.wrapper}>
			<Modal closeModal={closeModal}>{modalContent}</Modal>
			<IconButton icon={DotsIcon} onClick={openDropdown} />

			{dropdownOpened && (
				<ul
					className={style.dropdown}
					onClick={closeDropdown}
					ref={dropdownRef}
				>
					<li className={style.row} onClick={openEditModal}>
						<PencilIcon className={style.icon} />
						<span>Editar</span>
					</li>
					<li className={style.row} onClick={openEditModal}>
						<PencilIcon className={style.icon} />
						<span>Cambiar foto</span>
					</li>
					<li className={style.row} onClick={openDeleteModal}>
						<TrashIcon className={style.icon} />
						<span>Eliminar</span>
					</li>
				</ul>
			)}
		</div>
	)
}

const useModal = user => {
	const [modalContent, setModalContent] = useState()

	const closeModal = () => setModalContent()

	const openEditModal = () => {
		setModalContent(<UserEditForm currentUser={user} closeModal={closeModal} />)
	}

	const openDeleteModal = () =>
		setModalContent(
			<UserDeleteForm currentUser={user} closeModal={closeModal} />
		)

	return { modalContent, closeModal, openEditModal, openDeleteModal }
}
