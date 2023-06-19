import { UsersList } from './components/UsersList'

export default function App() {
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

	return (
		<UsersList users={USERS}>
			<h1>Lista de Usuarios</h1>
		</UsersList>
	)
}
