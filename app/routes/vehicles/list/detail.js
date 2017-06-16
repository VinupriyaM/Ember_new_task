import Ember from 'ember';
let ferrari=[{
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
    }];
 let lotus= [{
        "name": "Lotus Daytona",
        "class": "Sport",
        "price": "50,00000"
      },
      {
        "name": "Lotus 275",
        "class": null,
        "price": "10,00000"
      },
      {
        "name": "Lotus F430",
        "class": "Roadster",
        "price": "20,00000"
      }]

export default Ember.Route.extend({
  model(params){
    let result;
    let parentModel=this.modelFor('vehicles.list');
    parentModel.forEach(function(obj){
      if(obj.manufacturer==params.detail_manufacturer){
        console.log("*****",params.detail_manufacturermanufaturer,obj.manufaturer);
        if(params.detail_manufacturer=="Ferrari"){
        result=ferrari;
        }
        if(params.detail_manufacturer=="Lotus"){
        result=lotus;
        }
      }
    })
    return result;
  }
});
