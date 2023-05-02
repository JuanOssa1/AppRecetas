import React from 'react';
import * as ReactDOM from 'react-dom';
import styles from './NotificationToast.module.scss';
import { useSelector } from 'react-redux';
const portalElement = document.getElementById('overlays');

function Toast({ title, status }) {
  const notification = useSelector((state) => state.notifications);
  console.log(notification.notificationIsDeployed);
  return (
    <section
      className={`${
        styles[
          notification.notificationIsDeployed ? 'ToastOpen' : 'ToastClosed'
        ]
      } ${styles['notification']}`}
    >
      <h1 className={`${styles['notification__title']}`}>{title}</h1>
      <p className={`${styles['notification__status']}`}>{status}</p>
    </section>
  );
}

function NotificationToast({ title, status }) {
  return (
    <>
      {ReactDOM.createPortal(
        <Toast title={title} status={status} />,
        portalElement
      )}
    </>
  );
}

export default NotificationToast;
//className={`${styles['notification']}`}
