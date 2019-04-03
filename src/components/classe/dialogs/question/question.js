import axios from 'axios';
import propositionqcm from "components/classe/propositionqcm/propositionqcm.vue";
import propositionrelationelle from "components/classe/propositionrelationelle/propositionrelationelle.vue";
import propositionschema from "components/classe/propositionschema/propositionschema.vue";
export default {
  props: ["modalQuestion"],
  components: {
    propositionqcm,
    propositionrelationelle,
    propositionschema
  },
  name: 'classe_dialog_question',
  computed: {
    classes() {
      return this.$store.state.question.classes
    },
    chapitres() {
      return this.$store.state.question.chapitres
    },
    sections() {
      return this.$store.state.question.sections
    },
    question() {
      return this.$store.state.question.question
    },
    propositions() {
      return this.$store.state.question.propositions
    }
  },
  data() {
    return {
      classe: null,
      chapitre: null,
      section: null,
      types: [{
          value: "qcm",
          label: "Question à choix multiples"
        },
        {
          value: "qcr",
          label: "Question à complément relationnel"
        },
        {
          value: "qroc",
          label: "Question à réponse ouverte et courte"
        },
        {
          value: "qr",
          label: "Question relationnelle"
        },
        {
          value: "ci",
          label: "Choix de l'intrus"
        },
        {
          value: "qru",
          label: "Question à réponse unique"
        },
        {
          value: "schema",
          label: "Annotation de schéma"
        }
      ],
      type: null,
      numero: 1,
      image: "",
      enonce: "",
      explication: "",
      addQuestion: false,
    }
  },
  methods: {
    fermer() {
      this.$emit("update:modalQuestion", false)
    },
    addFiles(files) {
      this.image = files[0]
    },
    classeChange(idClass) {
      let data = {
        "token": this.$store.state.utilisateur.token,
        "idClass": idClass
      }
      this.$store.dispatch('question/get_chapitres_classe_select', data)
    },
    chapitreChange(idChapitre) {
      let data = {
        "token": this.$store.state.utilisateur.token,
        "idChapitre": idChapitre
      }
      this.$store.dispatch('question/get_chapitre_sections_select', data)
    },
    sectionChange(idSection) {
      let data = {
        "token": this.$store.state.utilisateur.token,
        "idSection": idSection
      }
      this.$store.dispatch('question/get_chapitres_classe_select', data)
    },
    creerQuestion() {
      let data = {
        "idSection": this.section,
        "enonce": this.enonce,
        "explication": this.explication,
        "numero": this.numero,
        "type": this.type,
        "image": (this.$refs.image == undefined) ? null : this.$refs.image.files[0],
        "token": this.$store.state.utilisateur.token
      }
      this.$store.dispatch('question/creer_question', data)
    },
    clickAddQuestion() {
      this.addQuestion = true
    }
  },
  mounted() {
    let data = {
      "token": this.$store.state.utilisateur.token,
    }
    this.$store.dispatch('question/get_classe_select', data)
  },
  destroyed() {
    this.$store.commit('question/INIT_QUESTION')
  }
}
