import { resolve, join } from 'path'
import path from 'path'
export default function (moduleOptions) {
  // Options Merge
  // get all options for the module depending on how its set up in nuxt
  const options = {
    ...moduleOptions,
    ...this.options.XFormsVuetify
  }

  // Register Components
  this.nuxt.hook('components:dirs', (dirs) => {
    // Add ./components dir to the list
    dirs.push({
      path: join(__dirname, 'components'),
      prefix: 'x'
    })
  })

  // Register `plugin.js` template
  this.addPlugin(path.resolve(__dirname, 'plugins/vee-validate.js'))
  this.addPlugin(path.resolve(__dirname, 'plugins/v-mask.js'))
  this.addPlugin(path.resolve(__dirname, 'plugins/vue-currency-input.js'))

  // Forms test
  // this.extendRoutes(routes => {
  //   routes.push({
  //     path: "/privacy",
  //     component: resolve(__dirname, "pages/privacy.vue")
  //   });
  // });


}
module.exports.meta = require('./package.json')