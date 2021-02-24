<template>
	<ValidationProvider
		:name="$attrs.label"
		:rules="rules"
		v-slot="{ errors, valid }"
	>
		<div class="mb-6">
			<div class="mb-2 pl-1">
				<label>{{ label }}</label>
			</div>
			<tiptap-vuetify
				v-model="innerValue"
				:error-messages="errors"
				v-bind="$attrs"
				v-on="$listeners"
				:extensions="extensions"
				:toolbar-attributes="{ color: 'grey lighten-2' }"
			/>
		</div>
	</ValidationProvider>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import {
	TiptapVuetify,
	Heading,
	Bold,
	Italic,
	Strike,
	Underline,
	Code,
	Paragraph,
	BulletList,
	OrderedList,
	ListItem,
	Link,
	Blockquote,
	HardBreak,
	HorizontalRule,
	History,
} from "tiptap-vuetify";
export default {
	components: {
		ValidationProvider,
		TiptapVuetify,
	},
	props: {
		label: {
			type: String,
			default: "",
		},
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
		extensions: [
			History,
			Blockquote,
			Link,
			Underline,
			Strike,
			Italic,
			ListItem,
			BulletList,
			OrderedList,
			[
				Heading,
				{
					options: {
						levels: [1, 2, 3],
					},
				},
			],
			Bold,
			Code,
			HorizontalRule,
			Paragraph,
			HardBreak,
		],
	}),
	watch: {
		// Handles internal model changes.
		innerValue(newVal) {
			this.$emit("input", newVal);
		},
		// Handles external model changes.
		value(newVal) {
			this.innerValue = newVal;
		},
	},
	created() {
		if (this.value) {
			this.innerValue = this.value;
		}
	},
};
</script>
<style lang="scss" scoped>
.v-input fieldset {
	background-color: #fff;
}
</style>