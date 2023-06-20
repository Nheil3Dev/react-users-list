import { UsersList } from './components/UsersList'

const USERS = [
	{
		id: 0,
		name: 'Pablo Castellanos',
		active: true,
		role: 'teacher'
	},
	{
		id: 1,
		name: 'Jose Miguel Fernández',
		active: true,
		role: 'teacher'
	},
	{
		id: 2,
		name: 'Claudio López',
		active: false,
		role: 'student'
	}
]

export default function App() {
	return <UsersList initialUsers={USERS} />
}
