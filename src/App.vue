<template>
  <div id="app">
    <main class="grid">
      <div class="grid__item grid__item_weather">
        <div class="outside">
          <WeatherWidget />
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
          <TimeModule />
        </div>
      </div>
      <!-- <div class="grid__item grid__item_news">
        <NewsModule/>
      </div> -->

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
  },
  mounted() {
    const appendRule = (sheet) => {
      const len = sheet.cssRules.length;
      sheet.insertRule('*{}', len);
      return sheet.cssRules[len];
    }

    const ruleForScroll = appendRule(document.styleSheets[0]);
    ruleForScroll.selectorText = '::-webkit-scrollbar-thumb';
    ruleForScroll.style["background"] = `rgba(128,128,128,.4)`;
    ruleForScroll.style["transition"] = `background .2s ease`;

    let timer = 0;
    document.querySelector('.outside').addEventListener('scroll', function wheelStyle() {
    clearTimeout(timer)
      ruleForScroll.selectorText = '::-webkit-scrollbar-thumb';
      ruleForScroll.style["background"] = `white`;
      timer = setTimeout(() => {
        ruleForScroll.selectorText = '::-webkit-scrollbar-thumb';
        ruleForScroll.style["background"] = `rgba(128,128,128,.4)`;
      }, 300)

    })
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
  grid-template-areas: 'weather time';

  &__item {
    // box-shadow: inset 0 0 0 1px var(--font-color-ghost);
    color: var(--font-color);

    &_weather {
      grid-area: weather;
      display: flex;
      gap: 4rem;
      position: relative;


  &:after {
    content: '';
    display: block;
    bottom: 0;
    position: absolute;
    left: 0;
    right: 0;
    height: 4rem;
    background: linear-gradient(transparent, #000);
  }
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
  max-height: calc(100vh - 5rem);
  overflow-y: auto;
  padding-right: 1rem;
  padding-bottom: 4rem;
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
  #app {
    padding: 0;
  }
  
  .grid {
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 'time time' 'weather weather';

    & .outside {
      max-width: 100%;
      overflow-y: auto;
      max-height: calc(100vh - 15.9375rem); 
    }
  }
}
</style>
