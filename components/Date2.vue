<template>
  <ValidationProvider :name="$attrs.label" :rules="rules" v-slot="{ errors, valid }">
    <v-text-field
      v-model="innerValue"
      prepend-inner-icon="event"
      :error-messages="errors"
      v-bind="$attrs"
      v-mask="'##/##/####'"
      v-on="$listeners"
    ></v-text-field>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
	components: {
		ValidationProvider,
	},
	props: {
		rules: {
			type: [Object, String],
			default: '',
		},
		// must be included in props
		value: {
			type: null,
		},
	},
	data: () => ({
		innerValue: '',
	}),
	watch: {
		// Handles internal model changes.
		innerValue(newVal) {
			if (
				newVal &&
				newVal.length == 10 &&
				this.$moment(newVal).isValid() === true
			) {
				newVal = this.$moment(newVal).format('YYYY/MM/DD')
				this.$emit('input', newVal)
			}
			// this.$emit("input", newVal);
		},
		date_val() {},
		// Handles external model changes.
		value(newVal) {
			this.innerValue = newVal
		},
	},
	created() {
		if (this.value) {
			this.innerValue = this.value
		}
	},
}
</script>
<style lang="scss" scoped>
.v-input fieldset {
	background-color: #fff;
}
</style>