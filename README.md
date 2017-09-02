muqube:autoform-nouislider
=========================

`meteor add muqube:autoform-nouislider`

## Configuration
Adds the `noUiSlider` type to [autoform](https://github.com/aldeed/meteor-autoform). It uses `min`, `max`, and `step` attributes like a normal slider, so it can be a drop in replacement, but options passed as `noUiSliderOptions` are passed directly to [nouislider](http://refreshless.com/nouislider/) for advanced control.

### Simple Usage

```
{{> afFieldInput type="noUiSlider" name="foo" min=5 max=10 step=1}}
```

### Single values
    CollectionSchema = new SimpleSchema({
      slider: {
        type: Number,
        max: 150,
        min: 30,
        autoform: {
          type: "noUiSlider",
          step: 10,    
          noUiSlider_pipsOptions: {
            mode: 'steps',
            density: 5
          }
        }
      }
    });


### Range Silder
    RangeSchema = new SimpleSchema({
      lower: {
        type: Number
      },
      upper: {
        type: Number
      }
    });

    CollectionSchema = new SimpleSchema({
      slider: {
        type: RangeSchema,
        max: 150,
        min: 30,
        autoform: {
          type: "noUiSlider",
          noUiSliderOptions: {
            step: 10
          },      
          noUiSlider_pipsOptions: {
            mode: 'steps',
            density: 5
          }
        }
      }
    });

### Vertical Slider

To get a vertical slider, do `noUiSliderOptions: {orientation: 'vertical'}` and specify an exact `height` in the CSS for the `nouislider` class.

### Overridding start and range
You can override start and range by passing the options in.  

Be sure that the values passed in match the format below.

    {{> afQuickField name='slider' start="[50,60]"}}
    {{> afQuickField name='singleSlider' range='{"min": 2,"max":50}'}}

### Labels
Show a label left and/or right of the slider
```
{{> afFieldInput type="noUiSlider" name="foo" labelLeft="ugly" labelRight="delicious" min=0 max=1 step=0.1}}
```

## History
This meteor package is a fork of [elevatedevdesign:autoform-nouislider](https://github.com/ElevateDev/meteor-autoform-nouislider). I forked it to make it compatible with meteor 1.3 and fix some bugs.


## Release Notes

### 0.3
- Bug fixed: start and range options set in schema definition was overwritten
- Removed dependency on wrapper package `rcy:nouislider`

### 0.4
- Bug fixed: "Slider was already initialized" error fixed
