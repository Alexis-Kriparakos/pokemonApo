/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import cn from 'classnames';

import styles from './Buttons.module.scss';

function PrimaryButton({ children, onClick = () => {}, ...rest }) {
  return (
    <button
      className={cn(styles.button, styles.primaryButton)}
      type="button"
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}

// export function SecondaryButton({ children, onClick = () => {}, ...rest }) {
//   return (
//     <button
//       className={cn(styles.button, styles.secondaryButton)}
//       type="button" onClick={onClick} {...rest}>
//       {children}
//     </button>
//   );
// }
export default { PrimaryButton };
