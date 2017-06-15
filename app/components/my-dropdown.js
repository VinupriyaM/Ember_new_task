import Ember from 'ember';
let parentModel=[];
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


export default Ember.Component.extend({
  optionsvaluesone : ['Sort by sports car', 'Sort by normal car', 'Sort by manufacturer'],
  selectedOptionone : 'Please Select',
  actions: {
    changeoptionone(option) {
      this.set('selectedOptionone', option);
      console.log("answer",this.get('list'));
      parentModel=list;
    // if(option=="Sort by sports car"){
    //   console.log("sports car");
    //   list.forEach(function(obj){
    //     if(obj.isSportCarManufacturer){
    //       console.log("answer",this.get('model')[obj].isSportCarManufacturer);
    //       console.log("sport car manufacturer yes");
    //       list.sort(function(a,b){
    //         return a.manufacturer.toLowerCase() > b.manufacturer.toLowerCase();
    //       })
    //     }
    //   })
    // }
    if(option==="Sort by manufacturer"){
      console.log("manufacturer");
      parentModel.sort(function(a,b){
        return b.manufacturer > a.manufacturer;
      })
    }
      // this.calculateRoute();
      // this.updatePrice();
    }
  }
//   model(){
//   this.set("model",parentModel);
//   return model;
// }
});
