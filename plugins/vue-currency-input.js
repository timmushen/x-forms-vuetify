import Vue from "vue";

/*
 * Vue Currency
 */
import VueCurrencyInput from "vue-currency-input";

const pluginOptions = {
  /* see config reference */
  globalOptions: {
    currency: null,
    locale: "en",
    allowNegative: true,
    autoDecimalMode: false,
    min: null,
    max: null,
    defaultValue: 0,
  },
};
Vue.use(VueCurrencyInput, pluginOptions);
