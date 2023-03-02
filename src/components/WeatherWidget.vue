<template>
  <div class="widget">
    <button class="widget__settings-btn" @click="openModal"><SettingsIcon/></button>
    <transition name="fade">
      <Modal v-if="isOpened" @closeModal="closeModal" class="settings">
        <div slot="header" class="settings__header">
          <h2>Настройки</h2>
          <button class="modal__close-btn" @click="closeModal"><CloseIcon/></button>
        </div>
        <div v-if="weather.length" slot="body" class="settings__body">
          <draggable v-model='weather' class="settings__items">
            <Entry v-for="entry in weather" :key="entry.id" :entryData="entry" @removeEntry="removeWeatherItem" />
          </draggable>
        </div>
        <div slot="footer" class="add-city">
          <h5 class="add-city__title">Add location</h5>
          <p class="add-city__error">{{errorMsg}}</p>
          <form class="add-city__form" @submit.prevent>
            <input type="text" class="add-city__input" placeholder="e.g. London" v-bind:value="newCity" @input="inputNewCity">
            <button @click="addCity" class="add-city__btn" :disabled="newCity.length < 3">Найти</button>
          </form>
        </div>
      </Modal>

    </transition>
    <div class="widget__list" v-if="weather.length">
      <Place v-for="(weatherItem, idx) in weather" :key="weatherItem.id" :weatherData="weatherItem"/>
    </div>
    <h3 class="widget__empty" v-else>Список городов пуст</h3>
  </div>
</template>
<script>
import Modal from "./Modal/Modal.vue";
import Place from "./Place/Place.vue";
import Entry from "./Entry/Entry.vue";
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import SettingsIcon from '../assets/settings.svg';
import CloseIcon from '../assets/close.svg';

import draggable from 'vuedraggable';

export default {
  methods: {
    ...mapActions({
      fetchWeather: 'weatherModule/fetchWeather',
      addCity: 'weatherModule/addCity',
    }),
    ...mapMutations({
      setErrorMsg: 'weatherModule/setErrorMsg',
      setWeather: 'weatherModule/setWeather',
      setNewCity: 'weatherModule/setNewCity',
      showModal: 'modalModule/showModal',
      removeWeatherItem: 'weatherModule/removeWeatherItem'
    }),
    openModal() {
      this.showModal(true);
    },
    closeModal() {
      this.showModal(false);
    },
    inputNewCity(event) {
      this.setErrorMsg('');
      this.setNewCity(event.target.value);
    }
  },
  computed: {
    ...mapState({
      weather: state => state.weatherModule.weather,
      newCity: state => state.weatherModule.newCity,
      isOpened: state => state.modalModule.isOpened,
      errorMsg: state => state.weatherModule.errorMsg,
      airPollution: state => state.weatherModule.airPollution
    }),
    weather: {
        get() {
            return this.$store.state.weatherModule.weather
        },
        set(value) {
            this.setWeather(value);
        }
    }
  },

  mounted() {
    this.fetchWeather();
  },
  components: { Place, Modal, Entry, SettingsIcon, CloseIcon, draggable }
}
</script>
<style lang="scss">
@import "@/assets/styles/mixins";

.widget {
  
  &__list {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    & > * {
      &:not(:first-child) {
        border-top: 1px solid var(--font-color-ghost);
      }
    }
  }

  &__settings-btn {
    position: fixed;
    right: 20px;
    top: 20px;
    background: none;
    border: 0;
    cursor: pointer;
    width: 32px;
    height: 32px
  }

  .add-city {
    width: 100%;

    &__title {
      @include small();
      margin: 0 0 10px;
    }

    &__error {
      color: red;
      margin: 0 0 5px;
    }

    &__form {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 5px;
    }

    &__input, &__btn {
      border: 1px solid var(--font-color);
      font-size: 16px;
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      padding: 8px 16px;
      flex-grow: 1;
      outline-width: 1px;

      &:focus {
        outline-color: var(--color-bg);
      }
    }

    &__input {
      min-width: 60px;
      -webkit-appearance: none;
    }

    &__btn {
      flex-shrink: 0;
      background: none;
      color: var(--font-color);

      &:not(:disabled) {
        cursor: pointer;
      }

      &:disabled {
        opacity: 0.5;
      }
    }
  }
}

.settings {
  background: var(--color-bg);

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__body {
    padding: 0 0 30px;
  }

  &__items {
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: var(--color-bg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: transform .3s cubic-bezier(0.455, 0.03, 0.515, 0.955), opacity .2s linear .1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>