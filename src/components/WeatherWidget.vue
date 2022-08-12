<template>
  <div>
    <div class="widget">
      <button class="widget__settings-btn" @click="openModal"><SettingsIcon/></button>
      <transition name="fade">
        <Modal v-if="isOpened" @closeModal="closeModal" class="settings">
          <div slot="header" class="settings__header">
            <h2>Settings</h2>
            <button class="modal__close-btn" @click="closeModal"><CloseIcon/></button>
          </div>
          <div v-if="weather.length" slot="body" class="settings__body">
            <draggable v-model='weather' class="settings__items">
              <Entry v-for="entry in weather" :key="entry.id" :entryData="entry" @removeEntry="removeWeatherItem" />
            </draggable>
          </div>
          <div slot="footer" class="add-city">
            <h5 class="add-city__title">Add location</h5>
            <form class="add-city__form" @submit.prevent>
              <input type="text" class="add-city__input" placeholder="e.g. London" v-bind:value="newCity" @input="inputNewCity">
              <button @click="addCity" class="add-city__btn" :disabled="newCity.length < 3">Add</button>
            </form>
          </div>
        </Modal>
      </transition>
      <div class="widget__list" v-if="weather.length">
        <Place v-for="weatherItem in weather" :key="weatherItem.id" :weatherData="weatherItem" />
      </div>
      <h3 class="widget__empty" v-else>No cities added</h3>
    </div>
  </div>
</template>
<script>
import Place from "./Place/Place.vue";
import Modal from "./Modal/Modal.vue";
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
      this.setNewCity(event.target.value);
    }
  },
  computed: {
    ...mapState({
      weather: state => state.weatherModule.weather,
      newCity: state => state.weatherModule.newCity,
      isOpened: state => state.modalModule.isOpened
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
.widget {
  overflow: hidden;
  padding: 30px;
  max-width: 360px;
  margin: 20px auto;
  position: relative;
  background-color: rgb(246, 246, 246);
  min-height: 500px;

  &__empty {
    padding: 16px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__settings-btn {
    position: absolute;
    right: 45px;
    top: 38px;
    background: none;
    border: 0;
    cursor: pointer;
    width: 32px;
    height: 32px
  }

  .add-city {
    width: 100%;

    &__title {
      margin: 0 0 10px;
    }

    &__form {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 5px;
    }

    &__input, &__btn {
      border: 1px solid #eee;
      background: white;
      font-size: 16px;
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      padding: 8px 16px;
      flex-grow: 1;
      outline-width: 1px;
    }

    &__input {
      min-width: 60px;
      -webkit-appearance: none;
    }

    &__btn {
      flex-shrink: 0;

      &:not(:disabled) {
        cursor: pointer;

        &:hover {
          background-color: rgb(194, 252, 196);
          color: rgb(46, 93, 48);
        }
      }
    }
  }
}

.settings {
    background-color: rgb(246, 246, 246);

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
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .16s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>