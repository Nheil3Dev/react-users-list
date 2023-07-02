import { useContext, useRef, useState } from 'react'
import { updateUserPic } from '../../lib/api/usersApi'
import { UsersFormContext } from '../../lib/context/UsersFormContext'
import { fileToDataURL } from '../../lib/utils/file-utils'
import { Button } from '../buttons/Button'
import { IconButton } from '../buttons/IconButton'
import PencilIcon from '../icons/PencilIcon'
import PictureIcon from '../icons/PictureIcon'
import style from './UserPicForm.module.css'

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png']
const MAX_SIZE = 102400

export const UserPicForm = ({ currentUser, closeModal }) => {
	const { onSuccess } = useContext(UsersFormContext)
	const [preview, setPreview] = useState()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const inputRef = useRef(null)

	const message = getMessage(preview)

	return (
		<div className={style.wrapper}>
			<div className={style.preview}>
				{preview && preview.src ? (
					<img className={style.picture} src={preview.src} alt='Preview' />
				) : (
					<PictureIcon className={style.icon} />
				)}
				<IconButton
					icon={PencilIcon}
					filled
					className={style.iconButton}
					onClick={() => inputRef.current.click()}
				/>
			</div>

			{message}

			<input
				className={style.input}
				ref={inputRef}
				type='file'
				accept={ALLOWED_MIME_TYPES.join(',')}
				onChange={ev => handleChange(ev, setPreview)}
			/>

			<Button
				className={style.button}
				disabled={isSubmitting || !preview || !preview.src}
				onClick={() =>
					handleClick(
						currentUser.id,
						closeModal,
						onSuccess,
						preview,
						setIsSubmitting
					)
				}
			>
				{isSubmitting ? 'Cargando...' : 'Actualizar foto'}
			</Button>
		</div>
	)
}

const getMessage = preview => {
	if (!preview) return <span>JPG/PNG | Máx 100Kb</span>

	if (preview.filename)
		return <span className={style.filename}>{preview.filename}</span>

	return <span className={style.error}>{preview.error}</span>
}

const handleChange = async (ev, setPreview) => {
	const file = ev.target.files[0]

	if (!file) {
		return setPreview()
	}

	if (!ALLOWED_MIME_TYPES.includes(file.type)) {
		return setPreview({
			error: 'Sólo JPG/PNG'
		})
	}

	if (file.size > MAX_SIZE) {
		return setPreview({
			error: 'Máximo 100Kb'
		})
	}

	try {
		const dataUrl = await fileToDataURL(file)
		setPreview({
			src: dataUrl,
			filename: file.name
		})
	} catch (err) {
		setPreview({
			error: err.message
		})
	}
}

const handleClick = async (
	userId,
	closeModal,
	onSuccess,
	preview,
	setIsSubmitting
) => {
	if (!preview) return

	setIsSubmitting(true)

	const success = await updateUserPic(userId, preview.src)

	if (success) {
		onSuccess()
		closeModal()
	} else {
		setIsSubmitting(false)
	}
}
