import Table from "../components/table/Table"
import Modal from "../components/modal/Modal"
import { useModalContext } from "../contextApi/ModalContext"

export default function MainPage(){
    const {isOpen } = useModalContext()    


    return (
        <>
            <Table />
            {
                isOpen === true &&(
                    <Modal />
                )
            }
        </>
    )
}