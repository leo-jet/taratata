import chapitres from "components/classe/chapitres/chapitres.vue";
import cardprofil from "components/cardProfil/cardprofil.vue";
import cardchapitre from "components/cardChapitre/cardchapitre.vue";
import infogroup from "components/infogroup/infogroup.vue";
import introcours from "components/introcours/introcours.vue";
import commentcours from "components/commentcours/commentcours.vue";
import videolive from "components/videolive/videolive.vue";
import {
  classesCollection,
  utilisateursCollection
} from 'assets/javascript/firebase.js'
export default {
  components: {
    chapitres,
    cardprofil,
    cardchapitre,
    infogroup,
    introcours,
    commentcours,
    videolive
  },
  name: 'classe_detail',
  data() {
    return {
      classe: null,
      chapitres: [],
      columns: [],
      url: "https://homeschool-cameroon.ga/"
    }
  },
  computed: {
    classeRef() {
      return classesCollection.doc(this.$route.params.idClasse)
    },
    user() {
      return this.$store.state.utilisateur.utilisateur
    },
    maclasse() {
      return (this.user == undefined)? false:this.user.classes.indexOf(this.$route.params.idClasse) != -1
    }
  },
  methods: {
    fermer() {},
    async inscription() {
      if (this.user == undefined) {
        alert("Veiller vous connecter ou vous enregistrer")
      } else {
        var solde = this.user.solde - this.classe.prix
        if (solde < 0) {
          alert("Veillez recharger votre compte")
        } else {
          await utilisateursCollection.doc(this.user.email).collection("classes").doc(this.$route.params.idClasse).set(this.classe)
          await utilisateursCollection.doc(this.user.email).update({
            solde: solde
          })
          this.$store.dispatch("utilisateur/get_user", {email: this.user.email})
          alert("Good")
        }
      }
    }
  },
  async mounted() {
    var classe = await this.classeRef.get()
    console.log(classe)
    if (classe.exists == true) {
      this.classe = classe.data()
      console.log(this.classe)
    }
    var chapQuery = await this.classeRef.collection("chapitres").get()
    console.log(chapQuery)
    if (chapQuery.empty == false) {
      var chapitres = []
      for (var chap of chapQuery.docs) {
        var c = chap.data()
        c.id = chap.id
        c.sections = []
        console.log(c)
        var sectionQuery = await chap.ref.collection("sections").get()
        if (sectionQuery.empty == false) {
          for (var sectionDoc of sectionQuery.docs) {
            if (sectionDoc.exists == true) {
              var section = sectionDoc.data()
              section.id = sectionDoc.id
              c.sections.push(section)
            }
          }
        }
        chapitres.push(c)
      }
      this.chapitres = chapitres
      console.log(chapitres)
    }
    var btnFb = document.querySelector(".fb-like");
    btnFb.setAttribute("data-href", window.location.href);
    this.$nextTick(FB.XFBML.parse())
  }
}
