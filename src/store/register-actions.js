import { registerActions } from './register-slice';

const URL_USERS =
  'https://lasrecetasdejuan-d17ba-default-rtdb.firebaseio.com/users.json';

export const addUser = (user) => {
  return async (dispatch) => {
    const fetchUser = async () => {
      const request = await fetch(URL_USERS, {
        method: 'POST',
        body: JSON.stringify({
          email: user.userEmail,
          password: user.password,
        }),
      });
      if (!request.ok) {
        throw new Error('Error');
      }
    };
    try {
      await fetchUser();
      dispatch(registerActions.addUser(user));
    } catch (error) {}
  };
};
