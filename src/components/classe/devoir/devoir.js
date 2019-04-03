import axios from 'axios';
export default {
  props: ["chapitreID", "devoirs"],
  components: {},
  name: 'classe_chapitres',
  data() {
    return {
      modalChapitre: false,
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
  },
  methods: {
    creerDevoir() {
      this.modalChapitre = true
    }
  },
  mounted() {
    
  }
}
