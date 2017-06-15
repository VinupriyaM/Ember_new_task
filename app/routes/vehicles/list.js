import Ember from 'ember';
let list = [{
               "manufacturer": "Ferrari",
               "founded": "13/09/1939",
               "icon": null,
               "isSportCarManufacturer": true,
               "isNormalCarManufacturer": true,
               "review": "http://www.telegraph.co.uk/cars/ferrari/",
               "details": "refer the below Ferrari JSON"
        }, {
               "manufacturer": "Lotus",
               "founded": "1952",
               "icon": null,
               "isSportCarManufacturer": true,
               "isNormalCarManufacturer": true,
               "review": "http://www.telegraph.co.uk/cars/lotus/",
               "details": "create your own JSON"
        }, {
               "manufacturer": "Jaguar",
               "founded": "04/09/1922",
               "icon": null,
               "isSportCarManufacturer": false,
               "isNormalCarManufacturer": true,
               "review": "http://www.telegraph.co.uk/cars/jaguar/",
               "details": null
        }, {
               "manufacturer": "Ford",
               "founded": "16/08/1903",
               "icon": null,
               "isSportCarManufacturer": false,
               "isNormalCarManufacturer": true,
               "review": "http://www.telegraph.co.uk/cars/ford/",
               "details": null
        }, {
               "manufacturer": "Mercedes-Benz",
               "founded": "1962",
               "icon": null,
               "isSportCarManufacturer": true,
               "isNormalCarManufacturer": true,
               "review": "http://www.telegraph.co.uk/cars/mercedes-benz/",
               "details": null
        }]

export default Ember.Route.extend({
model() {
  return list;
}
});
