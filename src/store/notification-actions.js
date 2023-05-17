import { notificationActions } from './notifications-slice';

export const deployNotification = (notification) => {
  return async (dispatch) => {
    const setNotification = async () => {
      dispatch(
        notificationActions.setNotification({
          status: notification.status,
          title: notification.title,
          isDeployed: true,
        })
      );
      setTimeout(() => {
        dispatch(
          notificationActions.setNotification({
            isDeployed: false,
          })
        );
      }, notification.time);
    };
    await setNotification();
  };
};
