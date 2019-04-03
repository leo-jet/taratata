import axios from 'axios';
export default {
  props: ["sections", "dialogClasse"],
  components: {},
  name: 'classe_sections',
  data() {
    return {
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
          name: 'intitule',
          label: 'Intitule',
          align: 'left',
          field: 'intitule',
          sortable: true
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
  computed: {},
  methods: {

  },
  mounted() {

  }
}
