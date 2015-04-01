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
    return _.omit(template.atts, 'noUiSliderOptions');
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
  template.$('.form-control').Link('upper').to(template.$('.sliderValueUpper'), 'html');
  template.$('.form-control').Link('lower').to(template.$('.sliderValueLower'), 'html');
};

/*
 *  BOOTSTRAP THEME
 */

Template.afNoUiSlider.copyAs('afNoUiSlider_bootstrap3');

// The only difference is that we need to add "form-control" class
Template.afNoUiSlider_bootstrap3.helpers({
  atts: function addFormControlAtts() {
    var atts = _.omit(this.atts, 'noUiSliderOptions');
    // Add bootstrap class
    atts = AutoForm.Utility.addClass(atts, "form-control");
    return atts;
  }
});
