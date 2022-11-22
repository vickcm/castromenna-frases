<template>
  <v-container fluid>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar dark color="orange" class="mb-1">
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-magnify"
              label="Filtrá por:"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle v-model="sortDesc" mandatory>
              <v-btn large depressed color="teal" :value="false">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn large depressed color="teal" :value="true">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card class="mt-6 pb-2">
              <v-card-title
                class="subheading font-weight-bold teal space--text"
              >
                {{ item.titulo }}
              </v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item v-for="(key, index) in filteredKeys" :key="index">
                  <v-list-item-content
                    class="align-end text-bold"
                    :class="{ 'teal--text': sortBy === key }"
                  >
                    {{ item[key.toLowerCase()] }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <div class="gray--text">
                <favoritas-boton-agregar
                  @button-clicked="agregarFavoritas(item)"
                  :item="item"
                >
                </favoritas-boton-agregar>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <span class="grey--text">Frases por página</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                text
                color="orange"
                class="ml-2"
                v-bind="attrs"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span class="mr-4 grey--text">
            Página {{ page }} de {{ numberOfPages }}
          </span>
          <v-btn fab dark color="orange" class="mr-1" @click="formerPage">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab dark color="orange" class="ml-1" @click="nextPage">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>

      <template v-slot:no-results>
        <p class="ma-6 subtitle-1 text-center">
          No hemos encontrado resultados. Intente nuevamente con otra búsqueda
        </p>
      </template>
    </v-data-iterator>

    <template>
      <div class="black">
        <h2 class="titulo orange--text pt-5">Frases Favoritas</h2>

        <p class="bajada pb-5 space--text">
          Es importante tener en cuenta que
          <span class="resaltado orange--text"
            >a través de las frases conseguimos transmitir pensamientos e
            ideas</span
          >
          , es decir, muchas de ellas han sido creadas por otras personas en el
          pasado, de manera que contienen
          <span class="resaltado orange--text"
            >un significado muy importante</span
          >
          que debemos analizar y tener en cuenta puesto que se trata de la mejor
          forma de
          <span class="resaltado orange--text">acceder a sus enseñanzas.</span>
        </p>
      </div>

      <v-row>
        <div v-if="this.favoritas.length == 0">
          <v-alert
            border="left"
            color="orange"
            dark
            class="mt-5"
            max-width="600"
          >
            {{ mensaje }}
          </v-alert>
        </div>
        <v-row no-gutters>
          <v-col cols="12">
            <v-card
              v-for="item in favoritas"
              :key="item.id"
              :loading="loading"
              class="mx-auto my-12"
              max-width="400"
            >
              <template slot="progress">
                <v-progress-linear
                  color="orange"
                  height="10"
                  indeterminate
                ></v-progress-linear>
              </template>

              <v-card-title> {{ item.titulo }} </v-card-title>

              <v-card-text>
                <v-row align="center" class="mx-0">
                  <v-rating
                    :value="4.5"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                  ></v-rating>
                </v-row>
              </v-card-text>
              <v-divider class="mx-4"></v-divider>
              <v-card-subtitle>{{ item.frase }}</v-card-subtitle>

              <v-card-actions>
                <v-btn
                  depressed
                  class="space--text m-3"
                  color="teal"
                  @click="eliminarFav(item)"
                >
                  Eliminar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-row>
    </template>
  </v-container>
</template>



<script>
import FavoritasBotonAgregar from "../components/Favoritas-Boton-Agregar.vue";

export default {
  components: { FavoritasBotonAgregar },
  props: ["item"],

  name: "Card-Frases",

  data() {
    return {
      mensaje: "Seleccioná tu frase favorita",
      loading: false,
      selection: 1,

      itemsPerPageArray: [4, 8, 12],
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: "categoria",
      keys: ["Frase", "Categoria", "fecha"],

      favoritas: [],
      fraseRepetida: 0,
      colorBtn: "orange",

      items: [
        {
          id: 1,
          titulo: "El curioso caso de Benjamin Button",
          frase:
            "Todas las oportunidades marcan el transcurso de nuestra vida, incluso las que dejamos ir.",
          categoria: "peliculas",
          fecha: 2008,
        },
        {
          id: 2,
          titulo: "Gladiador",
          frase: "La muerte nos sonríe a todos. Devolvámosle la sonrisa.",
          categoria: "peliculas",
          fecha: 2000,
        },
        {
          id: 3,
          titulo: "Anna Karenina, Leon Tolstoi",
          frase: "Si buscas la perfección nunca estarás contento.",
          categoria: "libros",
          fecha: 1878,
        },
        {
          id: 4,
          titulo: "Los miserables, Victor Hugo",
          frase:
            "Es en las noches de diciembre, cuando el termómetro está a cero, cuando más pensamos en el sol.",
          categoria: "libros",
          fecha: 1862,
        },
        {
          id: 5,
          titulo: "El Alquimista, Paulo Coehlo",
          frase:
            "Seas quien seas, hagas lo que hagas, cuando deseas con firmeza alguna cosa es porque este deseo nació en el alma del universo. Es tu misión en la tierra.",
          categoria: "libros",
          fecha: 1988,
        },
        {
          id: 6,
          titulo: "Dexter",
          frase:
            "No existen secretos en la vida. Solo verdades escondidas que viven debajo de la superficie ",
          categoria: "series",
          fecha: 2006,
        },
        {
          id: 7,
          titulo: "El mago de Oz",
          frase: "No hay lugar como el hogar ",
          categoria: "peliculas",
          fecha: 1939,
        },
        {
          id: 8,
          titulo: "Casablanca",
          frase:
            "De todos los bares de todas las ciudades de todo el mundo, ella entra en el mío.",
          categoria: "peliculas",
          fecha: 1942,
        },
        {
          id: 9,
          titulo: "Forest Gump",
          frase:
            "La vida es como una caja de bombones, nunca sabes lo que te va a tocar.",
          categoria: "peliculas",
          fecha: 1994,
        },

        {
          id: 10,
          titulo: "Millon Dollar Baby",
          frase:
            "La magia de librar batallas más allá de lo humanamente soportable se basa en lo mágico que resulta arriesgarlo todo por un sueño que nadie más alcanza a ver excepto tú.",
          categoria: "peliculas",
          fecha: 2004,
        },
        {
          id: 11,
          titulo: "Amores Perros",
          frase: "Porque también somos lo que hemos perdido.",
          categoria: "peliculas",
          fecha: 2000,
        },
        {
          id: 12,
          titulo: "El Pianista",
          frase: "Siempre digo: ve el lado bueno de las cosas.",
          categoria: "peliculas",
          fecha: 2002,
        },
        {
          id: 13,
          titulo: "Alicia en el país de las maravillas",
          frase:
            "Alicia: ¿Cuánto tiempo es para siempre? Conejo blanco: A veces solo un segundo.",
          categoria: "libros",
          fecha: 1865,
        },
        {
          id: 14,
          titulo: "El Principito",
          frase:
            "Alicia: ¿Cuánto tiempo es para siempre? Conejo blanco: A veces solo un segundo.",
          categoria: "libros",
          fecha: 1943,
        },

        {
          id: 15,
          titulo: "El nombre de la rosa",
          frase:
            "Nada hay que ocupe y ate más al corazón que el amor. Por eso, cuando no dispone de armas para gobernarse, el alma se hunde en la más honda de las ruinas.",
          categoria: "libros",
          fecha: 1980,
        },

        {
          id: 16,
          titulo: "La invención de la soledad",
          frase: "Es imposible entrar en la soledad del otro.",
          categoria: "libros",
          fecha: 1982,
        },
        {
          id: 17,
          titulo: "La invención de la soledad",
          frase:
            "Soledad como forma de retirada, para no tener que enfrentarse a sí mismo..",
          categoria: "libros",
          fecha: 1982,
        },
      ],
    }; 
  },

  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== "Titulo");
    },
  },

  mounted() {
    this.favoritas = JSON.parse(localStorage.getItem("fav")) || [];
  },

  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },

    agregarFavoritas(item) {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
      this.favoritas = JSON.parse(localStorage.getItem("fav")) || [];

      if (this.favoritas.length != 0) {
        console.log(this.favoritas);
        console.log(item);

        if (this.favoritas.length >= 1) {
          this.fraseRepetida = 0;
          for (var i = 0; i < this.favoritas.length; i++) {
            if (this.favoritas[i].id == item.id) {
              this.fraseRepetida++;
            }
          }

          console.log(this.fraseRepetida);
        }

        if (this.fraseRepetida == 0) {
          this.favoritas.push(item);
          localStorage.setItem("fav", JSON.stringify(this.favoritas));
        }
      } else {
        console.log("lo agreganos porque está vacío");
        this.favoritas.push(item);
        localStorage.setItem("fav", JSON.stringify(this.favoritas));
      }

      console.log(this.favoritas);
      this.favoritas = JSON.parse(localStorage.getItem("fav"));
    },

    eliminarFav(item) {
      this.favoritas = JSON.parse(localStorage.getItem("fav"));
      console.log(item.id);
      for (var i = 0; i < this.favoritas.length; i++) {
        if (this.favoritas[i].id == item.id) {
          this.favoritas.splice(i, 1);
          console.log(i);
        }
      }

      localStorage.setItem("fav", JSON.stringify(this.favoritas));
    },
  },
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