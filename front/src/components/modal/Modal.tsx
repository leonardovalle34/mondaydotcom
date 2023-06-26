import React, { useState } from 'react';
import { Close } from "monday-ui-react-core/icons";
import './Modal.css';
import { useModalContext } from '../../contextApi/ModalContext';

export default function Modal(props : any) {
  const {isOpen , setIsOpen} = useModalContext()   

  return (
    <div>

      
        <div className="modalOverlay">
          <div className="modalContent">
            <button className="modalCloseButton" onClick={()=>setIsOpen(false)}>
              <Close />
            </button>
            <div className="modalBody">
              <p>{props.name}</p>
              <p>{props.capital}</p> 
              <p>{props.region}</p>             
              <p>{props.subregion}</p>
            </div>
          </div>
        </div>
    </div>
  );
}

