import { useEffect, useState } from "react"
import { validateUsername, validatename } from "../users/userValidations"

export const useCreateForm = () => {
    const [formValues, setformValues] = useState({
		name: {
        value: '',
        error: undefined
      },
		username: {
        value: '',
        loading: false,
        error: undefined
      }
	})

  
	const setName = newName => {
    const error = validatename(newName)
    
		setformValues({
      ...formValues,
			name: { value: newName, error}
		})
  }
  
	const setUsername = newUsername => {
    const error = validateUsername(newUsername)
		setformValues({
      ...formValues,
			username: { value: newUsername, loading: !error, error }
		})
  }
  
  const setUsernameError = error => {
    setformValues(prevFormValues => ({
      ...prevFormValues,
      username: {
        value: prevFormValues.username.value,
        error,
        loading: false
      }
    }))
  }

  useEffect(() => {
    if (!formValues.username.loading) return

    const controller = new AbortController()

    const timeoutId = setTimeout(() => {
      validateUsernameIsAvailable(formValues.username.value, setUsernameError, controller.signal)
    }, 500)
    
    return () => {
      controller.abort()
      clearTimeout(timeoutId)
    }

  }, [formValues.username.loading, formValues.username.value])
  
  return { ...formValues, setName, setUsername, setUsernameError }
}

const validateUsernameIsAvailable = async(username, setUsernameError, signal) => {
  let error
  try {

    const res = await fetch(`http://localhost:4000/users?username=${username}`, { signal })
    if (res.ok) {
      const data = await res.json()
      if (data.length){
        error = 'Ya está en uso'
      }
      // OK : error = undefined
    } else {
      error = 'Error al validar'
    }
  } catch (err) {
    if (err.name === 'AbortError') return
    error = 'Error al validar'
  }
  setUsernameError(error)

}