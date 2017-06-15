import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('vehicles',function(){
    this.route('list',{path:'/:list_type'},function(){
      this.route('detail',{path:'/:detail_manufacturer'});
    });
  });
});

export default Router;
