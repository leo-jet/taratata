import axios from 'axios';
import quiz from "components/classe/dialogs/quiz/quiz.vue";
import {
  fb,
  classesCollection
} from 'assets/javascript/firebase.js'
export default {
  components: {
    quiz
  },
  computed: {},
  data() {
    return {
      modalQuiz: true,
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
      }],
      devoirs: []
    }
  },
  computed: {
  },
  methods: {
    creerQuiz() {
      this.modalQuiz = true
    },
  },
  async mounted() {
    console.log("Quiz mounting")
    var idClasse = this.$store.state.classe.classe.id
    console.log(idClasse, "aaaaaaaaaaaaaaaaaaaaaaa")
    var chapitresQuery = await classesCollection.doc(idClasse).collection("chapitres").get()
    console.log(chapitresQuery, "bbbbbbbbbbbbbbbbbbbbbbb")
    var chapitres = []
    for (var chapitreDoc of chapitresQuery.docs) {
      if (chapitreDoc.exists) {
        var chapitre = chapitreDoc.data()
        chapitre.id = chapitreDoc.id
        var sectionsQuery = await chapitreDoc.ref.collection("sections").get()
        var sections = []
        console.log(chapitreDoc, "ccccccccccccccccccccccccccc")
        for (var sectionDoc of sectionsQuery.docs) {
          if (sectionDoc.exists) {
            var section = sectionDoc.data()
            section.id = sectionDoc.id
            var devoirsQuery = await sectionDoc.ref.collection("devoirs").get()
            var devoirs = []
            console.log(devoirsQuery, "ddddddddddddddddddddddddddddd")
            for (var devoirDoc of devoirsQuery.docs) {
              if (devoirDoc.exists) {
                var devoir = devoirDoc.data()
                devoir.id = devoirDoc.id
                devoirs.push(devoir)
                console.log(devoirDoc, "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
              }
            }
            section.devoirs = devoirs
            sections.push(section)
          }
        }
        chapitre.sections = sections
        chapitres.push(chapitre)
      }
    }
    this.devoirs = chapitres
  },
  destroyed() {
    console.log("good bye")
  }
};
