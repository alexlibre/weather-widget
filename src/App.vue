<template>
  <div id="app">
    <main class="grid">
      <div class="grid__item grid__item_weather">
        <div class="outside">
          <WeatherWidget/>
        </div>
        <!-- <div class="inside">
          <div class="place">
            <div class="place__row">
              <h1 class="place__temp">22°</h1>
              <div class="place__conditions">
                <div class="place__condition">
                  <div class="place__condition-icon">
                    <DropIcon/>
                  </div>
                  <p class="place__condition-value">32%</p>
                </div>
              </div>
            </div>
          </div>
        </div> -->
      </div>
      
      <div class="grid__item grid__item_time">
        <div class="time">
          <TimeModule/>
        </div>
      </div>
      <div class="grid__item grid__item_news">
        <NewsModule/>
      </div>
      
    </main>
  </div>
</template>

<script>
import WeatherWidget from "./components/WeatherWidget.vue";
import NewsModule from "./components/News/NewsModule.vue";
import TimeModule from "./components/TimeWidget.vue";
import DropIcon from "@/assets/drop.svg";

export default {
  name: 'App',
  components: {
    WeatherWidget, DropIcon, NewsModule, TimeModule
  }
}
</script>

<style lang="scss">
@import "./assets/styles/main.scss";

#app {
  font-family: 'Lato', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: var(--color-bg);
  height: 100%;
  overflow: hidden;
  padding: 0 3.75rem;
}

.grid {
  padding: 2.5rem;
  height: 100%;
  // box-shadow: inset 0 0 0 1px var(--font-color-ghost);
  display: grid;
  grid-gap: rem;
  grid-template-columns: 1fr auto;
  grid-template-areas: 'weather time' 'news news';

  &__item {
    // box-shadow: inset 0 0 0 1px var(--font-color-ghost);
    color: var(--font-color);

    &_weather {
      grid-area: weather;
      display: flex;
      gap: 4rem;
    }

    &_time {
      grid-area: time;
    }
    &_news {
      grid-area: news;
    }
  }
}

.outside {
  max-width: 44rem;
  width: 100%;
  max-height: 26.2rem;
  overflow-y: auto;
  padding-right: 1rem;
}

.inside {
  width: 24.125rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

h1 {
  @include h1();
}

h2 {
  @include h2();
}

@media screen and (orientation: portrait) {
  .grid {
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 'time time' 'weather weather' 'news news';

    & .outside {
      max-width: 100%;
    }
  }
} 
</style>
