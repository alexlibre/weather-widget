import axios from 'axios';

export const weatherModule = {
  state: () => {
    return {
      weather: [],
      newCity: '',
      userLocation: []
    }
  },
  getters: {},
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
            appid: 'b55110c6a9590ad33803622c96ad9df0',
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
      if (!state.newCity.length) {
        return;
      }
      try {
        const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
          params: {
            q: state.newCity,
            appid: 'b55110c6a9590ad33803622c96ad9df0',
            units: 'metric'
          }
        });

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
