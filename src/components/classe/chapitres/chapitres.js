import axios from 'axios';
import chapitre from "components/classe/dialogs/chapitre/chapitre.vue";
import sectionChapitre from "components/classe/dialogs/section/section.vue";
import devoir from "components/classe/devoir/devoir.vue";
import sections from "components/classe/section/section.vue";
export default {
  components: {
    chapitre, 
    devoir,
    sections,
    sectionChapitre
  },
  name: 'classe_chapitres',
  props: ["dialogClasse"],
  data() {
    return {
      modalChapitre: false,
      modalSection: false,
      idChapitre: null, 
      rows_per_page_options: [0, 0],
      filter: "",
      columns: [{
          name: 'numero',
          required: true,
          label: '#',
          align: 'left',
          field: 'numero',
          sortable: true
        },
        {
          name: 'titre',
          label: 'Titre',
          align: 'left',
          field: 'titre',
          sortable: true
        },
        {
          name: 'dateDebut',
          label: 'Date de debut',
          align: 'left',
          field: 'dateDebut',
          sortable: true
        },
        {
          name: 'dateFin',
          label: 'Date de fin',
          align: 'left',
          field: 'dateFin'
        },
        {
          label: 'Action',
          align: 'left',
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
    chapitres(){
      return this.$store.state.classe.chapitres
    },
    classe(){
      return this.$store.state.classe.classe
    },
  },
  methods: {
    creerChapitre(){
      this.modalChapitre = true
    }, 
    creerSection(idChapitre){
      console.log("hello world")
      this.modalSection = true
      this.idChapitre = idChapitre
    }
  },
  mounted() {
    let data = {
      "token": this.$store.state.utilisateur.token, 
      "idClass": this.classe.idClass, 
      "self": this
    }
    this.$store.dispatch('classe/get_chapitres_classe', data)
  }
}
