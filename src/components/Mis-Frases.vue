<template>
  <div class="contenedor">
    <div class="centrado">
      <h2>Mis Frases - Panel de Administración</h2>

      <template>
        <v-row>
          <v-col cols="12">
            <v-card
              v-for="item in local"
              :key="item.id"
              class="mx-auto my-12"
              max-width="600"
              :loading="loading"
              tile
            >
              <template slot="progress">
                <v-progress-linear
                  color="orange"
                  height="10"
                  indeterminate
                ></v-progress-linear>
              </template>

              <v-card-title>
                {{ item.autor }}
              </v-card-title>

              <v-card-text>
                <v-row align="center" class="mx-0">
                  <v-rating
                    :value="5"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                  ></v-rating>
                </v-row>
              </v-card-text>

              <v-divider class="mx-4"></v-divider>

              <v-card-subtitle>
                {{ item.frase }}
              </v-card-subtitle>

              <v-card-subtitle
                class="d-block"
                v-for="x in item.selected"
                :key="x"
              >
                Categoría: {{ x }}
              </v-card-subtitle>

              <v-card-text class="d-block">"{{ item.anio }}" </v-card-text>

              <v-card-actions>
                <router-link
                  :to="
                    '/editarfrase/' +
                    item.autor +
                    '/' +
                    item.frase +
                    '/' +
                    item.selected +
                    '/' +
                    item.anio +
                    '/' +
                    item.id
                  "
                  class="editar"
                >
                  <v-btn depressed class="space--text m-3 mr-5" color="teal"
                    >Editar
                  </v-btn>
                </router-link>
                <v-btn
                  depressed
                  class="space--text m-3"
                  color="orange"
                  :key="item.id"
                  @click="borrar(item)"
                  >Borrar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <div v-if="this.local.length == 0">
        <v-alert border="left" color="orange" dark class="mt-5" max-width="600">
          {{ mensaje }}
        </v-alert>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Mis-Frases",

  data: function () {
    return {
      local: [],
      mensaje: "",
      loading: false,
      selection: 1,
    };
  },

  mounted() {
    this.fraseLocal();
  },

  methods: {
    fraseLocal() {
      if (localStorage.form) {
        this.local = JSON.parse(localStorage.getItem("form"));
        this.loading = true;

        setTimeout(() => (this.loading = false), 2000);
        this.loading = true;
      }
      if (this.local.length == 0) {
        this.mensaje = "Aquí podes guardar tus frases favoritas!";
      }
    },

    borrar(item) {
      this.local = JSON.parse(localStorage.getItem("form"));

      for (var i = 0; i < this.local.length; i++) {
        if (this.local[i].id == item.id) {
          var rta = confirm(
            "Confirmación de borrado de la frase de:  " + this.local[i].autor
          );
          if (rta == true) {
            this.local.splice(i, 1);
          }
        }
      }

      localStorage.setItem("form", JSON.stringify(this.local));

      this.fraseLocal();
    },
  },
};
</script>

