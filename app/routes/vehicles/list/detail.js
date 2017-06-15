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
    // "Lotus": [
    //   {
    //     "name": "Lotus Daytona",
    //     "class": "Sport",
    //     "price": "50,00000"
    //   },
    //   {
    //     "name": "Lotus 275",
    //     "class": null,
    //     "price": "10,00000"
    //   },
    //   {
    //     "name": "Lotus F430",
    //     "class": "Roadster",
    //     "price": "20,00000"
    //   }]

export default Ember.Route.extend({
  model(){
    // return this.store.findAll('ferrari',1);
    return detail;
  }
});
