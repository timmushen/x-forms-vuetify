<template>
  <div>
  <ValidationObserver v-slot="{ passes }">
   <v-form ref="form" lazy-validation @submit.prevent="passes(onSubmit)"  v-bind="$attrs" v-on="$listeners">
     <slot />
   </v-form>
  </ValidationObserver>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

</style>