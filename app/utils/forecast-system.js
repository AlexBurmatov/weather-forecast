// Погодные явления
let weatherEvents = [
  { name: 'Без осадков',      winter: 0.40, spring: 0.40, summer: 0.45, autumn: 0.40 },
  { name: 'Небольшой дождь',  winter: 0.07, spring: 0.02, summer: 0.15, autumn: 0.10 },
  { name: 'Временами дождь',  winter: 0.02, spring: 0.02, summer: 0.13, autumn: 0.20 },
  { name: 'Ливень',           winter: 0.01, spring: 0.01, summer: 0.05, autumn: 0.05 },
  { name: 'Гроза',            winter: 0.05, spring: 0.05, summer: 0.10, autumn: 0.10 },
  { name: 'Град',             winter: 0.05, spring: 0.02, summer: 0.05, autumn: 0.02 },
  { name: 'Снег',             winter: 0.30, spring: 0.18, summer: 0.01, autumn: 0.05 },
  { name: 'Мокрый снег',      winter: 0.05, spring: 0.25, summer: 0.01, autumn: 0.03 },
  { name: 'Туман',            winter: 0.05, spring: 0.05, summer: 0.05, autumn: 0.05 }
]

// Облачность
let cloudy = [
  'Ясно',
  'Малооблачно',
  'Переменная облачность',
  'Облачно с прояснениями',
  'Пасмурно'
]

// Направления ветра
let windDirection = [
  'Ю',
  'ЮЗ',
  'ЮВ',
  'С',
  'СЗ',
  'СВ',
  'З',
  'В'
]

let tempIntervals = [
  { min: -50, max: -40, winter: 0.10, spring: 0.02, summer: 0.01, autumn: 0.01 },
  { min: -40, max: -30, winter: 0.15, spring: 0.03, summer: 0.01, autumn: 0.01 },
  { min: -30, max: -20, winter: 0.30, spring: 0.10, summer: 0.01, autumn: 0.05 },
  { min: -20, max: -10, winter: 0.20, spring: 0.15, summer: 0.01, autumn: 0.10 },
  { min: -10, max: 0, winter: 0.15, spring: 0.25, summer: 0.01, autumn: 0.10 },
  { min:  0, max: 10, winter: 0.05, spring: 0.30, summer: 0.10, autumn: 0.30 },
  { min: 10, max: 20, winter: 0.01, spring: 0.10, summer: 0.30, autumn: 0.25 },
  { min: 20, max: 30, winter: 0.01, spring: 0.30, summer: 0.30, autumn: 0.15 },
  { min: 30, max: 40, winter: 0.01, spring: 0.01, summer: 0.20, autumn: 0.02 },
  { min: 40, max: 50, winter: 0.01, spring: 0.01, summer: 0.10, autumn: 0.01 }
]

function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
}

class Forecast {
  constructor(date, previousDay) {
    this.date =new Date(date);
    this.season =this.determineSeason();
    this.tempPrevious = previousDay===null ? undefined : previousDay.temperature;
    this.temperature =undefined;
    this.cloudy =undefined;
    this.weatherEvent = weatherEvents[0];
    this.preasure =undefined;
    this.windDirection =undefined;
    this.windVelocity =undefined;
    this.windVelocityExtrem =undefined;
  }

  determineSeason() {
    let month = this.date.getMonth();
    return month<0 ? undefined :
      month<2 ? 'winter' :
      month<5 ? 'spring' :
      month<8 ? 'summer' :
      month<11 ? 'autumn' :
      month==11 ? 'winter' : undefined;
  }

  generate() {
    do {
      this.temperature = this.genTemperature();
    } while(this.tempPrevious!==undefined&&Math.abs(this.temperature - this.tempPrevious)>20);
    this.weatherEvent = this.genEvents();
    this.cloudy = cloudy[randomInteger(0,cloudy.length-1)];
    this.windDirection = windDirection[randomInteger(0,windDirection.length-1)];
    this.preasure = randomInteger(700,800);
    this.windVelocity = randomInteger(1,20);
    this.windVelocityExtrem = randomInteger(10,30);
  }

  genTemperature() {
    let rnd = Math.random();
    let left = 0;
    let right = 0;
    for (let i = 0; i < tempIntervals.length; i++) {
      right = left + tempIntervals[i][this.season];
      if (left <= rnd && rnd < right) {
        return randomInteger(tempIntervals[i].min, tempIntervals[i].max);
      }
      left = right;
    }
  }

  genEvents() {
    let rnd = Math.random();
    let left = 0;
    let right = 0;
    for (let i = 0; i < weatherEvents.length; i++) {
      right = left + weatherEvents[i][this.season];
      if (left <= rnd && rnd < right) {
        return weatherEvents[i].name;
      }
      left = right;
    }
  }
}

export default function forecastSystem(terrId, countDay) {
  let list = [];
  let previousDay = null;
  let date = new Date();
  for (let i = 0; i < countDay; i++) {
    let forecast = new Forecast(date, previousDay);
    previousDay = forecast;
    forecast.generate();
    list.push(forecast);
    date.setDate(date.getDate() + 1);
  }

  return list;
}
