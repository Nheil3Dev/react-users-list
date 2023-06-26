import { UsersFormContext } from '../../lib/context/UsersFormContext'
import { useSelectedForm } from '../../lib/hooks/useSelectedForm'

export const UserFormsProvider = ({ resetFilters, children }) => {
	const { setFiltersForm, ...restSelectedForms } = useSelectedForm()

	const onSuccess = () => {
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
