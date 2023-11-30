import { defineStore } from 'pinia'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_API_KEY;
const CITY_SEARCH_API_URL = 'http://api.openweathermap.org/data/2.5/find';
const CITY_HOURLY_FORECAST_URL = 'http://api.openweathermap.org/data/2.5/forecast';


export const useSearchStore = defineStore('search', {
  state: () => ({
    searchResults: [],
    placeData: [],
    showResults: false,
    hourlyForecast: [],
    apiKey: API_KEY,
    citySearchApiUrl: CITY_SEARCH_API_URL,
    cityHourlyForecast: CITY_HOURLY_FORECAST_URL,
    location: null
  
  }),

  actions: {
    async getWeatherForecast(cityData) {
      localStorage.setItem('cityData', JSON.stringify(cityData));

      const storedCityData = localStorage.getItem('cityData');
      if (storedCityData) {
        this.placeData = JSON.parse(storedCityData);
      }

      try {
        const hourlyResponse = await axios.get(this.cityHourlyForecast, {
          params: {
              lat: cityData.coord.lat,
              lon: cityData.coord.lon,
              appid: this.apiKey,
          },
      });
      localStorage.setItem('hourlyForecast', JSON.stringify(hourlyResponse.data.list));
        
      const storedForecast = localStorage.getItem('hourlyForecast');
      if (storedForecast) {
        this.hourlyForecast = JSON.parse(storedForecast);
      }

      } catch (error) {
        console.error('Error searching for cities:', error)
      }
    },
  
    async getCity(city) {

      try {
        const response = await axios.get(this.citySearchApiUrl, {
          params: {
            q: city,
            appid: this.apiKey,
            units: 'metric'
          }
        })
        this.searchResults = response.data.list
        this.showResults = true

      } catch (error) {
        console.error('Error searching for cities:', error)
      }
    },


    setShowResults(value) {
      this.showResults = value
    },

    setLocationName(value) {
      this.location = value;
    },

    loadFromLocalStorage() {
      // Attempt to load placeData from local storage
      const storedPlaceData = localStorage.getItem('cityData');
      const storedHourlyForecast = localStorage.getItem('hourlyForecast');
      
      if (storedPlaceData) {
        this.placeData = JSON.parse(storedPlaceData);
      }
    
     
      if (storedHourlyForecast) {
        this.hourlyForecast = JSON.parse(storedHourlyForecast);
      }
    
    }
    


  }
})
