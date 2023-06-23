import { filterActiveUsers, filterUsersByName, paginateUsers, sortUsers } from "../users/filterUsers"

export const useUsers = ({ initialUsers, page, itemsPerPage, onlyActive, search, sortBy }) => {
    let usersFiltered = filterActiveUsers(initialUsers, onlyActive)
	usersFiltered = filterUsersByName(usersFiltered, search)
	usersFiltered = sortUsers(usersFiltered, sortBy)

    const totalPages = Math.ceil(usersFiltered.length / itemsPerPage)

    usersFiltered = paginateUsers(usersFiltered, page, itemsPerPage)
    
    return { users: usersFiltered, totalPages }
}