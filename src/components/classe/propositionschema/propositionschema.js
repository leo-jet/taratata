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
      numero: "",
      annotation: "",
      newProposition: false
    }
  },
  computed: {
    propositions() {
      return this.$store.state.question.propositions
    }
  },
  methods: {
    fermer() {
      this.newProposition = false
    },
    deleteProposition(index){
      this.$store.commit('question/DELETE_PROPOSITION', index)
    },
    creerProposition() {
      let data = {
        "numero": this.numero,
        "reponse": this.annotation,
      }
      this.$store.commit('question/ADD_PROPOSITION', data)
      this.newProposition = false
    }
  },
  mounted() {
  },
  destroyed() {
  }
}
