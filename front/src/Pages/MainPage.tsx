import "./styles.css"
import Modal from "../components/modal/Modal";
import { useState } from "react"
import { Search } from "monday-ui-react-core/icons";
import mondaySdk from 'monday-sdk-js'
import { useModalContext } from "../contextApi/ModalContext";
import axios from "axios";
import { useEffect } from "react";

export default function MainPage(){
    const sdk = mondaySdk()
    const [searchField , setSearchField] = useState("");
    const {isOpen , setIsOpen} = useModalContext()
    
    sdk.get("settings").then(res => {
        // Add your code here to handle the response
        console.log(res); // Example: Output the response to the console
      }).catch(error => {
        // Handle any errors that occurred during the API request
        console.error("Error retrieving settings:", error);
      });

    const handleSearchParam = (e:string)=>{
        setSearchField(e)
    }
    const handleSubmit = ()=>{
        console.log(searchField)
    }

    const test = async()=>{
        const response = await axios.get('https://restcountries.com/v3.1/all');
        console.log(response)
    }

    useEffect(()=>{
        test()
    },[])

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