import { IconButton } from './buttons/IconButton'
import ArrowLeftIcon from './icons/ArrowLeftIcon'
import ArrowRightIcon from './icons/ArrowRightIcon'
import style from './PageSelector.module.css'

export const PageSelector = ({ page, totalPages, setPage }) => {
	const isFirstPage = page === 1
	const isLastPage = page === totalPages || totalPages === 0

	return (
		<div className={style.wrapper}>
			<IconButton
				filled
				disabled={isFirstPage}
				icon={ArrowLeftIcon}
				onClick={() => setPage(page - 1)}
			/>
			<p>
				Página {page} de {totalPages || 1}
			</p>
			<IconButton
				filled
				disabled={isLastPage}
				icon={ArrowRightIcon}
				onClick={() => setPage(page + 1)}
			/>
		</div>
	)
}
