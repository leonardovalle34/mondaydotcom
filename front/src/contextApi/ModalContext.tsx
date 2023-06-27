import React, {createContext , useState , useContext , ReactNode} from "react";
import { ICountries } from "../interfaces/CountriesInterface";

interface IModal{
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isLoadingModal: boolean;
    setIsLoadingModal: React.Dispatch<React.SetStateAction<boolean>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    countries:ICountries;
    setCountrie: React.Dispatch<React.SetStateAction<ICountries>>;
    selectedCountries: ICountries;
    setSelectedCountries : React.Dispatch<React.SetStateAction<ICountries>>;

}

const ModalContext = createContext<IModal | undefined>(undefined);

interface IModalProps {
    children: ReactNode;
  }

const ModalState : React.FC<IModalProps> = ({children}) =>{
    
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading , setIsLoading] = useState(true)
    const [isLoadingModal , setIsLoadingModal] = useState(false)
    const [countries , setCountries] = useState([])
    const [selectedCountries , setSelectedCountries] = useState(null);
    

    const contextValue: IModal = {
        isOpen,
        setIsOpen,
        isLoading,
        setIsLoading,
        countries,
        setCountries,
        selectedCountries,
        setSelectedCountries,
        isLoadingModal,
        setIsLoadingModal,
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