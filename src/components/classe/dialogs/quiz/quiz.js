import axios from 'axios';
import question from "components/classe/dialogs/question/question.vue";
import devoir from "components/classe/dialogs/devoir/devoir.vue";
import questionAffichage from "components/question/question.vue";
export default {
  props: ["modalQuiz"],
  components: {
    question,
    questionAffichage, 
    devoir
  },
  computed: {
    classes(){
      return this.$store.state.classe.classes
    },
    panier(){
      return this.$store.state.quiz.questions
    },
    questions(){
      return this.$store.state.question.questions
    }
  },
  name: 'classe_dialog_quiz',
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
    }
  },
  methods: {
    fermer() {
      this.$emit("update:modalQuiz", false)
    },
    creerQuestion() {
      this.modalQuestion = true
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
    this.$store.dispatch('classe/get_classe_for_tree', data)
  },
}
