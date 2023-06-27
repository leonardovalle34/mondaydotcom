import "./GlobalStyles.css"
import Modal from "../components/modal/Modal";
import { useState } from "react"
import { useModalContext } from "../contextApi/ModalContext";
import axios from "axios";
import { useEffect } from "react";
import { ICountries } from "../interfaces/CountriesInterface";
import Loading from "../components/loading/Loading";




export default function MainPage(){
    const [isLoading , setIsloading] = useState(false)
    const [searchField , setSearchField] = useState("");
    const [originalCountries , setOriginalCountries] = useState([])
    const [countries , setCountries] = useState([]);
    const [selectedCountries , setSelectedCountries] = useState(null);
    const [weather , setWeather] = useState([])
    const {isOpen , setIsOpen} = useModalContext()
    
    const removeAccents = (text:string) => {//function to remove accents used mostly on the search
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      };

    const handleSearchParam = () => {//function to make the search
        
        if(searchField.length > 0){
                const filteredItems = countries.filter((item : ICountries) =>{
                    if(item.capital){
                        const noAccentsCapital = removeAccents(item.capital[0].toLowerCase())
                        const noAccentsParam = removeAccents(searchField.toLowerCase())
                        return noAccentsCapital.includes(noAccentsParam)
                    }
                }
            );
            setCountries(filteredItems)
        }else if(searchField.length === 0){
            setCountries(originalCountries)
        }
      };
    const handleClick = async(country : any)=>{
        setIsOpen(true)
        setSelectedCountries(country)
        try{
            const responseWeather = await axios.get("http://localhost:3000/weather" , { params :{capital : country.capital[0]}});
            setWeather(responseWeather.data.main)
        }catch(error){
            console.log("Error sending params")
        }

    }

    const init = async()=>{
        setIsloading(true)
        const response : ICountries = await axios.get('http://localhost:3000/countries');
        const countriesList = response?.data?.sort((a:any,b:any)=>{
            if(a.name.common < b.name.common){
                return -1;
            }
            if(a.name.common > b.name.common){
                return 1
            }
            return 0
        })
        setCountries(countriesList)
        setOriginalCountries(countriesList)
        setIsloading(false)
    }


    useEffect(()=>{
        init()
    },[])

    useEffect(()=>{
        handleSearchParam()
    }, [searchField])

    return (
        <>
        {isLoading === true ?
            (
                <Loading />
            )
            :
            (
                <div className="MainCard">
                    <div className="InsideCard">
                        <h2>Search</h2>
                        <input 
                        value={searchField} 
                        type="text"  
                        placeholder="Type your search" className="MainInput"
                        onChange={(e)=>{setSearchField(e.target.value)}}
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
                                weather={weather}
                            />
                        )
                    }
                </div>
            )

        }
        </>
        
    )
}