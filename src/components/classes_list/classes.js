import axios from 'axios';
import {
  classesCollection
} from "assets/javascript/firebase.js";
export default {
  components: {},
  computed: {},
  data() {
    return {
      rows_per_page_options: [0, 0],
      filter: "",
      columns: [{
          name: 'desc',
          required: true,
          label: 'Dessert (100g serving)',
          align: 'left',
          field: 'name',
          sortable: true
        },
        {
          name: 'calories',
          label: 'Calories',
          field: 'calories',
          sortable: true
        },
        {
          name: 'fat',
          label: 'Fat (g)',
          field: 'fat',
          sortable: true
        },
        {
          name: 'carbs',
          label: 'Carbs (g)',
          field: 'carbs'
        },
        {
          name: 'protein',
          label: 'Protein (g)',
          field: 'protein'
        },
        {
          name: 'sodium',
          label: 'Sodium (mg)',
          field: 'sodium'
        },
        {
          name: 'calcium',
          label: 'Calcium (%)',
          field: 'calcium',
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: 'iron',
          label: 'Iron (%)',
          field: 'iron',
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        }
      ],
      visibleColumns: ['desc', 'fat', 'carbs', 'protein', 'sodium', 'calcium', 'iron'],
      separator: 'horizontal',
      selection: 'multiple',
      selected: [
        // initial selection
        {
          name: 'Ice cream sandwich'
        }
      ],
      pagination: {
        rowsPerPage: 0
      },
      paginationControl: {
        rowsPerPage: 3,
        page: 1
      },
      loading: false,
      dark: true,
      selectedSecond: [{
        name: 'Eclair'
      }]
    }
  },
  computed: {
    classes() {
      return []
    }
  },
  methods: {
    modifier(row) {
      let classe = row.classe
      /**let url = process.env.API + '/classe/' + classe.idClass + '/'
      axios.get(url).then((response) => {
        this.$store.commit("classe/init_classe", response.data)
      })
      .catch((error) => {
        let message = "Identifiant ou mot de pass incorrect!" + error
        this.$q.notify({
          type: "positive",
          message: message,
        })
      })**/
      let next = '/classe/' + classe.id
      this.$router.push(next)
    },
    async creerClasse(){
      var classe = await classesCollection.add({})
      let next = '/classe/' + classe.id
      this.$router.push(next)
    },
    get_enseignant_classe(classe) {
      let enseignants = []
      for (var i in classe.enseignants) {
        enseignants.push({
          label: classe.enseignants[i].nom,
          icon: 'portrait'
        })
      }
      console.log(enseignants)
      return enseignants
    }
  },
  mounted() {
    let data = {
      "token": this.$store.state.utilisateur.token
    }
    this.$store.dispatch("classe/get_classes", data)
  },
  destroyed() {
    console.log("good bye")
  }
};
