import Vue from "vue";
/*
 * V Mask
 */
// As a plugin
import VueMask from "v-mask";
Vue.use(VueMask);

// Or as a directive
import { VueMaskDirective } from "v-mask";
Vue.directive("mask", VueMaskDirective);
