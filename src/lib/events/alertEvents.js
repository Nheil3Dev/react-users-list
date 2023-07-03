import { ALERT_KINDS } from '../../constants/alertKinds'

const EVENT_NAME = 'alert'

const suscribe = callback => {
	const handler = ev => callback(ev.detail)
	document.addEventListener(EVENT_NAME, handler)

	return handler
}

const unsuscribe = handler => document.removeEventListener(EVENT_NAME, handler)

const emitEvents = (kind, message) => {
	const event = new CustomEvent(EVENT_NAME, {
		detail: {
			kind,
			message
		}
	})
	document.dispatchEvent(event)
}

const success = message => emitEvents(ALERT_KINDS.SUCCESS, message)

const error = message => emitEvents(ALERT_KINDS.ERROR, message)

export const alertBox = {
	success,
	error,
	suscribe,
	unsuscribe
}
