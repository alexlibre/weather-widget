import axios from 'axios';
import { capitalizeFirst } from "@/utils";

export const weatherModule = {
  state: () => {
    return {
      weather: [],
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
    }
  },
  actions: {
    async fetchWeather({ state, commit }) {
      try {
        if (state.userLocation && state.weather.length !== 0) {
          return;
        }

        await navigator.geolocation.getCurrentPosition(async ({ coords }) => {
          commit('setUserLocation', {
            lat: coords.latitude,
            lon: coords.longitude
          });

          const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
            params: {
              lat: state.userLocation.lat,
              lon: state.userLocation.lon,
              appid: 'b55110c6a9590ad33803622c96ad9df0',
              units: 'metric'
            }
          });

          if (!state.weather.find(item => item.id === response.data.id)) {
            commit('setWeather', [...state.weather, response.data]);
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
        const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
          params: {
            q: city,
            appid: 'b55110c6a9590ad33803622c96ad9df0',
            units: 'metric'
          }
        });

        if (state.weather.find(item => item.id === response.data.id)) {
          return;
        }

        commit('setWeather', [...state.weather, response.data]);
        commit('modalModule/showModal', false, { root: true });
        commit('setNewCity', '');
      } catch (error) {
        commit('setErrorMsg', capitalizeFirst(error.response.data.message));
        commit('modalModule/showModal', true, { root: true });
      }
    }
  },
  namespaced: true
}
