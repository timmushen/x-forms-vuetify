<template>
	<div>
		<label class="mb-2">{{ label }}</label>
		<div v-if="!existingImage">
			<v-card
				outlined
				:max-width="width"
				v-if="previewImg"
				v-bind="$attrs"
				v-on="$listeners"
			>
				<v-img :src="previewImg" :max-height="width" :max-width="width">
					<template v-slot:default v-if="uploadPercentage > 0">
						<v-row class="fill-height ma-0" align="center" justify="center">
							<v-progress-circular
								indeterminate
								color="grey darken-3"
							></v-progress-circular>
						</v-row>
					</template>
				</v-img>
				<v-progress-linear
					max="100"
					:value="uploadPercentage"
					v-if="uploadPercentage > 0"
				></v-progress-linear>
				<v-card-text>
					<!-- <div class="caption">{{ file.size | bytes }}</div> -->
				</v-card-text>
				<v-card-actions>
					<button @click="clearImg">
						<v-icon>mdi-close-circle-outline</v-icon>
					</button>
					{{ message }}
					<v-spacer />
					<XBtn
						@click="upload"
						:color="btnColor"
						class="px-2"
						:loading="uploadBtnLoading"
						><v-icon small left>mdi-upload</v-icon> Upload</XBtn
					>
				</v-card-actions>
			</v-card>

			<v-card
				:max-width="width"
				:min-height="width"
				v-cloak
				@drop.prevent="addDropFile"
				@dragover.prevent
				v-else
				class="d-flex justify-center"
				v-bind="$attrs"
			>
				<v-btn
					@click="clickFileOpen"
					:style="` max-height: '${width}px'; width: 100%; height: ${width}px;  border: none`"
					v-ripple
				>
					<v-icon x-large color="grey darken-1">mdi-cloud-upload</v-icon>
				</v-btn>
			</v-card>
			<v-file-input
				v-model="image"
				ref="fileInput"
				show-size
				style="display: hidden"
				:rules="rules"
				accept="image/png, image/jpeg, image/bmp"
				v-show="false"
			/>
		</div>

		<div v-if="existingImage">
			<v-card :max-width="width" v-bind="$attrs" outlined>
				<v-img :src="existingImage" :max-height="width" :max-width="width">
					<template v-slot:placeholder>
						<v-row class="fill-height ma-0" align="center" justify="center">
							<v-progress-circular
								indeterminate
								color="grey darken-3"
							></v-progress-circular>
						</v-row>
					</template>
				</v-img>

				<v-card-actions v-if="deleteUrl">
					<span class="pl-2 grey--text">{{ message }}</span>
					<v-spacer />
					<XBtn @click="remove" color="default" class="mr-1">
						<v-icon small left>mdi-close-circle-outline</v-icon> Remove
					</XBtn>
				</v-card-actions>
			</v-card>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		label: {
			default: "",
		},
		width: {
			default: 200,
		},
		accept: {
			default: "",
		},
		method: {
			default: "put",
		},
		formArray: {
			default() {
				return [];
			},
		},
		uploadUrl: {
			default: "",
		},
		deleteUrl: {
			default: "",
		},
		name: {
			default: "",
		},
		existingImage: {
			type: String,
			default: "",
		},
		btnColor: {
			type: String,
			default: "primary",
		},
	},
	data: function () {
		return {
			uploadPercentage: 0,
			message: "",
			image: null,
			uploadBtnLoading: false,
			file: {},
			rules: [
				(value) =>
					!value || value.size < 5000000 || "Size should be less than 5MB.",
			],
		};
	},
	computed: {
		previewImg() {
			if (!this.image) return;
			this.file.size = this.image.size;
			this.file.type = this.image.type;
			this.file.name = this.image.name;
			return URL.createObjectURL(this.image);
		},
	},
	methods: {
		addDropFile(e) {
			this.image = e.dataTransfer.files[0];
		},
		clickFileOpen() {
			this.$refs.fileInput.$refs.input.click();
		},
		clearImg: async function () {
			this.image = null;
			this.uploadBtnLoading = false;
		},
		upload: async function () {
			let self = this;
			this.uploadBtnLoading = true;
			if (this.file) {
				let formData = new FormData();
				formData.append(this.name, this.image, this.image.name);
				// additional data
				if (this.formArray.length > 0) {
					this.form.forEach((x) => {
						formData.append(x.name, x.value);
					});
				}

				await this.$axios
					.put(`${this.uploadUrl}`, formData, {
						headers: {
							"Content-Type": "multipart/form-data",
						},
						onUploadProgress: (progressEvent) =>
							(this.uploadPercentage = parseInt(
								Math.round((progressEvent.loaded / progressEvent.total) * 100)
							)),
						// console.log(progressEvent.loaded),
					})
					.then(async (response) => {
						this.uploadBtnLoading = false;
						this.existingImage = URL.createObjectURL(this.image);
						this.message = "Image uploaded";
						this.$emit("afterUpload");
					})
					.catch((e) => {
						this.uploadBtnLoading = false;
						this.message = "e";
						console.log({ e });
					});
			}
		},
		remove: async function () {
			this.$store.state.theme.loading = true;
			await this.$axios
				.delete(this.deleteUrl)
				.then(async (response) => {
					this.$store.state.theme.loading = false;
					this.$emit("afterUpload");
					this.existingImage = "";
					this.image = "";
				})
				.catch((e) => {
					this.$store.state.theme.loading = false;
					this.message = e.message;
					console.log(e);
				});
		},
	},
};
</script>

<style lang="css" scoped>
button:focus {
	outline: none;
}

button.v-btn {
	height: 400px;
}
</style>