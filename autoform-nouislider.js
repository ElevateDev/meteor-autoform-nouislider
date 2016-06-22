/* global AutoForm, _, Template */

AutoForm.addInputType("noUiSlider", {
  template: "afNoUiSlider",
  valueOut: function(){
    var slider = this.find('.nouislider');
    if( !slider.data('changed') ){ return; }

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
    var data = Template.currentData(); // get data reactively
    var atts = data.atts;
    atts["data-type"] = data.schemaType.name;
    if( atts["class"] ){
      atts["class"] += " at-nouislider";
    }else{
      atts["class"] = "at-nouislider";
    }

    atts.doLabels = ( atts.labelLeft || atts.labelRight );

    return _.omit(atts, 'noUiSliderOptions', 'noUiSlider_pipsOptions');
  }
});

var calculateOptions = function(data){
  var schemaMinMax = _.pick(data, 'max', 'min');
  var autoformOptions = _.pick(data.atts || {}, 'max', 'min', 'step', 'start', 'range');
  var noUiSliderOptions = (data.atts || {}).noUiSliderOptions;

  var options = _.extend({}, schemaMinMax, autoformOptions, noUiSliderOptions);

  // Adjust data initalization based on schema type
  if( options.start === undefined ){
    if( data.schemaType.name === "Object" ){
      if( data.value && data.value.lower ){
        options.start = [
          data.value.lower,
          data.value.upper
        ];
      }else{
        options.start = [
          typeof data.min === "number" ? data.min : 0,
          typeof data.max === "number" ? data.max : 100
        ];
      }
      options.connect = true;
    }else{
      options.start = data.value || 0;
    }
  } else {
    options.start = JSON.parse(options.start);
  }

  if( options.range === undefined ){
    options.range = {
      min: typeof options.min === "number" ? options.min : 0,
      max: typeof options.max === "number" ? options.max : 100
    };
  } else {
    options.range = JSON.parse(options.range);
  }
  delete options.min;
  delete options.max;

  // default step to 1 if not otherwise defined
  if( options.step === undefined ){
    options.step = 1;
  }

  return options;
};

Template.afNoUiSlider.rendered = function () {
  var template = this;
  var $s = template.$('.nouislider');

  var setup = function(c){
    var data = Template.currentData(); // get data reactively
    var options = calculateOptions( data );
    $s.noUiSlider(options, true);

    if (c.firstRun) {
      $s.on('slide', function(){
        // This is a trick to fool some logic in AutoForm that makes
        // sure values have actually changed on whichever element
        // emits a change event. Eventually AutoForm will give
        // input types the control of indicating exactly when
        // their value changes rather than relying on the change event
        $s.parent()[0].value = JSON.stringify($s.val());
        $s.parent().change();
        $s.data('changed','true');
      });
    }
    
    if( data.atts.noUiSlider_pipsOptions ){
      $s.noUiSlider_pips(
        data.atts.noUiSlider_pipsOptions
      );
    }
  };
  
  template.autorun( setup );
};
