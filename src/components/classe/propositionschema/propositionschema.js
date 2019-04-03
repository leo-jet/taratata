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
      annotation: "" 
    }
  },
  methods: {
    fermer() {
      this.$emit("update:addQuestion", false)
    },
    creerProposition() {
      let data = {
        "numero": this.numero,
        "reponse": this.annotation,
        "idQuestion": this.$store.state.question.question.idQuestion,
        "url": process.env.API + "/propositionschema/",
        "token": this.$store.state.utilisateur.token
      }
      this.$store.dispatch('question/creer_proposition', data)
      this.$emit("update:addQuestion", false)
    }
  },
  mounted() {
  },
  destroyed() {
  }
}
