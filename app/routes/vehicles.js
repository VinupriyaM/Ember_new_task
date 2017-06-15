import Ember from 'ember';
// let vehiclelist=[];
let vehicles=[{
         "type": "car",
         "details": "give the path for below JSON",
         "icon": null
  }, {
         "type": "Bus",
         "details": null,
         "icon": null
  }, {
         "type": "Bike",
         "details": null,
         "icon": null

  }];

// vehiclelist=vehicles;
vehicles.sort(function(a,b){
  return a.type.toLowerCase() > b.type.toLowerCase();
});
export default Ember.Route.extend({
  model() {
    return vehicles;
  }
});
