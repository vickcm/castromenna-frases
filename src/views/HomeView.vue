<template>
  <div>
    <v-carousel :show-arrows="false">
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
        class="p-0 m-0"
      ></v-carousel-item>
    </v-carousel>

    <h2 class="titulo">
      La importancia de tener siempre a mano una buena colección de frases.
    </h2>

    <p class="bajada">
      Gracias a la posibilidad que tenemos a día de hoy de tener a nuestra
      disposición un
      <span class="resaltado teal--text"
        >amplio abanico de frases diferentes</span
      >
      , por una parte vamos a tener
      <span class="resaltado teal--text">la frase perfecta</span> para utilizar
      cuando no nos salgan las palabras, y por otra parte también vamos a tener
      a nuestra disposición
      <span class="resaltado teal--text">una alternativa</span> gracias a la
      cual vamos a
      <span class="resaltado teal--text">poder meditar y pensar</span> más
      acerca de nosotros mismos y de todo lo que hay a nuestro alrededor.
    </p>

    <h2 class="titulo titulo2 teal--text">
      Te presentamos nuestras mejores frases seleccionadas para vos.
    </h2>

    <card-frases class="mt-6"></card-frases>
  </div>
</template>

 

<script>
import CardFrases from "../components/Card-Frases.vue";

export default {
  name: "HomeView",
  components: { CardFrases },

  data: () => ({
    items: [
      {
        src: require("@/assets/book-slide.jpg"),
      },
      {
        src: require("@/assets/book-slide2.jpg"),
      },
      {
        src: require("@/assets/slide3.jpg"),
      },
      {
        src: require("@/assets/slide4.jpeg"),
      },
    ],

  }),
 
};
</script>

<style scoped>
.titulo {
  max-width: 500px;
  margin-top: 2rem !important;
  margin-bottom: 2rem !important;
  text-align: center;
  margin: auto;
}

.bajada {
  max-width: 600px;
  margin-top: 2rem !important;
  margin-bottom: 2rem !important;
  text-align: center;
  margin: auto;
}

.resaltado {
  font-weight: bold;
}

.titulo2 {
  font-size: 1.2rem !important;
}
</style>