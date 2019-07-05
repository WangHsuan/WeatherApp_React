import React from 'react';

import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';
import './App.css';

const API_KEY = '0a2e31671a8a7afa15bfe84802130cff';

class App extends React.Component{

  state = {
    temperature: undefined,
    temp_max:undefined,
    temp_min:undefined,
    city:undefined,
    country:undefined,
    humidity:undefined,
    description:undefined,
    error:undefined
  }

  getWeather = async (e)=>{
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    if(city &&country){
      console.log(data);
      this.setState({
      temperature: data.main.temp,
      temp_max:data.main.temp_max,
      temp_min:data.main.temp_min,
      city: data.name,
      country: data.sys.country,
      humidity:data.main.humidity,
      description:data.weather[0].description,
      error : ""
    })
    }
    else{
      console.log(data);
      this.setState({
      temperature: undefined,
      temp_max:undefined,
      temp_min:undefined,
      city: undefined,
      country: undefined,
      humidity:undefined,
      description: undefined,
      error : "Please enter the value"
    })
      
    }
  }
  render(){
    return (
      <div>
        <div className='wrapper'>
          <div className='main'>
            <div className='container'>
              <div className='row'>
                <div className='col-xs-5 title-container'>
                <Titles/>
                </div>
                <div className='col-xs-7 form-container'>
                <Form getWeather={this.getWeather}/>
                <Weather
                  temperature={this.state.temperature}
                  temp_max={this.state.temp_max}
                  temp_min={this.state.temp_min}
                  city={this.state.city}
                  country={this.state.country}
                  humidity={this.state.humidity}
                  description={this.state.description}
                  error={this.state.error}
                  />
                </div>
              </div>

            </div>

          </div>

        </div>

        
        
      </div>
    );
  }
}

export default App;