import axios from 'axios';
export default {
  props: ["modalDevoir"],
  components: {},
  name: 'classe_dialog_devoir',
  data() {
    return {
      enseignant: null,
      dateDebut: "",
      dateFin: "",
      titre: "",
      consigne: "",
      nombreEssai: 1,
      section: "",
      classe: "",
      chapitre: "",
      correction: false, 
    }
  },
  computed: {
    classes() {
      return this.$store.state.question.classes
    },
    chapitres() {
      return this.$store.state.question.chapitres
    },
  },
  methods: {
    classeChange(idClass) {
      console.log(idClass)
      let data = {
        "token": this.$store.state.utilisateur.token,
        "idClass": idClass
      }
      this.$store.dispatch('question/get_chapitres_classe_select', data)
    },
    creerDevoir() {
      let debut = this.dateDebut.split(' ')[0]
      let fin = this.dateFin.split(' ')[0]
      let questions = this.$store.state.quiz.questions
      let numeroDesQuestions = ""
      for(var i in questions){
        numeroDesQuestions = questions[i].idQuestion + ";" + numeroDesQuestions 
      }
      let data = {
        "idSection": this.section,
        "idClasse": this.classe,
        "idChapitre": this.chapitre,
        "consignes": this.consigne,
        "titre": this.titre,
        "correction": this.correction,
        "dateFin": fin.replace(/\//g, '-'),
        "dateDebut": debut.replace(/\//g, '-'),
        "numeroDesQuestions": numeroDesQuestions,
        "nombreEssai": this.nombreEssai,
        "token": this.$store.state.utilisateur.token
      }
      console.log(data)
      this.$store.dispatch('quiz/creer_devoir', data)
      this.fermer()
    },
    chapitreChange(idChapitre) {
      let data = {
        "token": this.$store.state.utilisateur.token,
        "idChapitre": idChapitre
      }
      this.$store.dispatch('question/get_chapitre_sections_select', data)
    },
    fermer() {
      this.$emit("update:modalDevoir", false)
    },
  },
  mounted() {
    let data = {
      "token": this.$store.state.utilisateur.token,
    }
    this.$store.dispatch('question/get_classe_select', data)
  }
}
