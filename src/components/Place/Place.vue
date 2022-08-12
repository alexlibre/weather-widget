<template>
  <div class="place">
    <h4 class="place__location">{{ location }}</h4>
    <p class="place__local-time">Local time: {{currentTime}}</p>
    <h2 class="place__temp">
      <img :src="link" alt="">{{ temp }}°C</h2>
    <p class="place__conditions">Feels like {{ feelLike }}°C. {{ conditions }}. {{ windDescription }}.</p>
    <p class="place__wind">
      <span class="place__wind-direction"><DirectionIcon :style="windRotate"/></span> {{wind}}</p>
    <p class="place__pressure">{{pressure}}</p>
    <p class="place__humidity">Humidity: {{ humidity }}%</p>
    <p class="place__dew">Dew point: {{ dewPoint }}°C</p>
    <p class="place__visibility">Visibility: {{ visibility }}km</p>
    <div class="place__sun">
      <div class="place__sun-item">
        <Sunrise class="place__sun-icon"/>
        <p class="place__sun-time">{{ sunrise }}</p>
      </div>
      <div class="place__sun-item">
        <Sunset class="place__sun-icon"/>
        <p class="place__sun-time">{{ sunset }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {timeFormat, convertWindSpeed, convertWindDirection, calcDewPoint, capitalizeFirst} from '@/utils';
import Sunrise from '@/assets/sunrise.svg';
import Sunset from '@/assets/sunset.svg';
import DirectionIcon from '@/assets/direction.svg';

export default {
  props: {
    weatherData: Object,
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
    },
    temp() {
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
      return { transform: 'rotate(' + this.weatherData.wind.deg + 'deg)'}
    },
    wind() {
      return `${this.weatherData.wind.speed.toFixed(1)}m/s ${convertWindDirection(this.weatherData.wind.deg)}`;
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
    }
  },
  components: {
    Sunrise, Sunset, DirectionIcon
  }
}
</script>
<style lang="scss">
.place {
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas: "location location""localTime localTime""temp temp""conditions conditions""wind pressure""humidity dew""visibility visibility""sun sun";
  gap: 14px;
  box-shadow: 0 0 6px rgba(40, 40, 40, .16);
  background-color: white;
  border-radius: 5px;
  align-items: center;
  font-size: 14px;
  &__location {
    grid-area: location;
  }

  &__local-time {
    grid-area: localTime;
  }

  &__temp {
    grid-area: temp;
    display: flex;
    align-items: center;
  }

  &__conditions {
    grid-area: conditions;
  }

  &__wind {
    grid-area: wind;
    display: flex;
    align-items: center;
  }
  
  &__wind-direction {
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-right: 5px;

    & svg {
      transform-origin: center;
      width: 100%;
      height: 100%;
    }
  }

  &__pressure {
    grid-area: pressure;
  }

  &__humidity {
    grid-area: humidity;
  }

  &__dew {
    grid-area: dew;
  }

  &__visibility {
    grid-area: visibility;
  }

  &__sun {
    grid-area: sun;
    display: flex;
    justify-content: space-between;
    padding: 20px 0 0;

    &-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    &-icon {
      width: 82px;
      height: auto;
      display: block;
    }
  }
}
</style>