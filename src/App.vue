<template>
  <v-app>
    <h1 class="d-none">Frases de Libros, Películas y más.</h1>
    <v-navigation-drawer v-model="drawer" app class="black">
      <v-list tag="ul">
        <li v-for="item in items" :key="item.titulo">
          <v-list-item :to="item.path">
            <v-list-item-action>
              <v-icon class="space--text">mdi-{{ item.icono }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="space--text">
                {{ item.titulo }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </li>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar class="teal" app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="space--text"
        >Frases de Libros y Películas</v-toolbar-title
      >
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer height="auto">
      <v-card class="flex" flat tile>
        <v-card-title class="black">
          <v-spacer></v-spacer>

          <v-btn v-for="icon in icons" :key="icon" class="mx-3" dark icon>
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-actions class="orange justify-center mb-0">
          <span>&copy;2022 — Victoria Castro Menna Interfaz Vuetify</span>
        </v-card-actions>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-instagram"],
    items: [
      {
        titulo: "Home",
        icono: "home",
        path: "/",
      },
      {
        titulo: "Cargar Frases",
        icono: "draw-pen",
        path: "/cargar",
      },
      {
        titulo: "Mis Frases",
        icono: "heart",
        path: "/frasesguardadas",
      },
    ],
    drawer: null,
  }),
};
</script>
<style scoped>
.theme--light.v-list {
  padding: 0;
}
</style>