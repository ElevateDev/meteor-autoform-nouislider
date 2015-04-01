/* global AutoForm, _, $, Template */

AutoForm.addInputType("noUiSlider", {
  template: "afNoUiSlider",
  valueOut: function(){
    var first = parseInt($(this).val()[0]);
    var second = parseInt($(this).val()[1]);
    var value = {
      lower: first > second ? second : first,
      upper: first > second ? first : second
    };
    return value;
  }
});

Template.afNoUiSlider.helpers({
  atts: function () {
    var template = Template.instance();
    return _.omit(_.omit(template.atts, 'noUiSliderOptions'),'noUiSlider_pipsOptions'); 
  }
});

Template.afNoUiSlider.rendered = function () {
  var template = this;
  var $s = template.$('.form-control');

  var start;
  if( this.data.value && this.data.value.lower ){
    start = [
      this.data.value.lower,
      this.data.value.upper
    ];
  }else{
    start = [
      this.data.min ? this.data.min : 0, 
      this.data.max ? this.data.max : 100
    ];
  }

  var range = {
    min: this.data.min ? this.data.min : 0, 
    max: this.data.max ? this.data.max : 100
  };

  var options = {};
  if( template.data.atts.noUiSliderOptions ){
    options = template.data.atts.noUiSliderOptions;
  }
  options = _.extend({
    start: start,
    range: range,
    connect: true
  },options);

  // default step to 1 if not otherwise defined
  if( !options.step ){
    options.step = 1;
  }

  $s.noUiSlider(options || {});
  template.$('.form-control').on({
    slide: function(){
      $(template.$('.form-control')).change();
    }
  });
  
  if( template.data.atts.noUiSlider_pipsOptions ){
    template.$('.form-control').noUiSlider_pips(
      template.data.atts.noUiSlider_pipsOptions
    );
  }
};

/*
 *  BOOTSTRAP THEME
 */

Template.afNoUiSlider.copyAs('afNoUiSlider_bootstrap3');
