import { UsersList } from './components/UsersList'

const USERS = [
	{
		name: 'Pablo Castellanos',
		active: true,
		role: 'teacher'
	},
	{
		name: 'Jose Miguel Fernández',
		active: true,
		role: 'teacher'
	},
	{
		name: 'Claudio López',
		active: false,
		role: 'student'
	}
]

export default function App() {
	return (
		<UsersList users={USERS}>
			<h1>Lista de Usuarios</h1>
		</UsersList>
	)
}
