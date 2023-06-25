import "./styles.css"
import Modal from "../components/modal/Modal";
import { useState } from "react"
import { Search } from "monday-ui-react-core/icons";
import { useModalContext } from "../contextApi/ModalContext";
import axios from "axios";
import { useEffect } from "react";

export default function MainPage(){
  
    const [searchField , setSearchField] = useState("");
    const [countries , setCountries] = useState([])
    const {isOpen , setIsOpen} = useModalContext()
    

    const handleSearchParam = (e:string)=>{
        setSearchField(e)
    }
    const handleSubmit = ()=>{
        console.log(searchField)
    }

    const test = async()=>{
        const response : any = await axios.get('http://localhost:3000/countries');
        setCountries(response)
    }

    useEffect(()=>{
        test()
    },[])

    return (
        <div className="MainCard">
            <div className="InsideCard">
                <h2>Search</h2>
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
            <div className="InsideDiv">
                <div>
                    <table className="mainTable">
                    <thead>
                               <tr>
                                    <th>Country</th>
                                    <th>Capital</th>
                                    <th>Continent</th>
                                    <th>Region</th>
                                    <th>Subregion</th>
                                </tr>
                            </thead>
                        <tbody>
                            {
                                countries?.data?.map((el:any , i : number)=>{
                                    return(
                                        <tr key={i} className="tableRows">
                                            <th>{el.name.common}</th>
                                            <th>{el.capital}</th>
                                            <th>{el.continents.map((cont:string)=>{
                                                return(
                                                    cont
                                                )
                                            })}</th>
                                            <th>{el.region}</th>
                                            <th>{el.subregion}</th>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

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