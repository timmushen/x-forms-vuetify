<template>
  <ValidationProvider :name="$attrs.label" :rules="rules" v-slot="{ errors, valid }">
    <v-text-field
      v-model="innerValue"
      :error-messages="errors"
      v-bind="$attrs"
      v-on="$listeners"
      :append-icon="p_value ? 'visibility' : 'visibility_off'"
      @click:append="() => (p_value = !p_value)"
      :type="p_value ? 'password' : 'text'"
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
		p_value: String,
	}),
	watch: {
		// Handles internal model changes.
		innerValue(newVal) {
			this.$emit('input', newVal)
		},
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