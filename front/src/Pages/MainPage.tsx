import "./styles.css"
import { useState } from "react"
import { Search } from "monday-ui-react-core/icons";

export default function MainPage(){
    const [searchField , setSearchField] = useState("");

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
            <div>

            </div>
        </div>
    )
}