import ReactModal from 'react-modal';
import styles from '../GenericAlert.module.css';

export default function GenericAlert(isModalOpen, alertText, onClickCallback) {
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
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translated(-50%, -50%, 0)',
            padding: 0,
            right: 'unset',
            bottom: 'unset'
        },
    };
    return (
        <ReactModal isOpen={isModalOpen} style={customStyles} ariaHideApp={false} >
            <div>
                <p>
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