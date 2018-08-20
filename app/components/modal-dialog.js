import Component from '@ember/component';

export default Component.extend({
    modalDialogService: Ember.inject.service('modal-dialog-service'),

    isMeteorolog: false,

    dateForShow: Ember.computed('model', function() {
        let options = {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            weekday: 'long'
          };
        let date = this.model!==null ? this.get('model.date').toLocaleString('ru', options) : null;
        if (!date) return date;
        return date[0].toUpperCase() + date.slice(1);
    }),

    model: Ember.computed('modalDialogService.model', function() {
        let originModel = this.get('modalDialogService').model;        
        this.set('isMeteorolog', false);
        return originModel;
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

    actions: {
        saveChanges() {
            let currDay = this.get('model');
            this.get('modalDialogService').model = this.model;
        },

        cancelChanges() {
            return 2;
        }
    }
});
