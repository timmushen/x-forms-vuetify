import Vue from "vue";
import VueCurrencyFilter from "vue-currency-filter";
// or with custom config
Vue.use(VueCurrencyFilter, {
  symbol: "$",
  thousandsSeparator: ",",
  fractionCount: 2,
  fractionSeparator: ".",
  symbolPosition: "front",
  symbolSpacing: true
});
/*
 * Vue Currency
 */
// import VueCurrencyInput from "vue-currency-input";

// const pluginOptions = {
//   globalOptions: {
//     currency: null,
//     locale: "en",
//     allowNegative: true,
//     autoDecimalMode: false,
//     min: null,
//     max: null,
//     defaultValue: 0,
//   },
// };
// Vue.use(VueCurrencyInput, pluginOptions);
