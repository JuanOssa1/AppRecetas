import { loginActions } from './login-slice';

const URL_USERS =
  'https://lasrecetasdejuan-d17ba-default-rtdb.firebaseio.com/users.json';

export const logUser = (userToValidate) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const fetchUsers = await fetch(URL_USERS);
      if (!fetchUsers.ok) {
        throw new Error('error');
      }
      const usersData = await fetchUsers.json();
      return usersData;
    };
    try {
      const users = await fetchData();
      let userToReturn;
      for (const iterator in users) {
        if (users[iterator].email === userToValidate.userEmail) {
          if (users[iterator].password === userToValidate.password) {
            userToReturn = { ...users[iterator], id: iterator };
          }
        }
      }
      dispatch(loginActions.setUser(userToReturn));
    } catch (error) {}
  };
};
