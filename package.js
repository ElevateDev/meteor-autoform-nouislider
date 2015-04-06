Package.describe({
  name: 'elevatedevdesign:autoform-nouislider',
  summary: 'Dual value slider for autoform.',
  version: '0.0.2-rc.4',
  git: 'https://github.com/elevatedevdesign/meteor-autoform-nouislider.git'
});

Package.onUse(function(api) {
  api.use('templating@1.0.0');
  api.use('blaze@2.0.0');
  api.use('aldeed:template-extension@3.4.3');
  api.use('rcy:nouislider@7.0.7_2');
  api.use('aldeed:autoform@4.0.0 || 5.0.0');
  api.addFiles([
    'autoform-nouislider.html',
    'autoform-nouislider.js'
  ], 'client');
});
