import Ember from 'ember';
let detail=[{
      "name": "Ferrari Daytona",
      "class": "Sport",
      "price": "50,00000"
    },
    {
      "name": "Ferrari 275",
      "class": null,
      "price": "10,00000"
    },
    {
      "name": "Ferrari F430",
      "class": "Roadster",
      "price": "20,00000"
    }]

export default Ember.Component.extend({
  optionsvaluestwo : ['Price Low','Price High'],
  selectedOptiontwo : 'Please Select',
  actions: {
    changeoptiontwo(option) {
      this.set('selectedOptiontwo', option);
      }
    }
});
