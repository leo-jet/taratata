import axios from 'axios';
import question from "components/classe/dialogs/question/question.vue";
import devoir from "components/classe/dialogs/devoir/devoir.vue";
import questionAffichage from "components/question/question.vue";
import {
  sectionsCollection,
  classesCollection
} from 'assets/javascript/firebase.js'
export default {
  props: ["modalQuiz"],
  components: {
    question,
    questionAffichage,
    devoir
  },
  computed: {
    classes() {
      var cls = this.$store.state.classe.classe
      var clstree = {
        id: cls.id,
        label: cls.nom,
        icon: "fas fa-chalkboard-teacher",
        children: []
      }
      var chaps = this.$store.state.classe.chapitres
      console.log(chaps)
      for (var chapitre of chaps) {
        var sections = []
        for (var section of chapitre.sections) {
          sections.push({
            id: section.value,
            label: section.titre,
            icon: "fas fa-hand-point-right"
          })
        }
        clstree.children.push({
          id: chapitre.titre,
          label: chapitre.titre,
          icon: "fas fa-list-alt",
          children: sections
        })
      }
      return [clstree]
    },
    panier() {
      return []
    },
    classeRef() {
      return classesCollection.doc(this.$route.params.idClasse)
    }
  },
  name: 'classe_dialog_quiz',
  watch: {
    async ticked(sections) {
      var questions = []
      for (var id of sections) {
        var quest = await sectionsCollection.doc(id).collection("questions").get()
        for (var doc of quest.docs) {
          var q = doc.data()
          q.id = doc.id
          questions.push(q)
        }
      }
      this.questions = questions
    }
  },
  data() {
    return {
      modalDevoir: false,
      rows_per_page_options: [0, 0],
      filter: "",
      questions: [],
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
      selectedtest: null,
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
    creerDevoir() {
      this.modalDevoir = true
    },
    get_question() {
      let data = {
        "token": this.$store.state.utilisateur.token,
        "selections": this.ticked
      }
      console.log(this.ticked)
    }
  },
  mounted() {
    var classes = this.$store.state.classe.chapitres
    if (classes == undefined) {
      let data = {
        "classeRef": this.classeRef
      }
      this.$store.dispatch('classe/get_chapitres_with_sections', data)
    }
  },
}
