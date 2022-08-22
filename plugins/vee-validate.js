import Vue from "vue";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import {
  required,
  alpha,
  alpha_dash,
  email,
  max,
  min,
  numeric,
  digits,
  min_value,
  max_value,
} from "vee-validate/dist/rules";

const dateValidate = (value) => {
  let tmpValArr = value.split("-");
  if (tmpValArr[0] && tmpValArr[1] && tmpValArr[2]) {
    if (parseInt(tmpValArr[0]) > 12 || parseInt(tmpValArr[0]) < 1) {
      return true;
    }
    if (parseInt(tmpValArr[1]) > 31 || parseInt(tmpValArr[1]) < 1) {
      return true;
    }
    // check 1900< year <3000
    if (parseInt(tmpValArr[2]) > 3000 || parseInt(tmpValArr[2]) < 1900) {
      return true;
    } else {
      if (parseInt(tmpValArr[0]) < 10) {
        if (tmpValArr[0].charAt(0) !== "0") {
          return true;
        }
      }
      if (parseInt(tmpValArr[1]) < 10) {
        if (tmpValArr[1].charAt(0) !== "0") {
          return true;
        }
      }
      // if month = 2 check day <= 29
      if (parseInt(tmpValArr[0]) === 2 && parseInt(tmpValArr[1]) > 29) {
        return true;
      }
    }
  } else {
    return true;
  }
  return false;
};

const dobDateValidate = (value) => {
  let tmpValArr = value.split("/");
  if (tmpValArr[0] && tmpValArr[1] && tmpValArr[2]) {
    if (parseInt(tmpValArr[0]) > 12 || parseInt(tmpValArr[0]) < 1) {
      return true;
    }
    if (parseInt(tmpValArr[1]) > 31 || parseInt(tmpValArr[1]) < 1) {
      return true;
    }
    // check 1900< year <3000
    if (parseInt(tmpValArr[2]) > 3000 || parseInt(tmpValArr[2]) < 1900) {
      return true;
    } else {
      if (parseInt(tmpValArr[0]) < 10) {
        if (tmpValArr[0].charAt(0) !== "0") {
          return true;
        }
      }
      if (parseInt(tmpValArr[1]) < 10) {
        if (tmpValArr[1].charAt(0) !== "0") {
          return true;
        }
      }
      // if month = 2 check day <= 29
      if (parseInt(tmpValArr[0]) === 2 && parseInt(tmpValArr[1]) > 29) {
        return true;
      }
    }
  } else {
    return true;
  }
  return false;
};

setInteractionMode("lazy");

extend("required", {
  ...required,
  message: "{_field_} field is required",
});

extend("alpha", {
  ...alpha,
  message: "This field must only contain alphabetic characters",
});

extend("max", {
  ...max,
  message: "This field must be {length} characters or less",
});

extend("min", {
  ...min,
  message: "This field must be {length} characters or more",
});

extend("email", {
  ...email,
  message: "This field must be a valid email",
});

extend("alpha_dash", {
  ...alpha_dash,
  message: "Must contain either numbers or dashes",
});

extend("numeric", {
  ...numeric,
  message: "Must contain a number",
});

extend("min_value", {
  ...min_value,
  message: "Must contain a number or number is too low",
});

extend("max_value", {
  ...max_value,
  message: "Must contain a number or number is too high",
});

extend("digits", {
  ...digits,
  message: "Must contain a number and have correct number of digits",
});

extend('positive_number', (value) => {
  return value < 0 ? "Must contain a number is positive" : true
});

extend("date_format", (value) => {
  if (value) {
    let isError = false;
    isError = dateValidate(value);
    return isError
      ? "{_field_} must be in the format MM/DD/YYYY(03/15/2020)"
      : true;
  }
});
extend("dob_date_format", (value) => {
  if (value) {
    let isError = false;
    isError = dobDateValidate(value);
    return isError
      ? "{_field_} must be in the format MM-DD-YYYY(03-15-2023)"
      : true;
  }
});

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
