import { useEffect, useState } from 'react'
import './App.css'
import {WEATHER_API_KEY, PEXEL_API_KEY} from '../api_key'
import axios from 'axios'

function App() {
  const [data, setData] = useState([])
  const [backgroundUrl, setBackgroundUrl] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=${WEATHER_API_KEY}`
  useEffect(() => {
    const  fetchData = async ()  => {
      const response = await axios.get(url)
      setData(response.data)
      const city = response.data.name
      const photo_link = `https://api.pexels.com/v1/search?query=${city}&per_page=1`
      
      getImage(photo_link)
    }
  fetchData()
  }, [])


  const getImage = async (photo_link) => {
    const response = await axios.get(photo_link, {
      headers: {
        'Authorization' : `${PEXEL_API_KEY}`,
        'Content-Type' : "application/json",
      }
    })
    setBackgroundUrl(response.data.photos[0].src.landscape)    
  }

  

  return (
    <>
     <div className="outer_container">
      <div className="search_container">
        <input placeholder='Enter a city' type="text" />
        <button>Search</button>
      </div>
      <div className="data_container">
        <img src={backgroundUrl} alt="" />
        <span>Place : {data.name ? data.name : "Loading"}</span>
        <span>Temperature : </span>
        <span>Humidity : </span>
        <span>Time : </span>

      </div>
     </div>
    </>
  )
}


export default App
