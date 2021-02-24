<template>
	<ValidationProvider
		:name="$attrs.label"
		:rules="rules"
		v-slot="{ errors, valid }"
	>
		<v-text-field
			v-model="innerValue"
			:error-messages="errors"
			prefix="$"
			v-bind="$attrs"
			@input="handleInput"
			v-on="listeners()"
			v-currency="options"
		></v-text-field>
	</ValidationProvider>
</template>

<script>
import { parse } from "vue-currency-input";
import { ValidationProvider } from "vee-validate";
export default {
	components: {
		ValidationProvider,
	},
	props: {
		rules: {
			type: [Object, String],
			default: "",
		},
		// must be included in props
		value: {
			type: null,
		},
	},
	data: () => ({
		innerValue: "",
	}),
	computed: {
		options() {
			return {
				distractionFree: false,
				valueAsInteger: false,
				autoDecimalMode: false,
				currency: null,
			};
		},
	},
	methods: {
		handleInput(value) {
			this.$emit("input", parse(value));
			this.innerValue = value;
		},
		listeners() {
			// eslint-disable-next-line
			const { input, ...listeners } = this.$listeners; // all but input event
			return listeners;
		},
	},
	created() {
		if (this.value) {
			this.innerValue = this.value;
		}
	},
};
</script>
