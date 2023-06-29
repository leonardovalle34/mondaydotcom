/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import { useModalContext } from '../../contextApi/ModalContext';
import { ItemHeightTriple } from 'monday-ui-react-core/icons';
import { Location } from 'monday-ui-react-core/icons';
import { MoveArrowUp } from 'monday-ui-react-core/icons';
import { MoveArrowDown } from 'monday-ui-react-core/icons';
import axios from 'axios';
import './Weather.css';

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

export default function WeatherComponent() {
  const { setIsLoadingModal } = useModalContext();
  const { selectedCountries } = useModalContext();
  const [weather, setWeather] = useState([]);
  const [imagemSrc, setImagemSrc] = useState(null);
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

  const handleData = async () => {
    setIsLoadingModal(true);
    try {
      const responseWeather = await axios.get('http://localhost:3000/weather', {
        params: { capital: selectedCountries?.capital[0] },
      });
      setWeather(responseWeather?.data);
      setImagemSrc(images[responseWeather?.data?.weather[0]?.icon]);
    } catch (error) {
      console.log('Error sending params');
    }
    setIsLoadingModal(false);
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <div className="weatherDiv">
      <h3>Weather</h3>
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
              <strong>{selectedCountries?.capital}</strong>
            </p>
            <p>
              <ItemHeightTriple /> {weather?.main?.temp} cº
            </p>
          </>
        ) : (
          <>
            <strong> {selectedCountries?.capital} : </strong>
            <p>No data</p>
          </>
        )}
      </p>
      <p>
        {selectedCountries?.capital ? (
          <>
            <p>
              <MoveArrowUp />
              {weather?.main?.temp_max} cº
            </p>
          </>
        ) : (
          <>
            <strong>
              <MoveArrowUp />
            </strong>
            <p>No data</p>
          </>
        )}
      </p>
      <p>
        {selectedCountries?.capital ? (
          <>
            <p>
              <MoveArrowDown />
              {weather?.main?.temp_min} cº
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
            <strong>Feels Like: </strong>
            <p>{weather?.main?.feels_like} cº</p>
          </>
        ) : (
          <>
            <strong>Feels Like: </strong>
            <p>No data</p>
          </>
        )}
      </p>
      <p>
        {selectedCountries?.capital ? (
          <>
            <strong>Humidity: </strong>
            <p>{weather?.main?.humidity}%</p>
          </>
        ) : (
          <>
            <strong>Humidity: </strong>
            <p>No data</p>
          </>
        )}
      </p>
      <p>
        {selectedCountries?.capital ? (
          <>
            <strong>wind speed: </strong>
            <p>{weather?.wind?.speed} km/h</p>
          </>
        ) : (
          <>
            <strong>Wind speed: </strong>
            <p>No data</p>
          </>
        )}
      </p>
    </div>
  );
}
