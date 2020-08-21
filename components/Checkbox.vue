<template>
	<ValidationProvider :name="$attrs.label" :rules="rules" v-slot="{ errors, valid }">
		<v-checkbox
			v-model="innerValue"
			:error-messages="errors"
			v-bind="$attrs"
			v-on="$listeners"
			false-value="0"
		></v-checkbox>
	</ValidationProvider>
</template>

<script>
import { ValidationProvider } from "vee-validate";

export default {
	components: {
		ValidationProvider
	},
	props: {
		rules: {
			type: [Object, String],
			default: ""
		},
		// must be included in props
		value: {
			type: null
		}
	},
	data: () => ({
		innerValue: false
	}),
	watch: {
		// Handles internal model changes.
		innerValue(newVal) {
			this.$emit("input", newVal);
		},
		// Handles external model changes.
		value(newVal) {
			this.innerValue = newVal;
		}
	},
	created() {
		if (this.value) {
			this.innerValue = this.value;
		}
	}
};
</script>
