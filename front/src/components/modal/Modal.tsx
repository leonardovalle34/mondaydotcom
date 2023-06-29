/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { Close } from 'monday-ui-react-core/icons';
import { ItemHeightTriple } from 'monday-ui-react-core/icons';
import { Location } from 'monday-ui-react-core/icons';
import { MoveArrowUp } from 'monday-ui-react-core/icons';
import { MoveArrowDown } from 'monday-ui-react-core/icons';
import './Modal.css';
import { useModalContext } from '../../contextApi/ModalContext';
import Loading from '../loading/Loading';
import { useEffect, useState } from 'react';
import axios from 'axios';

import img01d from '../../imgs/01d.png';
import img01n from '../../imgs/01n.png';
import img02d from '../../imgs/02d.png';
import img02n from '../../imgs/02n.png';
import img03d from '../../imgs/03d.png';
import img03n from '../../imgs/03n.png';
import img04d from '../../imgs/04d.png';
import img04n from '../../imgs/04n.png';
import img09d from '../../imgs/09d.png';
import img09n from '../../imgs/09n.png';
import img10d from '../../imgs/10d.png';
import img10n from '../../imgs/10n.png';
import img11d from '../../imgs/11d.png';
import img11n from '../../imgs/11n.png';
import img13d from '../../imgs/13d.png';
import img13n from '../../imgs/13n.png';
import img50d from '../../imgs/50d.png';
import img50n from '../../imgs/50n.png';

export default function Modal() {
  const images = {
    '01d': img01d,
    '01n': img01n,
    '02d': img02d,
    '02n': img02n,
    '03d': img03d,
    '03n': img03n,
    '04d': img04d,
    '04n': img04n,
    '09d': img09d,
    '09n': img09n,
    '10d': img10d,
    '10n': img10n,
    '11d': img11d,
    '11n': img11n,
    '13d': img13d,
    '13n': img13n,
    '50d': img50d,
    '50n': img50n,
  };
  const [weather, setWeather] = useState([]);
  const [icon, setIcon] = useState(null);
  const [imagemSrc, setImagemSrc] = useState(null);
  const { setIsOpen } = useModalContext();
  const { isLoadingModal, setIsLoadingModal } = useModalContext();
  const { selectedCountries } = useModalContext();
  const [celsiusOrFarenheght, setCelsiusOrFarenheght] = useState('c');

  const handleData = async () => {
    setIsLoadingModal(true);
    try {
      const responseWeather = await axios.get('http://localhost:3000/weather', {
        params: { capital: selectedCountries?.capital[0] },
      });
      setWeather(responseWeather?.data);
      setIcon(responseWeather?.data?.weather[0]?.icon);
      setImagemSrc(images[responseWeather?.data?.weather[0]?.icon]);
    } catch (error) {
      console.log('Error sending params');
    }
    setIsLoadingModal(false);
  };

  console.log(weather);

  useEffect(() => {
    handleData();
  }, []);

  return (
    <div>
      <div className="modalOverlay">
        <div className="modalContent">
          <button className="modalCloseButton" onClick={() => setIsOpen(false)}>
            <Close />
          </button>
          {isLoadingModal === true && <Loading />}
          {isLoadingModal === false && (
            <div className="mainInsideModal">
              <div className="modalBody">
                <p>
                  {selectedCountries?.flag ? (
                    <>
                      <div className="insideModalDiv">
                        <strong>Flag:</strong> <p>{selectedCountries?.flag}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="insideModalDiv">
                        <strong>Flag:</strong> <p>No Data</p>
                      </div>
                    </>
                  )}
                </p>

                <p>
                  {selectedCountries?.name?.common ? (
                    <>
                      <div className="insideModalDiv">
                        <strong>Country:</strong> <p>{selectedCountries?.name.common}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="insideModalDiv">
                        <strong>Name:</strong> <p>No Data</p>
                      </div>
                    </>
                  )}
                </p>

                <p>
                  {selectedCountries?.capital ? (
                    <>
                      <div className="insideModalDiv">
                        <strong>Capital:</strong> <p>{selectedCountries?.capital}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="insideModalDiv">
                        <strong>Capital:</strong> <p>No Data</p>
                      </div>
                    </>
                  )}
                </p>
                <p>
                  {selectedCountries?.area ? (
                    <>
                      <div className="insideModalDiv">
                        <strong>Area:</strong> <p>{selectedCountries?.area} km²</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="insideModalDiv">
                        <strong>Area:</strong> <p>No Data</p>
                      </div>
                    </>
                  )}
                </p>
                <p>
                  {selectedCountries?.region ? (
                    <>
                      <div className="insideModalDiv">
                        <strong>Region:</strong> <p>{selectedCountries?.region}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="insideModalDiv">
                        <strong>Region:</strong> <p>No Data</p>
                      </div>
                    </>
                  )}
                </p>
                <p>
                  {selectedCountries?.region ? (
                    <>
                      <div className="insideModalDiv">
                        <strong>Sub-Region:</strong> <p>{selectedCountries?.subregion}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="insideModalDiv">
                        <strong>Sub-Region:</strong> <p>No Data</p>
                      </div>
                    </>
                  )}
                </p>
                <p>
                  {selectedCountries?.population ? (
                    <>
                      <div className="insideModalDiv">
                        <strong>Population:</strong> <p>{selectedCountries?.population}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="insideModalDiv">
                        <strong>Capital:</strong> <p>No Data</p>
                      </div>
                    </>
                  )}
                </p>
              </div>
              <div className="weatherDiv">
                <h2>Weather</h2>
                <p>
                  {selectedCountries?.capital ? (
                    <>
                      {images && <img src={imagemSrc} alt="" />}
                      <p>{weather?.weather?.[0].description}</p>
                    </>
                  ) : (
                    <>
                      <strong>{selectedCountries?.capital} : </strong>
                      <p>No data</p>
                    </>
                  )}
                </p>
                <p>
                  {selectedCountries?.capital ? (
                    <>
                      <p>
                        <Location />
                        {selectedCountries?.capital}
                      </p>
                    </>
                  ) : (
                    <>
                      {selectedCountries?.capital} :<p>No data</p>
                    </>
                  )}
                </p>
                <p>
                  {selectedCountries?.capital ? (
                    <>
                      <p>
                        <ItemHeightTriple />{' '}
                        {celsiusOrFarenheght === 'c' ? (
                          <p>{weather?.main?.temp.toFixed(1)}°C</p>
                        ) : (
                          <p>{(weather?.main?.temp * 1.8 + 32).toFixed(1)}°F</p>
                        )}
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        <ItemHeightTriple /> : No data
                      </p>
                    </>
                  )}
                </p>
                <p>
                  {selectedCountries?.capital ? (
                    <>
                      <p>
                        <MoveArrowUp />{' '}
                        {celsiusOrFarenheght === 'c' ? (
                          <p>{weather?.main?.temp_max.toFixed(0)}°C</p>
                        ) : (
                          <p>{Math.ceil(weather?.main?.temp_max * 1.8 + 32).toFixed(0)}°F</p>
                        )}
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        <MoveArrowUp /> No data
                      </p>
                    </>
                  )}
                </p>
                <p>
                  {selectedCountries?.capital ? (
                    <>
                      <p>
                        <MoveArrowDown />{' '}
                        {celsiusOrFarenheght === 'c' ? (
                          <p>{weather?.main?.temp_min.toFixed(0)}°C</p>
                        ) : (
                          <p>{Math.floor(weather?.main?.temp_min * 1.8 + 32).toFixed(0)}°F</p>
                        )}
                      </p>
                    </>
                  ) : (
                    <>
                      <strong>Max: </strong>
                      <p>No data</p>
                    </>
                  )}
                </p>
                <p>
                  {selectedCountries?.capital ? (
                    <>
                      <p>
                        {celsiusOrFarenheght === 'c' ? (
                          <p>Feels Like: {weather?.main?.feels_like.toFixed(0)}°C</p>
                        ) : (
                          <p>Feels Like: {(weather?.main?.feels_like * 1.8 + 32).toFixed(0)}°F</p>
                        )}
                      </p>
                    </>
                  ) : (
                    <>
                      <p>Feels Like: No data</p>
                    </>
                  )}
                </p>
                <p>
                  {selectedCountries?.capital ? (
                    <>
                      <p>Humidity: {weather?.main?.humidity}%</p>
                    </>
                  ) : (
                    <>
                      <p>Humidity: No data</p>
                    </>
                  )}
                </p>
                <p>
                  {selectedCountries?.capital ? (
                    <>
                      <p>wind speed: {weather?.wind?.speed} km/h</p>
                    </>
                  ) : (
                    <>
                      <p>Wind speed: No data</p>
                    </>
                  )}
                </p>
                <div>
                  <button className="buttonForC" onClick={() => setCelsiusOrFarenheght('f')}>
                    F°
                  </button>
                  <button className="buttonForC" onClick={() => setCelsiusOrFarenheght('c')}>
                    C°
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
