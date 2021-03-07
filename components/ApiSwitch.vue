<template>
	<div>
		<v-switch
			v-model="value"
			:label="label"
			color="primary"
			@change="onSubmit"
		></v-switch>
	</div>
</template>

<script>
export default {
	props: {
		value: Boolean,
		id: String,
		put: String,
		label: {
			type: String,
			default: "Active",
		},
	},
	data: () => ({
		form: "",
	}),
	methods: {
		onSubmit: async function () {
			this.$store.state.theme.loading = true;
			await this.$axios
				.put(`${this.put}`, {
					active: this.value,
				})
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