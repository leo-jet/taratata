import axios from 'axios';
export default {
  props: [],
  components: {
  },
  computed: {
    classes(){
      return this.$store.state.classe.classes
    },
    eleves(){
      return this.$store.state.classe.classes[this.indexClasse].eleves
    }
  },
  name: 'classes_eleves',
  data() {
    return {
      modalDevoir: false,
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
      }],
      modalQuestion: false,
      selected: null,
      ticked: [],
      tickStrategy: 'leaf',
      tickFilter: null,
      enseignant: null,
      dateDebut: "",
      dateFin: "",
      titre: "",
      contenuFichier: "",
      contenuVideo: "",
      description: "",
      numero: 1,
      indexClasse:0,
    }
  },
  methods: {
    fermer() {
      this.$emit("update:modalQuiz", false)
    },
    voirListEleve(index) {
      console.log("hello world")
      this.indexClasse = index
    }, 
    creerDevoir(){
      this.modalDevoir = true
    },
    get_question(){
      let data = {
        "token": this.$store.state.utilisateur.token, 
        "selections": this.ticked
      }
      this.$store.dispatch('question/get_questions_with_selection', data)
    }
  },
  mounted() {
    let data = {
      "token": this.$store.state.utilisateur.token
    }
    this.$store.dispatch("classe/get_classes_avec_eleves", data)
  },
}
