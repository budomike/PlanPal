'use client';

import React, { useEffect, useState } from 'react';
import { Weather, WeatherData, WeatherResponse } from '../lib/definitions';
import { lusitana } from '@/app/ui/fonts';
import { formatDateToLocal } from '../lib/utils';

export default function WeatherForecast() {
    const [ afternoonWeatherForecast, setAfternoonWeatherForecast ] = useState<WeatherData[]>([]);
    const [ eveningWeatherForecast, setEveningWeatherForecast ] = useState<WeatherData[]>([]);

    useEffect(() => {
        getWeatherForecast();
    }, []);

    const getWeatherForecast = async () => {
        const apiKey = process.env.NEXT_PUBLIC_API_ACCESS_KEY;
        const api = await fetch (`https://api.openweathermap.org/data/2.5/forecast?lat=43.653226&lon=-79.3831843&appid=${apiKey}&units=metric`)
        const data: WeatherResponse = await api.json();
        const afternoonDailyData = extractDailyData(data.list, "12:00:00");
        const eveningDailyData = extractDailyData(data.list, "18:00:00")
        setAfternoonWeatherForecast(afternoonDailyData);
        setEveningWeatherForecast(eveningDailyData);
    }

    const extractDailyData = (weatherList: WeatherData[], time: string): WeatherData[] => {
        return weatherList.filter(entry => entry.dt_txt.endsWith(time));
      };

      return (
        <div>
            <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                5-Day Forecast (Afternoon)
            </h2>
            <div className="flex justify-between">
                {afternoonWeatherForecast.slice(0, 5).map((weather, index) => (
                    <div key={index} className="flex flex-col items-center border p-4 rounded-lg shadow-md w-1/5 bg-blue-200">
                        <h3 className="text-lg font-bold">{formatDateToLocal(weather.dt_txt)}</h3>
                        <p>Temp: {weather.main.temp}°C</p>
                        <p>Condition: {weather.weather[0].description}</p>
                        <p>POP: {(weather.pop * 100)}%</p>
                        <p>Wind: {(weather.wind.speed * 3600 / 1000).toFixed(2)} km/h</p>
                        <p>Humidity: {weather.main.humidity}%</p>
                        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt={weather.weather[0].description} />
                    </div>
                ))}
            </div>
            <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl mt-4`}>
                5-Day Forecast (Evening)
            </h2>
            <div className="flex justify-between">
                {eveningWeatherForecast.slice(0, 5).map((weather, index) => (
                    <div key={index} className="flex flex-col items-center border p-4 rounded-lg shadow-md w-1/5 bg-slate-500">
                        <h3 className="text-lg font-bold">{formatDateToLocal(weather.dt_txt)}</h3>
                        <p>Temp: {weather.main.temp}°C</p>
                        <p>Condition: {weather.weather[0].description}</p>
                        <p>POP: {(weather.pop * 100)}%</p>
                        <p>Wind: {(weather.wind.speed * 3600 / 1000).toFixed(2)} km/h</p>
                        <p>Humidity: {weather.main.humidity}%</p>
                        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt={weather.weather[0].description} />
                    </div>
                ))}
            </div>
        </div>
    );
}


