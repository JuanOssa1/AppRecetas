import React from 'react';

function ModalWrapper({ children }) {
  return <section className={`${styles['modal-wrapper']}`}>{children}</section>;
}

export default ModalWrapper;
