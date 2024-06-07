import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

export default function Weather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await searchWeather(city);
  };

  const searchWeather = async (city) => {
    const apiKey = '8c8056cf96c84492946613bc013cfcfc';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
      const response = await axios.get(url);
      console.log('API Response:', response.data); // API 응답 데이터 콘솔에 출력
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      console.error('API Error:', error); // 에러 메시지 콘솔에 출력
      setWeatherData(null);
      setError('도시를 찾을 수 없습니다. 다시 시도해주세요.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Wrapper>
        <InputCity
          type="text"
          name="city"
          placeholder="도시를 입력하세요."
          value={city}
          onChange={handleCityChange}
        />
        {weatherData && (
          <WeatherInfo>
            <p>{weatherData.name}</p>
            <p>{Math.round(((weatherData.main.temp- 273.15) * 10)) / 10}°C</p>
            <p>{weatherData.weather[0].main}</p>
          </WeatherInfo>
        )}
        {error && <Error>{error}</Error>}
      </Wrapper>
    </form>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`;

const InputCity = styled.input`
  width: 200px;
  height: 50px;
  margin-top: 10px;
  border-radius: 15px;
  padding: 5px;
  font-size: 16px;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
`;

const WeatherInfo = styled.div`
  margin-top: 20px;
  text-align: center;
  p {
    margin: 5px 0;
  }
`;

const Error = styled.div`
  color: red;
  margin-top: 20px;
`;
