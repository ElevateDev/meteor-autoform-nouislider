Package.describe({
  name: 'elevatedevdesign:autoform-nouislider',
  summary: 'Dual value slider for autoform.',
  version: '0.1.2',
  git: 'https://github.com/ElevateDevelopmentAndDesign/meteor-autoform-nouislider'
});

Package.onUse(function(api) {
  api.use('templating@1.0.0');
  api.use('blaze@2.0.0');
  api.use('aldeed:template-extension@3.4.3 || 4.0.0');
  api.use('rcy:nouislider@7.0.7_2');
  api.use('aldeed:autoform@4.0.0 || 5.0.0');
  api.addFiles([
    'autoform-nouislider.html',
    'autoform-nouislider.js',
    'autoform-nouislider.css'
  ], 'client');
});
