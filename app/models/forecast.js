import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('date'),                // Дата
  temperature: DS.attr('number'),       // Температура воздуха в градусах цельсия
  cloudy: DS.attr(),                    // Облачность
  weatherEvent: DS.attr(),              // Погодные явления
  preasure: DS.attr('number'),          // Давление в мм ртутного столба
  windDirection: DS.attr('string'),     // Направление ветра
  windVelocity: DS.attr('number'),      // Скорость ветра
  windVelocityExtrem: DS.attr('number'),// Скорость ветра в порывах
});
