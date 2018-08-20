import Route from '@ember/routing/route';
import forecastSystem from 'weather-forecast/utils/forecast-system'

export default Route.extend({
  model() {
      return forecastSystem(1, 30);
  }
});
