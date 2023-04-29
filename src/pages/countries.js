import { useState } from 'react'
import axios from 'axios'

const KEY = process.env.REACT_APP_API_KEY

const getCountries = (name) => {
    const request = axios.get(`https://restcountries.com/v3.1/name/${name}`)
    return request.then(response => response.data)
}

const geoCoding = ( city, ccode) => {
    const request = axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${ccode}&limit=1&appid=${KEY}`) 
}

const openWheather = ( city, ccode) => {
    const request = axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city},${ccode}&APPID=${KEY}&units=metric`)
    return request.then(response => response.data)
}


const Filter = ( {handleFilter} ) => {
    return (
        <form>
            <div>
                Find countries <input
                onChange={handleFilter}
                />
            </div>
        </form>
    )
}

const Notification = ( {notification, variant} ) => 
<p className={variant}>{notification}</p> 

const CountriesList = ( {countries, showHandler} )  => {
    return (
        <ul>
            {countries.map(country =>
                <li key={country.name.common}>{country.name.official} 
                <button className='btn' 
                onClick={() => showHandler(country.name.official) }>
                show</button></li>    
            )}
        </ul>
    )
}

const Country = ( { country } ) => {
    if ( country === null) {
        return
    }
    return(
        <>
            <h1>{country.name.official}</h1>
            <p>Capital: {country.capital[0]} </p>
            <p>Area: {country.area}</p>
            <h3>Languages:</h3>
            <ul>
                {Object.values(country.languages).map( l => <li key={l}>{l}</li>)}  
            </ul>
            <img src={country.flags.svg} alt={country.name.common} width='150'/>
        </>
    )
}

const Weather = ( {city} ) => {
    if ( city === null) {
        return
    }
    return(
        <>
           <h2>Weather in {city.name}</h2>
           <p>Temperature: {city.main.temp} Celcius</p>
           <img src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}/>
           <p>Weather: {city.weather[0].description}</p>
           <p>Wind {city.wind.speed} m/s</p>
        </>
    )
}



const Countries = () => {
    const [notification, setNotification] = useState('')
    const [countries, setCountries] = useState([])
    const [country, setCountry] = useState(null)
    const [variant, setVariant] = useState('nnormal')
    const [weather, setWeather] = useState( null )
    const [filter, setFilter] = useState('')

    const handleFilter = (event) => {
        event.preventDefault()
        let word = event.target.value
        if ( word === '') {
            setNotification('')
            setCountries([])
            setCountry(null)
            setWeather(null)
        } else {
            getCountries(word)
            .then(response => {
                if ( response.length > 10 ) {
                    setVariant('nnormal')
                    setNotification('Too many matches, specify another filter')
                    setCountries([])
                    setCountry(null)
                    setWeather(null)
                } else if ( response.length <= 10 && response.length > 1) {
                    setNotification('')
                    setCountries(response)
                    setCountry(null)
                    setWeather(null)
                } else {
                    //console.log(response[0])
                    setCountry(response[0])
                    setNotification('')
                    setCountries([])
                    openWheather(response[0].capital[0], response[0].cca2)
                    .then( response => {
                        setWeather(response)
                    })
                }
            })
            .catch(error => {
                setNotification('No country with that name')
                setCountries([])
                setCountry(null)
                setVariant('nerror')
                setCountry(null)
                setWeather(null)
            })
        }
    }

    const showHandlerr = (name) => {
        getCountries(name)
        .then(response => {
            setCountry(response[0])
            setNotification('')
            setCountries([])
            openWheather(response[0].capital[0], response[0].cca2)
                .then( response => {
                    setWeather(response)
            })
        })
        .catch(error => {
            setNotification('No country with that name')
            setCountries([])
            setCountry(null)
            setVariant('nerror')
            setCountry(null)
            setWeather(null)
        })
    }


    
    return(
        <div className="container">
            <Filter handleFilter={handleFilter} />
            <Notification notification={notification}
            variant={variant}/>
            <CountriesList countries={countries} showHandler={showHandlerr}/>
            <Country country={country} />
            <Weather city={weather} />
        </div>
    )
}

export default Countries