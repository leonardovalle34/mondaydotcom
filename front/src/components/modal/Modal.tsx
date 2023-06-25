import React, { useState } from 'react';
import { Close } from "monday-ui-react-core/icons";
import './Modal.css';
import { useModalContext } from '../../contextApi/ModalContext';

export default function Modal() {
  const {isOpen , setIsOpen} = useModalContext()

  return (
    <div>

      
        <div className="modalOverlay">
          <div className="modalContent">
            <button className="modalCloseButton" onClick={()=>setIsOpen(false)}>
              <Close />
            </button>
            <div className="modalBody">
              {/* Conteúdo do modal */}
              <h2>Modal</h2>
              <p>testanto modal</p>
            </div>
          </div>
        </div>
    </div>
  );
}

