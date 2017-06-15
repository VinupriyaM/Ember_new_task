import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('my-dropdown-two', 'Integration | Component | my dropdown two', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{my-dropdown-two}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#my-dropdown-two}}
      template block text
    {{/my-dropdown-two}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
