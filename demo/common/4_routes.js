Router.configure({
  notFoundTemplate: 'not_found',
  loadingTemplate: 'loading',
  layoutTemplate: 'layout'
});

Router.route('/', {
  name: 'home', 
  template: 'rangeSlider',
  waitOn: function(){
    return Meteor.subscribe("Collection");
  }
});
