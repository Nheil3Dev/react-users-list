import { useState } from "react"
import { USER_FORMS } from '../../constants/userForms'

export const useForm = () => {
	const [currentForm, setCurrentForm] = useState(USER_FORMS.FILTERS)

    const setFiltersForm = () => setCurrentForm(USER_FORMS.FILTERS)
    const setCreateForm = () => setCurrentForm(USER_FORMS.CREATE)
    const setEditForm = () => setCurrentForm(USER_FORMS.EDIT)
    const setDeleteForm = () => setCurrentForm(USER_FORMS.DELETE)

    return { currentForm, setCreateForm, setDeleteForm, setEditForm, setFiltersForm }
}