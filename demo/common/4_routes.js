Router.configure({
  notFoundTemplate: 'not_found',
  loadingTemplate: 'loading',
  layoutTemplate: 'layout'
});

Router.route('/', {
  name: 'root', 
  template: 'rangeSlider',
  waitOn: function(){
    return Meteor.subscribe("Collection");
  }
});

Router.route('home');
