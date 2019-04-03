import chapitres from "components/classe/chapitres/chapitres.vue";
export default {
  props: ["dialogClasse"],
  components: {
    chapitres
  },
  name: 'classe_dialog',
  data() {
    return {}
  },
  computed: {
    classe() {
      return this.$store.state.classe.classe
    },
    chapitres() {
      return this.$store.state.question.chapitres
    },
  },
  methods: {
    fermer() {
      this.$emit("update:dialogClasse", false)
    },
    async inscription() {
      let formData = new FormData()
      formData.append("username", this.$store.state.utilisateur.username)
      formData.append("idClasse", this.classe.idClass)
      let data = {
        "token": this.$store.state.utilisateur.token,
        "self": this,
        "formData": formData
      }
      try {
        let promiseInscription = await this.$store.dispatch('classe/inscription_classe', data)
        promiseInscription.then((response) => {
          console.log(response)
        })
      } catch (e) {
        let erreur = e.data.data
        if (erreur.problemeSolde == true) {
          let message = "il vous manque " + erreur.reste + " FCFA dans votre solde Homeschool - Cameroon pour finaliser votre inscription à ce cours! Voulez-vous créditer votre compte?"
            this.$q.dialog({
              title: 'Erreur',
              message: message,
              ok: {
                push: true,
                color: "positive",
                label: 'Crediter'
              },
              cancel: {
                push: true,
                color: 'negative',
                class: "",
                label: 'Non'
              }
            }).then(() => {
              this.$q.notify('Agreed!')
            }).catch(() => {
              this.$q.notify('Disagreed...')
            })
        }
      }
    }
  },
  mounted() {
    if (window.MathJax) {
      window.MathJax.Ajax.config.path["mhchem"] =
        "https://cdnjs.cloudflare.com/ajax/libs/mathjax-mhchem/3.3.2";
      window.MathJax.Hub.Config({
        TeX: {
          extensions: ["[mhchem]/mhchem.js"],
        }
      })
      MathJax.Hub.Queue([
        'Typeset',
        window.MathJax.Hub,
        this.$refs.descriptionDialog
      ])
    }
  }
}
