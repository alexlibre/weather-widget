<template>
  <div class="place">
    <div class="place__row">
      <h1 class="place__temp">{{ temp }}°</h1>
      <div class="place__conditions">
        <div class="place__condition">
          <div class="place__condition-icon">
            <DropIcon/>
          </div>
          <p class="place__condition-value">{{ humidity }}%</p>
        </div>
        <div class="place__condition">
          <div class="place__condition-icon">
            <img :src="link" alt="">
          </div>
          <p class="place__condition-value">{{ conditions }}</p>
        </div>
        <div class="place__condition">
          <div class="place__condition-icon">
            <ArrowIcon :style="windRotate"/>
          </div> 
          <p class="place__condition-value">{{wind}}</p>
        </div>
      </div>
    </div>
    <div class="place__row place__row_center">
      <h3 class="place__location">{{ location }}</h3>
      <div class="place__sun">
        <div class="place__sun-item">
          <p class="place__sun-title">Восход</p>
          <p class="place__sun-time">{{ sunrise }}</p>
        </div>
        <div class="place__sun-item">
          <p class="place__sun-title">Закат</p>
          <p class="place__sun-time">{{ sunset }}</p>
        </div>
      </div>
    </div>
    
    <!-- <p class="place__local-time">Local time: {{currentTime}}</p> -->
    <!-- <p class="place__conditions">Feels like {{ feelLike }}°. {{ conditions }}. {{ windDescription }}.</p> -->
    <!-- <p class="place__pressure">{{pressure}}</p> -->
    <!-- <p class="place__condition-value">{{ dewPoint }}°C</p> -->
    <!-- <p class="place__visibility">Visibility: {{ visibility }}km</p> -->
    
    <div class="place__row">
      <div class="place__percentages">
        <div class="place__percentage" v-for="(percent,idx) in airPollutionPercentages">
          <p>{{ percent.component }}</p>
          <p>{{ airPollutionCurrent.find(item => item[0] === percent.component)[1] }}</p>
          <div>
            <div :style="`width: calc(${percent.percentage}%`"></div>
          </div>
          <p>{{ percent.percentage.toFixed(1) }}%</p>
        </div>
      </div>
    </div>

    <!-- <div class="place__upd">
      <p class="place__refresh">Обновление погоды: {{refreshedAt}}</p>
      <p class="place__refresh">Обновление качества воздуха: {{refreshedPolutionAt}}</p>
    </div> -->
  </div>
</template>

<script>
import moment from 'moment';
import {timeFormat, convertWindSpeed, convertWindDirection, calcDewPoint, capitalizeFirst} from '@/utils';
import DirectionIcon from '@/assets/direction.svg';
import DropIcon from '@/assets/drop.svg';
import ArrowIcon from '@/assets/arrow.svg';

export default {
  props: {
    weatherData: Object,
    airPollution: Object
  },
  computed: {
    link() {
      return `http://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}@2x.png`;
    },
    currentTime() {
      return timeFormat(Date.now() / 1000, this.weatherData.timezone);
    },
    location() {
      return `${this.weatherData.name}, ${this.weatherData.sys.country}`;
    },temp() {
      return Math.round(this.weatherData.main.temp);
    },
    feelLike() {
      return Math.round(this.weatherData.main.feels_like);
    },
    conditions() {
      const description = this.weatherData.weather[0].description;
      return capitalizeFirst(description);
    },
    windRotate() {
      return { transform: `rotate(${this.weatherData.wind.deg}deg)`}
    },
    wind() {
      return `${convertWindDirection(this.weatherData.wind.deg)} — ${this.weatherData.wind.speed.toFixed(1)} м/с`;
    },
    windDescription() {
      return convertWindSpeed(this.weatherData.wind.speed);
    },
    pressure() {
      return `${this.weatherData.main.pressure}hPa`;
    },
    humidity() {
      return this.weatherData.main.humidity;
    },
    dewPoint() {
      return Math.round(calcDewPoint(this.weatherData.main.temp, this.humidity));
    },
    visibility() {
      return (this.weatherData.visibility / 1000).toFixed(1);
    },
    sunrise() {
      return timeFormat(this.weatherData.sys.sunrise, this.weatherData.timezone);
    },
    sunset() {
     return timeFormat(this.weatherData.sys.sunset, this.weatherData.timezone);
    },
    refreshedAt() {
      return moment.unix(this.weatherData.dt).format("HH:mm:ss");
    },
    refreshedPolutionAt() {
      return moment.unix(this.weatherData.list[0].dt).format("HH:mm:ss");
    },
    airPollutionCurrent() {
      return Object.entries(this.weatherData.list[0].components).map(item => {
        item[0] = item[0].toUpperCase()
        return item;
      });
    },
    airPollutionPercentages() {
      const refs = [{
        component: 'so2',
        max: 350
      }, {
        component: 'no2',
        max: 200
      }, {
        component: 'pm10',
        max: 200
      }, {
        component: 'pm2_5',
        max: 75
      }, {
        component: 'o3',
        max: 180
      }, {
        component: 'co',
        max: 15400
      }, {
        component: 'nh3',
        max: 200
      }, {
        component: 'no',
        max: 100
      }]

      return this.airPollutionCurrent.map(item => {
        const max = refs.filter(entry => entry.component.toUpperCase() === item[0])[0].max;
        item = {
          component: item[0],
          percentage: item[1] / max * 100
        }
        return item
      })
    }
  },
  components: {
    ArrowIcon, DropIcon
  },
  mounted() {
    console.warn('Обновление погоды: ',this.location, this.refreshedAt)
    console.warn('Обновление качества воздуха: ',this.location, this.refreshedPolutionAt)
  }
}
</script>
<style lang="scss">
@import "@/assets/styles/mixins";

.place {
  display: flex;
  flex-direction: column;
  
  &__row {
    display: flex;
    align-items: start;
    gap: 1.5rem;
    justify-content: space-between;
    
    &:not(:first-child) {
      margin-top: .5rem;
    }

    &_center {
      align-items: center;
      margin-top: 0;
    }
  }

  &__conditions {
    margin-left: auto;
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding-top: 2rem;
  }

  &__condition {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .625rem;
    width: 8rem;

    &-icon {
      display: flex;
      width: 4.5rem;
      height: 4.5rem;
      align-items: center;
      justify-content: center;

      & svg {
        transform-origin: center;
        max-height: 75%;
      }

      & img {
        width: 100%;
        height: 100%;
        filter: saturate(0);
      }
    }

    &-value {
      @include small();
      text-align: center;
      line-height: 1.2;
      // white-space: nowrap;
      max-width: 8rem;
    }
  }


  &__dew {
    grid-area: dew;
  }

  &__visibility {
    grid-area: visibility;
  }
 
  &__dew {
    grid-area: dew;
  }

  &__visibility {
    grid-area: visibility;
  }

  &__sun {
    @include small();
    display: flex;
    align-items: center;
    padding: 1rem 0;
    gap: 1rem;
    
    &-item {
      display: flex;
      gap: .5rem;
    }
    
    &-title {
      color: var(--font-color-ghost);
    }
    
    &-time {
      @include strong();
    }
  }
  &__percentages {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: .1rem;
  }

  &__percentage {
    display: flex;
    align-items: center;
    gap: 1rem;

    & p {
      flex-shrink: 0;
      width: 4rem;
      font-size: 1rem;

      &:last-child {
        text-align: right;
      }
    }

    &>div {
      flex: 1;
      height: 1rem;
      border-left: 1px solid var(--font-color-ghost);
      border-right: 1px solid var(--font-color-ghost);
      padding: 0 0.5rem;

      &>div {
        height: 100%;
        background-color: var(--font-color);
        width: 0;
        transition: width .2s ease;
      }
    }
  }

  &__upd {
    margin-top: 1rem;
  }

  &__refresh {
    @include small();
    font-size: 0.75rem;
  }

  &__location {
    @include text();
    font-weight: 900;
  }
}
</style>