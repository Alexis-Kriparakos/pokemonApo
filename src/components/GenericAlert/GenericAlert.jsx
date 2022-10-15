/* eslint-disable react/prop-types */
import React from 'react';
import ReactModal from 'react-modal';
import { MdOutlineCatchingPokemon, MdClose } from 'react-icons/md';
import { PrimaryButton } from '../Buttons/Buttons';
import styles from './GenericAlert.module.css';

export default function GenericAlert({
  isOpenModal, setIsOpenModal, children, onClickCallback,
}) {
  const customStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 9,
      background: 'rgba(0,0,0,0.3)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      padding: '0',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <ReactModal isOpen={isOpenModal} style={customStyles} ariaHideApp={false}>
      <div className={styles.container}>
        <div className={styles.modalContainer} id="cookiesPopup">
          <button type="button" className={styles.closeButton} onClick={() => setIsOpenModal(!isOpenModal)}>
            <MdClose className={styles.closeImage} />
          </button>
          <MdOutlineCatchingPokemon className={styles.img} />
          <div className={styles.content}>
            {children}
          </div>
          <PrimaryButton onClick={() => onClickCallback()}>Thats fine!</PrimaryButton>
        </div>
      </div>
    </ReactModal>
  );
}
