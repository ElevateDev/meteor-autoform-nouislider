elevatedevdesign:autoform-nouislider
=========================

`meteor add elevatedevdesign:autoform-nouislider`

## Configuration
Adds the `noUiSlider` type to autoform.  Specifying options passed as `noUiSliderOptions` will be passed directly to [nouislider](http://refreshless.com/nouislider/).  Currently only support's a range, though I'll accept a pull request to allow single values.

### Single values
    CollectionSchema = new SimpleSchema({
      slider: {
        type: Number,
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

