import axios from 'axios';
import { capitalizeFirst } from "@/utils";

export const weatherModule = {
  state: () => {
    return {
      weather: [],
      airPollution: {},
      newCity: '',
      errorMsg: '',
      userLocation: []
    }
  },
  getters: {
  },
  mutations: {
    setWeather(state, weather) {
      state.weather = weather;
    },
    setNewCity(state, newCity) {
      state.newCity = newCity;
    },
    removeWeatherItem(state, id) {
      state.weather = [...state.weather].filter(item => item.id != id);
    },
    setUserLocation(state, userLocation) {
      state.userLocation = userLocation;
    },
    setErrorMsg(state, msg) {
      state.errorMsg = msg;
    },
    setAirPollution(state, airPollution) {
      state.airPollution = airPollution;
    }
  },
  actions: {
    async fetchWeather({ state, commit }) {
      console.log(state.weather[0] ? Math.round(Date.now() / 1000) - state.weather[0].dt : 'undef', 'обновлено');
      try {
        if (state.userLocation && state.weather[0] && Math.round(Date.now() / 1000) - state.weather[0].dt < 600) {
          return;
        }

        await navigator.geolocation.getCurrentPosition(async ({ coords }) => {
          commit('setUserLocation', {
            lat: coords.latitude,
            lon: coords.longitude
          });

          const responseWeather = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
            params: {
              lat: state.userLocation.lat,
              lon: state.userLocation.lon,
              appid: '4780e6411a8b61a4f735f5b116b440ed',
              units: 'metric',
              lang: 'ru'
            }
          });
          
          const responsePollution = await axios.get("http://api.openweathermap.org/data/2.5/air_pollution", {
            params: {
              lat: state.userLocation.lat,
              lon: state.userLocation.lon,
              appid: '4780e6411a8b61a4f735f5b116b440ed',
            }
          });

          const weather = {...responseWeather.data, ...responsePollution.data};
          console.log(weather)

          if (!state.weather.find(item => item.id === responseWeather.data.id)) {
            console.log(responseWeather);
            commit('setWeather', [...state.weather, weather]);
          }
        }, null, {
          enableHighAccuracy: true
        });
      } catch (error) {
        console.error(error);
      }
    },
    async addCity({ state, commit }) {
      const city = state.newCity.trim();

      if (!state.newCity.length || !city) {
        return;
      }

      try {
        const responseWeather = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
          params: {
            q: city,
            appid: '4780e6411a8b61a4f735f5b116b440ed',
            units: 'metric',
            lang: 'ru'
          }
        });

        const responsePollution = await axios.get("http://api.openweathermap.org/data/2.5/air_pollution", {
            params: {
              lat: responseWeather.data.coord.lat,
              lon: responseWeather.data.coord.lon,
              appid: '4780e6411a8b61a4f735f5b116b440ed',
            }
          });

        const weather = await {...responseWeather.data, ...responsePollution.data};
        console.log('add city', weather)

        if (state.weather.find(item => item.id === responseWeather.data.id)) {
          return;
        }

        commit('setWeather', [...state.weather, weather]);
        commit('modalModule/showModal', false, { root: true });
        commit('setNewCity', '');
      } catch (error) {
        commit('setErrorMsg', capitalizeFirst(error.responseWeather.data.message));
        commit('modalModule/showModal', true, { root: true });
      }
    }
  },
  namespaced: true
}
