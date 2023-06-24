import "./styles.css"
import Modal from "../components/modal/Modal";
import { useState } from "react"
import { Search } from "monday-ui-react-core/icons";
import { useModalContext } from "../contextApi/ModalContext";

export default function MainPage(){
    const [searchField , setSearchField] = useState("");
    const {isOpen , setIsOpen} = useModalContext()

    const handleSearchParam = (e:string)=>{
        setSearchField(e)
    }
    const handleSubmit = ()=>{
        console.log(searchField)
    }

    return (
        <div className="MainCard">
            <div className="InsideDiv">
                <h2>Filter</h2>
                <input 
                value={searchField} 
                type="text"  
                placeholder="Type your search" className="MainInput"
                onChange={(e)=>{handleSearchParam(e.target.value)}}
                >    
                </input>
                <button className="Button" onClick={()=>handleSubmit()}>
                    <Search />
                </button>
            </div>
            <button style = {{width : "10px" , height : "10px"}} onClick={()=>setIsOpen(true)}>teste</button>
            {
                isOpen &&(
                    <Modal/>
                )
            }
        </div>
    )
}