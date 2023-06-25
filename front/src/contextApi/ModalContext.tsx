import React, {createContext , useState , useContext , ReactNode} from "react";

interface IModal{
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalContext = createContext<IModal | undefined>(undefined);

interface IModalProps {
    children: ReactNode;
  }

const ModalState : React.FC<IModalProps> = ({children}) =>{
    
    const [isOpen, setIsOpen] = useState(false)
    

    const contextValue: IModal = {
        isOpen,
        setIsOpen,
    };

    return(
        <ModalContext.Provider value={contextValue}>
            {children}
        </ModalContext.Provider>
    )
}

const useModalContext = (): IModal => {
    const context = useContext(ModalContext);

    if(!context){
        throw new Error("Error")
    }

    return context
}

export {ModalState, useModalContext};