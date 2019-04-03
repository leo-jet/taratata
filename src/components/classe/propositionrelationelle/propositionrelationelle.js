import axios from 'axios';
import propositionqcm from "components/classe/propositionqcm/propositionqcm.vue";
export default {
  props: ["modalQuestion"],
  components: {
    propositionqcm
  },
  name: 'classe_dialog_question',
  data() {
    return {
      enonce1: "",
      enonce2: "" 
    }
  },
  methods: {
    
  },
  mounted() {
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*"
    axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true
    axios.defaults.headers.common['Authorization'] = "JWT " + this.$store.state.utilisateur.token
    axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'
  },
  destroyed() {
  }
}
