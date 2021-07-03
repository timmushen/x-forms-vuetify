<template>
	<div>
		<v-switch
			v-model="value"
			:label="label"
			color="primary"
			@change="onSubmit"
			v-bind="$attrs"
			v-on="$listeners"
		></v-switch>
	</div>
</template>

<script>
export default {
	props: {
		value: Boolean,
		propertyName: String,
		id: String,
		put: String,
		label: {
			type: String,
			default: "Active",
		},
	},
	data: () => ({}),
	methods: {
		onSubmit: async function () {
			this.$store.state.theme.loading = true;
			const form = {};
			form[this.propertyName] = this.value;
			await this.$axios
				.put(`${this.put}`, form)
				.then(async (response) => {
					this.$store.state.theme.loading = false;
				})
				.catch((err) => {
					this.$store.state.theme.loading = false;
					console.log(err);
				});
		},
	},
};
</script>

<style lang="scss" scoped>
</style>