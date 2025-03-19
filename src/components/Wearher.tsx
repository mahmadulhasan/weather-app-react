import React, { useEffect, useRef, useState } from 'react'
import search_icon from '../assets/search.png'
import humidity_icon from '../assets/humidty.png'
import wind_icon from '../assets/wind.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloudy.png'
import rain_icon from '../assets/rain.png'
import drizzle_icon from '../assets/haizy.png'
import snow_icon from '../assets/snow.png'
import { error } from 'console'

const Wearher = () => {

    const [weaterdata, setWeatherdata] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,

    }

    const search = async (city) => {
        try {
            // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_ID}`;
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0a571d999e0d7804a4f3b3b8209dcb93`;


            const responce = await fetch(url);
            const data = await responce.json();
            if(!responce.ok){
                alert(data.message);
                return;
            }
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherdata({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
                weather: data.weather[0].main
            })
        } catch (error) {
            setWeatherdata(false);
            console.error("Error in fetching weather data");
        }
    }

    useEffect(() => {
        search("Kolkata");
    }, [])

    return (
        <div className="weater rounded-xl flex flex-col gap-4 ">
            <div className='div1 flex justify-between'>
                <input ref={inputRef} type="text" placeholder='Search' className='bg-white color-black rounded-xl ' />
                <img onClick={() => search(inputRef.current.value)} src={search_icon} alt="" className='' />
            </div>

            {weaterdata ? <>

                <div className='flex flex-col justify-center items-center div2 text-white'>
                    <img src={weaterdata.icon} alt="" />
                    <span className='text-xxxl font-bold '>{weaterdata.temperature}°C</span>
                    <span className='text-md font-bold '>{weaterdata.weather}</span>
                    <span className='text-xl font-bold '>{weaterdata.location}</span>
                </div>
                
            </> : <>
            <div style={{height:300,}}></div>
            </>}

                <div className="flex flex-row justify-between text-white font-bold div3">
                    <div className='flex gap-2'>
                        <img src={humidity_icon} alt="" />
                        <div className='flex flex-col '>
                            <span >{weaterdata.humidity} %</span>
                            <span >Humidity</span>
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <img src={wind_icon} alt="" />
                        <div className='flex flex-col'>
                            <span >{weaterdata.windSpeed} km/h</span>
                            <span >Wind Speed</span>
                        </div>
                    </div>

                </div>
        </div>

    )
}

export default Wearher
