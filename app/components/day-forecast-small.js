import Component from '@ember/component';

export default Component.extend({
  modalDialogService: Ember.inject.service('modal-dialog-service'),

  dayWeek: Ember.computed('model.date', function() {
    let options = {
        weekday: 'long'
      };
    let weekday = this.get('model.date').toLocaleString('ru', options);
    if (!weekday) return weekday;
    return weekday[0].toUpperCase() + weekday.slice(1);
  }),

  dateForShow: Ember.computed('model.date', function() {
    let options = {
        month: 'long',
        day: 'numeric'
      };
    return this.get('model.date').toLocaleString('ru', options);
  }),

  hasPrecipitation: Ember.computed('model.weatherEvent', function() {
    return this.get('model.weatherEvent') === 'Без осадков' ? true : false;
  }),

  weatherImage: Ember.computed('model.weatherEvent', 'model.cloudy', function() {
    let cloudy = this.get('model.cloudy');
    let weatherEvent = this.get('model.weatherEvent');
    let imgSource = undefined;
    switch(weatherEvent) {
      case 'Небольшой дождь':
      case 'Временами дождь':
      case 'Ливень':
        imgSource = 'images/weather/rain.png';
        break;
      case 'Гроза':
        imgSource = 'images/weather/storm.png';
        break;
      case 'Снег':
        imgSource = 'images/weather/snow.png';
        break;
      case 'Мокрый снег':
        imgSource = 'images/weather/sleet.png';
        break;
      default:
        imgSource = undefined;
    }
    if (imgSource === undefined) {
      switch(cloudy) {
        case 'Ясно':
          imgSource = 'images/weather/fair.png';
          break;
        case 'Малооблачно':
          imgSource = 'images/weather/little-cloudy.png';
          break;
        case 'Переменная облачность':
        case 'Облачно с прояснениями':
          imgSource = 'images/weather/partly-cloudy.png';
          break;
        case 'Пасмурно':
          imgSource = 'images/weather/mainly-cloudy.png';
          break;
        default:
          imgSource = 'images/weather/warning.png';
      }
    }
    return imgSource;
  }),

  click() {
    let currDay = this.get('model');
    this.get('modalDialogService').set('model', currDay);
    this.get('modalDialogService').showModalDialog();
  }
});
