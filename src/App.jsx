import { UsersList } from './components/UsersList'
import { USER_ROLES } from './constants/userRoles'

const USERS = [
	{
		username: 'pablo',
		name: 'Pablo Castellanos',
		active: true,
		role: USER_ROLES.TEACHER
	},
	{
		username: 'jose',
		name: 'Jose Miguel Fernández',
		active: true,
		role: USER_ROLES.TEACHER
	},
	{
		username: 'claudio',
		name: 'Claudio López',
		active: false,
		role: USER_ROLES.STUDENT
	},
	{
		username: 'valeria',
		name: 'Valeria Bueno',
		active: false,
		role: USER_ROLES.OTHER
	}
]

export default function App() {
	return <UsersList initialUsers={USERS} />
}
