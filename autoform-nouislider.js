/* global AutoForm, _, Template */

import noUiSlider from 'nouislider'
import 'nouislider/src/nouislider.css'
import 'nouislider/src/nouislider.pips.css'
import 'nouislider/src/nouislider.tooltips.css'

AutoForm.addInputType('noUiSlider', {
  template: 'afNoUiSlider',
  valueOut: function () {
    const slider = this.find('.nouislider')[ 0 ]
    const isDecimal = this.closest('.at-nouislider').data('decimal')

    if (this.attr('data-type') === 'Object') {
      const parser = (isDecimal) ? parseFloat : parseInt
      const first = parser.call(null, slider.noUiSlider.get()[ 0 ])
      const second = parser.call(null, slider.noUiSlider.get()[ 1 ])
      const value = {
        lower: first > second ? second : first,
        upper: first > second ? first : second
      }
      return value
    } else {
      return slider.noUiSlider.get()
    }
  }
})

Template.afNoUiSlider.helpers({
  atts: function () {
    const data = Template.currentData() // get data reactively
    const atts = data.atts
    atts[ 'data-type' ] = data.schemaType.name
    if (atts[ 'class' ]) {
      atts[ 'class' ] += ' at-nouislider'
    } else {
      atts[ 'class' ] = 'at-nouislider'
    }

    atts.doLabels = (atts.labelLeft || atts.labelRight)

    atts[ 'data-decimal' ] = data.decimal

    return _.omit(atts, 'noUiSliderOptions', 'noUiSlider_pipsOptions')
  }
})

const calculateOptions = function (data) {
  const schemaMinMax = _.pick(data, 'max', 'min')
  const autoformOptions = _.pick(data.atts || {}, 'max', 'min', 'step', 'start', 'range')
  const noUiSliderOptions = (data.atts || {}).noUiSliderOptions

  const options = _.extend({}, schemaMinMax, autoformOptions, noUiSliderOptions)

  // Adjust data initialization based on schema type
  if (options.start === undefined) {
    if (data.schemaType.name === 'Object') {
      if (data.value && data.value.lower) {
        options.start = [
          data.value.lower,
          data.value.upper
        ]
      } else {
        options.start = [
          typeof data.min === 'number' ? data.min : 0,
          typeof data.max === 'number' ? data.max : 100
        ]
      }
      options.connect = true
    } else {
      options.start = data.value || 0
    }
  }

  if (options.range === undefined) {
    options.range = {
      min: typeof options.min === 'number' ? options.min : 0,
      max: typeof options.max === 'number' ? options.max : 100
    }
  }

  delete options.min
  delete options.max

  // default step to 1 if not otherwise defined
  if (options.step === undefined) {
    options.step = 1
  }

  return options
}

Template.afNoUiSlider.rendered = function () {
  const template = this
  const $s = template.$('.nouislider')

  const setup = function (c) {
    const data = Template.currentData() // get data reactively
    const options = calculateOptions(data)
    const sliderElem = $s[ 0 ]

    if (sliderElem.noUiSlider) {
      sliderElem.noUiSlider.updateOptions(options, true)
    } else {
      noUiSlider.create(sliderElem, options)
    }

    if (c.firstRun) {
      sliderElem.noUiSlider.on('slide', function () {
        // This is a trick to fool some logic in AutoForm that makes
        // sure values have actually changed on whichever element
        // emits a change event. Eventually AutoForm will give
        // input types the control of indicating exactly when
        // their value changes rather than relying on the change event
        $s.parent()[ 0 ].value = JSON.stringify(sliderElem.noUiSlider.get())
        $s.parent().change()
        $s.data('changed', 'true')
      })
    }

    if (data.atts.noUiSlider_pipsOptions) {
      sliderElem.noUiSlider.pips(
        data.atts.noUiSlider_pipsOptions
      )
    }
  }

  template.autorun(setup)
}
