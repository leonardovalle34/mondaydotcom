import "./GlobalStyles.css"
import Modal from "../components/modal/Modal";
import { useState } from "react"
import { useModalContext } from "../contextApi/ModalContext";
import axios from "axios";
import { useEffect } from "react";


interface Country {
    name: {
      common: string;
    };
    capital: string;
    region: string;
    subregion: string;
    
  }

export default function MainPage(){
  
    const [searchField , setSearchField] = useState("");
    const [countries , setCountries] = useState([]);
    const [selectedCountries , setSelectedCountries] = useState(null);
    const {isOpen , setIsOpen} = useModalContext()
    

    const handleSearchParam = (e:string)=>{
        setSearchField(e)
    }
    const handleClick = (country : any)=>{
        setIsOpen(true)
        setSelectedCountries(country)

    }

    const init = async()=>{
        const response : any = await axios.get('http://localhost:3000/countries');
        const countriesList:any = response?.data?.sort((a:any,b:any)=>{
            if(a.name.common < b.name.common){
                return -1;
            }
            if(a.name.common > b.name.common){
                return 1
            }
            return 0
        })
        setCountries(countriesList)
    }


    useEffect(()=>{
        init()
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
                                countries?.map((el:any , i : number)=>{
                                    return(
                                        <tr key={i} className="tableRows">
                                            <th className="clicableTh" onClick={()=>{handleClick(el)}}>{el.name.common}</th>
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
            {
                isOpen &&(
                    <Modal
                        name={selectedCountries?.name.common}
                        capital={selectedCountries?.capital}
                        region={selectedCountries?.region}
                        subregion={selectedCountries?.subregion}
                    />
                )
            }
        </div>
    )
}