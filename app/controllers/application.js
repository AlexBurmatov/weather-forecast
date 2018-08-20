import Controller from '@ember/controller';

export default Controller.extend({
    today: Ember.computed(function() {
        return new Date();
    }),

    currentDay: Ember.computed(function() {
        return {
            date: 'Среда, 15 августа 2018',
            temperature: '25',
            cloudy: 'Ясно',                    // Облачность
            weatherEvent: 'Без осадков',              // Погодные явления
            preasure: 750,          // Давление в мм ртутного столба
            windDirection: 'ЮЗ',     // Направление ветра
            windVelocity: 5,      // Скорость ветра
            windVelocityExtrem: 10,// Скорость ветра в порывах
    }
    })
});
