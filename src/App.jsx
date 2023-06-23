import { UsersList } from './components/UsersList'

const USERS = [
	{
		username: 'pablo',
		name: 'Pablo Castellanos',
		active: true,
		role: 'teacher'
	},
	{
		username: 'jose',
		name: 'Jose Miguel Fernández',
		active: true,
		role: 'teacher'
	},
	{
		username: 'claudio',
		name: 'Claudio López',
		active: false,
		role: 'student'
	}
]

export default function App() {
	return <UsersList initialUsers={USERS} />
}
