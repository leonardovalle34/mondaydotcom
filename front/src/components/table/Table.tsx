import "../../Pages/GlobalStyles.css"
import { useState } from "react";
import { useModalContext } from "../../contextApi/ModalContext"
import axios from "axios";
import { useEffect } from "react";
import { ICountries } from "../../interfaces/CountriesInterface";
import Loading from "../loading/Loading";

export default function Table(){
    const [searchField , setSearchField] = useState("");
    const [previousSearchField , setPreviousSearchField] = useState("")
    const [originalCountries , setOriginalCountries] = useState([])
    

    const {isOpen , setIsOpen} = useModalContext();
    const {isLoading , setIsLoading} = useModalContext();
    const {countries , setCountries} = useModalContext();
    const {selectedCountries , setSelectedCountries} = useModalContext();

    
    const removeAccents = (text:string) => {//function to remove accents used mostly on the search
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };

    
    const searchAhead = ()=>{//function made to make the search in case of any simple type in the input
    const filteredItems = countries.filter((item : ICountries) =>{
        if(item.capital){
            const noAccentsCapital = removeAccents(item.capital[0].toLowerCase())
            const noAccentsCommonName = removeAccents(item.name.common.toLowerCase());
            const noAccentsRegion = removeAccents(item.region.toLowerCase());
            //const noAccentsRegionSubregion = removeAccents(item.subregion.toLowerCase());
            //const noAccentsFifa = removeAccents(item.fifa.toLowerCase());

            const noAccentsParam = removeAccents(searchField.toLowerCase())
            
            return (
                noAccentsCapital.includes(noAccentsParam) || 
                noAccentsCommonName.includes(noAccentsParam) ||
                noAccentsRegion.includes(noAccentsParam) 
                //noAccentsRegionSubregion.includes(noAccentsParam) 
                //noAccentsFifa.includes(noAccentsParam)    
            )
        }
       
    })
    
    setCountries(filteredItems)
    }


    const searchBehind = ()=>{//function made to make the search in case of any simple type in the input
        const filteredItems = originalCountries.filter((item : ICountries) =>{
            if(item.capital){
                const noAccentsCapital = removeAccents(item.capital[0].toLowerCase())
                const noAccentsCommonName = removeAccents(item.name.common.toLowerCase());
                const noAccentsRegion = removeAccents(item.region.toLowerCase());
                //const noAccentsRegionSubregion = removeAccents(item.subregion.toLowerCase());
                //const noAccentsFifa = removeAccents(item.fifa.toLowerCase());
                const noAccentsParam = removeAccents(searchField.toLowerCase())
                
                return (
                    noAccentsCapital.includes(noAccentsParam) || 
                    noAccentsCommonName.includes(noAccentsParam) ||
                    noAccentsRegion.includes(noAccentsParam)
                    //noAccentsRegionSubregion.includes(noAccentsParam) 
                    //noAccentsFifa.includes(noAccentsParam)    
                )
            }
        })
        setCountries(filteredItems)
    }
    const handleClick = (country : ICountries)=>{
        setSelectedCountries(country)
        setIsOpen(true)
    }

    const preHandleSearch = async() =>{

        if(searchField.length > 0){
            if(previousSearchField.length < searchField.length){
                searchAhead()
            }else if(previousSearchField.length > searchField.length){
                searchBehind()
            }
        }else if(searchField.length === 0){
            setCountries(originalCountries)
        }
    }

    const init = async()=>{
        const response : ICountries = await axios.get('http://localhost:3000/countries');
        const countriesList:ICountries = response?.data?.sort((a:any,b:any)=>{
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
        setIsLoading(false)
    }


    useEffect(()=>{
        setIsLoading(true)
        init()
    },[])

    useEffect(()=>{
        setPreviousSearchField(searchField)
        preHandleSearch()
    },[searchField])
    return(
        <>
            {
                isLoading === true ? (
                    <Loading />
                ):(
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
                            {
                                countries?.length === 0 ?(
                                    <div>
                                        <h2>No matches for your search try again.. :(</h2>
                                    </div>
                                ):(
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
                                )
                            }
                        </div>
                    </div>
                )
            }
        </>
    )
}