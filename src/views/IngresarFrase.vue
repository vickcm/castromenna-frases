<template>
  <div class="container">
    <h1 class="teal--text">Cargá tus frases</h1>

    <v-form ref="form">
      <v-text-field
        v-model="form_data.autor"
        label="Autor"
        counter="20"
      ></v-text-field>

      <v-textarea
        label="Frase"
        v-model="form_data.frase"
        rows="2"
        row-height="20"
      ></v-textarea>

      <v-select
        :items="items"
        label="Seleccionar Categoría"
        multiple
        v-model="form_data.selected"
      >
      </v-select>

      <v-text-field v-model.number="form_data.anio" label="Año"></v-text-field>

      <div class="guardar">
        <v-btn rounded color="teal" dark @click="guardar(form_data)">
          Guardar
        </v-btn>
      </div>
    </v-form>

    <div>
      <div v-if="control === true">
        <div v-if="cantidadErrores" :class="muestraError">
          <ul>
            <li v-for="x in errores" :key="x">{{ x }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  name: "IngresarFrase",

  data: function () {
    return {
      form_data: {
        autor: "",
        frase: "",
        selected: [],
        anio: "",
        id: "",
      },
      items: ["Libro", "Película", "Serie", "Otro"],
      errores: [],
      datosForm: [],
      control: false,
      muestraError: "orange mt-5 space--text",
      hoy: new Date(),
    };
  },

  computed: {
    cantidadErrores: function () {
      return this.errores.length; // Devuelve cantidad errores
    },
  },

  methods: {
    guardar: function (form_data) {
      console.log(form_data.selected);

      this.control = true; //queremos evaluar que los mensajes se muestren solo cuando se ejecute la funcion
      this.errores = []; //vaciamos el array de errores

      console.log(this.contacto);

      if (!this.form_data.autor) {
        console.log(!this.form_data.autor);
        this.errores.push("El nombre es obligatorio.");
      }

      if (this.form_data.autor && this.form_data.autor.length < 5) {
        this.errores.push(
          "Autor/Película/Libro: Debe tener más de 5 caracteres."
        );
      }

      if (!this.form_data.frase) {
        this.errores.push("La Frase no puede estar vacía.");
      }

      console.log(form_data.selected);

      if (form_data.selected.length === 0) {
        this.errores.push("Debe seleccionar una categoría");
      }

      if (isNaN(form_data.anio)) {
        this.errores.push("El año debe contener un número");
      }

      if (!form_data.anio) {
        this.errores.push("Debe ingresar un año");
      }

      if (this.errores.length == 0) {
        form_data = Object.assign({}, form_data, { id: new Date().getTime() });
        console.log(form_data);

        if (!localStorage.form) {
          this.datosForm = [];
        } else {
          this.datosForm = JSON.parse(localStorage.getItem("form"));
        }

        this.datosForm.push(form_data);
        localStorage.setItem("form", JSON.stringify(this.datosForm));

        this.$router.push("/frasesguardadas");
      }
    },
  },
};
</script>


