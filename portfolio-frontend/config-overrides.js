const { override, addPostcssPlugins } = require('customize-cra');

module.exports = override(
  addPostcssPlugins([
    require('tailwindcss')({ config: './tailwind.config.js' }),
    require('autoprefixer')
  ])
);