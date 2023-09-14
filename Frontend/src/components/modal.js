import React from 'react';
import '../css/modal.css'

const Modal = ({isOpen, onClose, children}) =>{ //children is the content of the modal
    if (!isOpen) return null; //if modal is not open, return nothing
    //if modal is open, return the modal
    return(
        <div className='modal'>
            <div className='modal-content'>
                 {children} {/*this is the content of the modal */}
                 <button onClick={onClose}>Close</button> {/* close button */}
                
                
            </div>
        </div>
    );
        

};

export default Modal