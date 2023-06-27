import { Close } from "monday-ui-react-core/icons";
import './Modal.css';
import { useModalContext } from '../../contextApi/ModalContext';
import Loading from "../loading/Loading";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Modal() {
  const [weather , setWeather] = useState([]);

  const {isOpen , setIsOpen} = useModalContext();
  const {isLoadingModal , setIsLoadingModal} = useModalContext();
  const {countries , setCountries} = useModalContext();
  const {selectedCountries , setSelectedCountries} = useModalContext(); 


  const handleData = async()=>{   
    setIsLoadingModal(true)   
    try{
        const responseWeather = await axios.get("http://localhost:3000/weather" , { params :{capital : selectedCountries.capital[0]}});
        setWeather(responseWeather.data.main)
    }catch(error){
        console.log("Error sending params")
    }
    setIsLoadingModal(false)

  }

  console.log(weather)

  useEffect(()=>{
    handleData()
  },[])

  return (
    <div>

      
        <div className="modalOverlay">
          <div className="modalContent">
            <button className="modalCloseButton" onClick={()=>setIsOpen(false)}>
              <Close />
            </button>
              {
                isLoadingModal === true &&(
                  <Loading />
                )
              }
              {
                isLoadingModal === false &&(
                  <div>
                    <div className="modalBody">
                      <p><strong>flag:</strong>{selectedCountries.flag}</p>
                      <p><strong>Nome:</strong>{selectedCountries.name.common}</p>
                      <p><strong>Capital:</strong>{selectedCountries.capital[0]}</p>
                      <p><strong>Area:</strong>{selectedCountries.area}km²</p>
                      <p><strong>Region:</strong>{selectedCountries.region}</p>
                      <p><strong>Population:</strong>{selectedCountries.population}km²</p>                      
                    </div>
                    <div>
                      <p><strong>Temperature in: {selectedCountries.capital} : </strong>{weather.temp} cº</p>
                    </div>
                  </div>
                )
              }
          </div>
        </div>
    </div>
  );
}

