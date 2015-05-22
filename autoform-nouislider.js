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


var calculateOptions = function(template){
  var autoformOptions;
  if( template.data && template.data.atts){
    autoformOptions = template.data.atts;
  }
  
  var options = {};
  if( template.data.atts.noUiSliderOptions ){
    options = template.data.atts.noUiSliderOptions;
  }

  // Adjust data initalization based on schema type
  if( options.start === undefined ){
    if( autoformOptions && autoformOptions.start ){
      options.start = JSON.parse(autoformOptions.start);
    }else{
      var start;
      if( template.data.schemaType.name === "Object" ){
        if( template.data.value && template.data.value.lower ){
          start = [
            template.data.value.lower,
            template.data.value.upper
          ];
        }else{
          start = [
            template.data.min ? template.data.min : 0, 
            template.data.max ? template.data.max : 100
          ];
        }
        options.connect = true;
      }else{
        if( template.data.value ){
          start = template.data.value;
        }else{
          start = 0;
        }
      }
      options.start = start;
    }
  }

  if( options.range === undefined ){
    if( autoformOptions && autoformOptions.range ){
      options.range = JSON.parse(autoformOptions.range);
    }else{
      var range = {
        min: template.data.min ? template.data.min : 0, 
        max: template.data.max ? template.data.max : 100
      };

      options.range = range;
    }
  }

  // default step to 1 if not otherwise defined
  if( !options.step ){
    options.step = 1;
  }
  return options;
};


Template.afNoUiSlider.rendered = function () {
  var template = this;
  var $s = template.$('.nouislider');
  template.autorun(function(){
    var options = calculateOptions( template );
    $s.noUiSlider(options);
    $s.on({
      slide: function(){
        $s.parent().change();
      }
    });
    
    if( template.data.atts.noUiSlider_pipsOptions ){
      $s.noUiSlider_pips(
        template.data.atts.noUiSlider_pipsOptions
      );
    }
  });
};

/*
 *  BOOTSTRAP THEME
 */

Template.afNoUiSlider.copyAs('afNoUiSlider_bootstrap3');
