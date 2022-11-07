/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';

import styles from './Buttons.module.scss';

export function PrimaryButton({ children, onClick = () => {}, ...rest }) {
  return (
    <button
      className={styles.primaryButton}
      type="button"
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, onClick = () => {}, ...rest }) {
  return (
    <button
      className={styles.secondaryButton}
      type="button"
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}

export default { PrimaryButton, SecondaryButton };
