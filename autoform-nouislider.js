/* global AutoForm, _, $, Template */

AutoForm.addInputType("noUiSlider", {
  template: "afNoUiSlider",
  valueOut: function(){
    var elem = $(this[0]);
    var slider = $(elem.find('.nouislider')[0]);
    if( this.attr("data-type") === "Object" ){
      var first = parseInt(slider.val()[0]);
      var second = parseInt(slider.val()[1]);
      var value = {
        lower: first > second ? second : first,
        upper: first > second ? first : second
      };
      return value;
    }else{
      return slider.val();
    }
  }
});

Template.afNoUiSlider.helpers({
  atts: function () {
    var data = Template.instance().data;
    var atts = data.atts;
    atts["data-type"] = data.schemaType.name;
    if( atts["class"] ){
      atts["class"] = atts["class"] + " at-nouislider";
    }else{
      atts["class"] = "at-nouislider";
    }
    return _.omit(_.omit(atts, 'noUiSliderOptions'),'noUiSlider_pipsOptions'); 
  }
});

Template.afNoUiSlider.rendered = function () {
  var template = this;
  var $s = template.$('.nouislider');
  var options = {};
  if( template.data.atts.noUiSliderOptions ){
    options = template.data.atts.noUiSliderOptions;
  }

  // Adjust data initalization based on schema type
  var start;
  if( this.data.schemaType.name === "Object" ){
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
    options.connect = true;
  }else{
    if( this.data.value ){
      start = this.data.value;
    }else{
      start = 0;
    }
  }
  options.start = start;

  var range = {
    min: this.data.min ? this.data.min : 0, 
    max: this.data.max ? this.data.max : 100
  };

  options.range = range;

  // default step to 1 if not otherwise defined
  if( !options.step ){
    options.step = 1;
  }

  $s.noUiSlider(options || {});
  /*template.$('.form-control').on({
    slide: function(){
      template.$('.form-control').change();
    }
  });*/
  
  if( template.data.atts.noUiSlider_pipsOptions ){
    $s.noUiSlider_pips(
      template.data.atts.noUiSlider_pipsOptions
    );
  }
};

/*
 *  BOOTSTRAP THEME
 */

Template.afNoUiSlider.copyAs('afNoUiSlider_bootstrap3');
