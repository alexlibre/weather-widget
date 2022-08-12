import moment from "moment";

export const timeFormat = (timestamp, timeoffset) => {
  const t = moment.utc(timestamp * 1000 + timeoffset * 1000);
  return `${t.format('HH:mm')}`;
}

export const convertWindSpeed = (speed) => {
  const beaufortScale = [
    {
      title: "Calm",
      low: 0,
      high: 0
    },
    {
      title: "Light air",
      low: 0.5,
      high: 1.5
    },
    {
      title: "Light breeze",
      low: 2,
      high: 3
    },
    {
      title: "Gentle breeze",
      low: 3.5,
      high: 5
    },
    {
      title: "Moderate breeze",
      low: 5.5,
      high: 8
    },
    {
      title: "Fresh breeze",
      low: 8.5,
      high: 10.5
    },
    {
      title: "Strong breeze",
      low: 11,
      high: 13.5
    },
    {
      title: "Moderate gale",
      low: 14,
      high: 16.5
    },
    {
      title: "Fresh gale",
      low: 17,
      high: 20
    },
    {
      title: "Strong gale",
      low: 20.5,
      high: 23.5
    },
    {
      title: "Whole gale",
      low: 24,
      high: 27.5
    },
    {
      title: "Storm",
      low: 28,
      high: 31.5
    },
    {
      title: "Hurricane",
      low: 32,
      high: 100
    }
  ];
  const roundedSpeed = Math.round(speed * 2) / 2;

  return beaufortScale.find(val => val.high >= roundedSpeed && val.low <= roundedSpeed).title;
}

export const convertWindDirection = (deg) => {
  const directions = ["N", "NNE", "NE", "NEE", "E", "SEE", "SE", "SSE", "S", "SSW", "SW", "SWW", "W", "NWW", "NW", "NNW"];
  deg += 11.25;
  if (deg < 0)
    deg = 360 - Math.abs(deg) % 360;
  else
    deg = deg % 360;
  let w = parseInt(deg / 22.5);

  return `${directions[w]}`;
}

export const calcDewPoint = (deg, hum) => {
  if (deg < 0 || deg > 60 || hum < 1 || hum > 100) {
    return "—";
  }
  const a = 17.27, b = 237.7;
  const funcDewPoint = ((a * deg) / (b + deg)) + Math.log(hum / 100);
  const dewPoint = (b * funcDewPoint) / (a - funcDewPoint);
  if (dewPoint < 0 || dewPoint > 50) {
    return "—";
  }
  return dewPoint;
}

export const capitalizeFirst = (text) => {
  if (text.indexOf('.') !== -1) {
    return text.split('.').map(item => item[0].toUpperCase() + item.substring(1)).join();
  }

  return text[0].toUpperCase() + text.substring(1);
} 