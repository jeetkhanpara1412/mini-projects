import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  let [city, setcity] = useState('');
  let [wDetails, setwdetails] = useState(null);
  let [isLoading, setisLoading] = useState(false);
  let [counter,setCounter]=useState=(1)

  let getData = (event) => {
    setisLoading(true);
    event.preventDefault();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`)
      .then((res) => res.json())
      .then((finalRes) => {
        if (finalRes.cod === "404") {
          setwdetails(null);
        } else {
          setwdetails(finalRes);
        }
        setisLoading(false);
      });
    setcity('');
  };
  let changeCounter=()=>{
    setCounter(counter+1)
  }
  useEffect(()=>{
    console.log("jeet")
  },[counter])

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 bg-info'>
      {counter}
      <button onClick={changeCounter}>Count</button>
      <div className='container text-center'>
        <h1 className='display-4 fw-bold text-white mb-4'>🌤️ Simple Weather App</h1>

        <form className="d-flex justify-content-center mb-4" onSubmit={getData}>
          <input
            type='text'
            className='form-control'
            placeholder='Enter City Name'
            value={city}
            onChange={(e) => setcity(e.target.value)}
            style={{ width: '300px', height: '45px', paddingLeft: '10px' }}
            required
          />
          <button className='btn btn-dark ms-2' style={{ height: '45px' }}>
            Search
          </button>
        </form>

        <div className='card shadow-lg mx-auto p-4 bg-light position-relative' style={{ maxWidth: '400px' }}>
          {/* Loader Image */}
          <img
            src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif'
            width={'100px'}
            style={{
              position: 'absolute',
              top: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: isLoading ? 'block' : 'none'
            }}
          />

          {wDetails ? (
            <>
              <h3 className='card-title fw-bold'>
                {wDetails.name},
                <span className='ms-2 badge bg-warning text-dark'>{wDetails.sys.country}</span>
              </h3>
              <h2 className='fw-bold'>{wDetails.main.temp}°C</h2>
              <img
                src={`https://openweathermap.org/img/wn/${wDetails.weather[0].icon}@2x.png`}
                alt="weather icon"
                className='my-3'
                style={{ width: '100px' }}
              />
              <p className='text-capitalize text-secondary fs-5'>
                {wDetails.weather[0].description}
              </p>
            </>
          ) : (
            <div className="text-white fs-5">Enter a city to get weather data.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
