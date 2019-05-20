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
      enonce2: "",
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
        "enonce1": this.enonce1,
        "enonce2": this.enonce2,
      }
      this.$store.commit('question/ADD_PROPOSITION', data)
      this.newProposition = false
    }
  },
  mounted() {},
  destroyed() {}
}
