import { useState, useEffect } from 'react';
import './Weather.css';

import countries from 'i18n-iso-countries';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

/**
 * Adds Google Weather API to the website.
 * @namespace Weather
 * @component
 */
function Weather() {
  // State
  const [apiData, setApiData] = useState({});
  const [getState, setGetState] = useState('college station');
  const [state, setState] = useState('college station');

  // API KEY AND URL
  const apiKey = "6c699f9a22ed51c371823b466464b526";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;

  // Side effect
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }, [apiUrl]);

  const inputHandler = (event) => {
    setGetState(event.target.value);
  };

  const submitHandler = () => {
    setState(getState);
  };

  const kelvinToFarenheit = (k) => {
    return ((k - 273.15)*(9/5)+32).toFixed(2);
  };

  return (
    <div className="App">
      <header className="d-flex justify-content-center align-items-center">
        <h2 className='head' >Check Your Weather to Safely Get to Us!</h2>
      </header>
      <div className="container mt-5">
        <div className="mt-3 d-flex flex-column justify-content-center align-items-center">
          <div class="col-auto">
            <label for="location-name" class="col-form-label" className='head'>
              Enter Location :
            </label>
          </div>
          <div class="col-auto">
            <input
              type="text"
              id="location-name"
              class="form-control"
              onChange={inputHandler}
              value={getState}
            />
          </div>
          <button className="btn btn-primary mt-2" onClick={submitHandler}>
            Search
          </button>
        </div>

        <div className="card mt-3 mx-auto" style={{ width: '20vw' }}>
          {apiData.main ? (
            <div class="card-body text-center">
              <img
                src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
                alt="weather status icon"
                className="weather-icon"
              />

              <p className="h2">
                {kelvinToFarenheit(apiData.main.temp)}&deg; F
              </p>

              <p className="h5">
                <i className="fas fa-map-marker-alt"></i>{' '}
                <strong>{apiData.name}</strong>
              </p>

              <div className="row mt-4">
                <div className="col-md-6">
                  <p>
                    <i class="fas fa-temperature-low "></i>{' '}
                    <strong>
                       Low: {kelvinToFarenheit(apiData.main.temp_min)}&deg; F
                    </strong>
                  </p>
                  <p>
                    <i className="fas fa-temperature-high"></i>{' '}
                    <strong>
                      High: {kelvinToFarenheit(apiData.main.temp_max)}&deg; F
                    </strong>
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    {' '}
                    <strong>{apiData.weather[0].main}</strong>
                  </p>
                  <p>
                    <strong>
                      {' '}
                      {countries.getName(apiData.sys.country, 'en', {
                        select: 'official',
                      })}
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <h1>Loading</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default Weather;