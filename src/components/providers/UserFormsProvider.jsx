import { UsersFormContext } from '../../lib/context/UsersFormContext'
import { useSelectedForm } from '../../lib/hooks/useSelectedForm'

export const UserFormProvider = ({ reloadUsers, resetFilters, children }) => {
	const { setFiltersForm, ...restSelectedForms } = useSelectedForm()

	const onSuccess = () => {
		reloadUsers()
		resetFilters()
		setFiltersForm()
	}

	return (
		<UsersFormContext.Provider
			value={{
				setFiltersForm,
				onSuccess,
				...restSelectedForms
			}}
		>
			{children}
		</UsersFormContext.Provider>
	)
}
