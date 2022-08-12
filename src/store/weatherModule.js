import axios from 'axios';

export const weatherModule = {
  state: () => {
    return {
      weather: [],
      newCity: '',
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
      state.userLocation = userLocation
    }
  },
  actions: {
    async fetchWeather({ state, commit }) {
      try {
        if (state.userLocation && state.weather.length !== 0) {
          return;
        }

        navigator.geolocation.getCurrentPosition(({ coords }) => {
          commit('setUserLocation', {
            lat: coords.latitude,
            lon: coords.longitude
          })
        });

        const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
          params: {
            lat: state.userLocation.lat,
            lon: state.userLocation.lon,
            appid: process.env.VUE_APP_WEATHER_API_KEY,
            units: 'metric'
          }
        });
        if (!state.weather.find(item => item.id === response.data.id)) {
          commit('setWeather', [...state.weather, response.data]);
        }
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
            appid: process.env.VUE_APP_WEATHER_API_KEY,
            units: 'metric'
          }
        });

        if (state.weather.find(item => item.id === response.data.id)) {
          return;
        }

        commit('setWeather', [...state.weather, response.data]);
      } catch (error) {
        console.error(error);
      } finally {
        commit('setNewCity', '');
        commit('modalModule/showModal', false, { root: true });
      }
    }
  },
  namespaced: true
}
