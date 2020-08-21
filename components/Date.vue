<template>
  <ValidationProvider :name="$attrs.label" :rules="rules" v-slot="{ errors, valid }">
    <v-menu :close-on-content-click="true" max-width="460px" min-width="290px" offset-y>
      <template v-slot:activator="{ on }">
        <v-text-field
          :value="computedDateFormattedMomentjs"
          v-bind="$attrs"
          readonly
          v-on="on"
          @click:clear="innerValue = null"
          :error-messages="errors"
          prepend-inner-icon="event"
        ></v-text-field>
      </template>
      <v-date-picker
        @change="menu1 = false"
        v-model="innerValue"
        :max="$attrs.max"
        :min="$attrs.min"
        :show-current="new Date().toISOString().substr(0, 10)"
      ></v-date-picker>
    </v-menu>
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
			this.$emit('input', newVal)
		},
		// Handles external model changes.
		value(newVal) {
			this.innerValue = newVal
		},
	},
	computed: {
		computedDateFormattedMomentjs() {
			return this.innerValue
				? this.$moment(this.innerValue).format('M/DD/YYYY')
				: null
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