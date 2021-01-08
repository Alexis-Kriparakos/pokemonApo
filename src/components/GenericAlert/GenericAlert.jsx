import ReactModal from 'react-modal';
import styles from './GenericAlert.module.css';

export default function GenericAlert({isOpenModal, alertText, onClickCallback}) {
    const customStyles = {
        overlay: {
            position: 'fixed',
            top:0, 
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
        <ReactModal isOpen={isOpenModal} style={customStyles} ariaHideApp={false} >
            <div className={styles.modalContainer}>
                <p className={styles.text}>
                    {alertText}
                </p>
                <div>
                    <button className={styles.btnAccept} type='button' onClick={()=> onClickCallback()}>
                        OK
                    </button>
                </div>
            </div>
        </ReactModal>
    );
}