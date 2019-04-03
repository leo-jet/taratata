import axios from 'axios';
import propositionqcm from "components/classe/propositionqcm/propositionqcm.vue";
export default {
  props: ["addQuestion"],
  components: {
    propositionqcm
  },
  name: 'classe_dialog_question',
  data() {
    return {
      enonce: "",
      solution: false,
    }
  },
  methods: {
    fermer() {
      this.$emit("update:addQuestion", false)
    },
    creerProposition() {
      let data = {
        "enonce": this.enonce,
        "solution": this.solution,
        "idQuestion": this.$store.state.question.question.idQuestion,
        "url": process.env.API + "/proposition/",
        "token": this.$store.state.utilisateur.token
      }
      this.$store.dispatch('question/creer_proposition', data)
      this.$emit("update:addQuestion", false)
    }
  },
  mounted() {},
  destroyed() {}
}
