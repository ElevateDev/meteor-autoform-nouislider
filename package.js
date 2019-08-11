/* eslint-env meteor */
Package.describe({
  name: 'muqube:autoform-nouislider',
  summary: 'Dual value slider for autoform.',
  version: '0.4.1',
  git: 'https://github.com/ElevateDevelopmentAndDesign/meteor-autoform-nouislider'
})

Npm.depends({
  'nouislider': '14.0.2',
})

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.3')

  api.use('ecmascript')
  api.use('templating@1.0.0')
  api.use('blaze@2.0.0')
  api.use('aldeed:autoform@4.0.0 || 5.0.0 || 6.0.0')
  api.addFiles([
    'autoform-nouislider.html',
    'autoform-nouislider.js',
    'autoform-nouislider.css'
  ], 'client')
})
