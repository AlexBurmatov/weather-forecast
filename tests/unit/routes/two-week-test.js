import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | two-week', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:two-week');
    assert.ok(route);
  });
});
