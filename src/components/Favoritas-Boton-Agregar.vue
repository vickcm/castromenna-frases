<template>
  <div>
    <v-btn
      depressed
      class="space--text ml-3"
      color="teal"
      @click="buttonClicked"
    >
      Agregar a Favoritos
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "Favoritas-Boton-Agregar",

  methods: {
    buttonClicked(e) {
      console.log(e);
      this.$emit("button-clicked");
    },
  },
};
</script>

<style>
</style>
