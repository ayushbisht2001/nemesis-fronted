import server from './server'

export const userRegister = `${server}/api/user/register/`;
export const userLogin = `${server}/api/user/login/`;
export const userLogout = `${server}/api/user/logout/`;


export const fetchUsersData = `${server}/api/user/get_users_list/`;
export const deleteUser = `${server}/api/user/delete_user/`;
export const updateUser = `${server}/api/user/update_user/`;