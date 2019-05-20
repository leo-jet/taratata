import information from "components/classe/information/information.vue";
import enseignants from "components/classe/enseignants/enseignants.vue";
import chapitres from "components/classe/chapitres/chapitres.vue";
import eleve from "components/classe/eleve/eleve.vue";
import quiz from "components/classe/quiz/quiz.vue";
import axios from 'axios';
import {
  Loading
} from 'quasar'
import {
  fb,
  classesCollection
} from 'assets/javascript/firebase.js'
export default {
  components: {
    information,
    quiz,
    enseignants,
    chapitres,
    eleve
  },
  name: 'classe',
  data() {
    return {
      nom: "",
      dateDebut: "",
      dateFin: "",
      prix: 0
    }
  },
  computed: {
    classe() {
      return this.$store.state.classe.classe
    },
    classeRef() {
      return classesCollection.doc(this.$route.params.idClasse)
    }
  },
  methods: {
    editclasse(data) {
      let url = process.env.API + "/classe/" + this.classe.idClass + '/'
      axios.put(url, data).then((response) => {
          this.$store.commit("classe/init_classe", response.data)
          let message = "Classe bien modifiée!"
          let next = '/classe/' + response.data.idClass
          this.$router.push(next)
          this.$q.notify({
            type: "positive",
            message: message,
          })
        })
        .catch((error) => {
          let message = "Identifiant ou mot de pass incorrect!" + error
          this.$q.notify({
            type: "positive",
            message: message,
          })
        })
    },
    modifier() {
      var self = this
      var info = {
        nom: self.nom,
        dateDebut: self.dateDebut,
        dateFin: self.dateFin,
        prix: self.prix
      }
      this.classeRef.set(info)
        .then(function () {
          console.log("Document modifié: ");
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    },
    creer() {
      var self = this
      this.classeRef.set({
          nom: self.nom,
          dateDebut: self.dateDebut,
          dateFin: self.dateFin,
          prix: self.prix
        })
        .then(function () {
          let next = '/classe/' + self.nom.replace(/ /g, '_')
          self.$router.push(next)
          console.log("Document written with ID: ");
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    },
  },
  mounted() {
    var self = this
    this.classeRef.get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        var docInf = doc.data()
        docInf.id = doc.id
        self.nom = docInf.nom
        self.dateDebut = docInf.dateDebut
        self.dateFin = docInf.dateFin
        self.prix = docInf.prix
        self.$store.commit("classe/init_classe", docInf)
      } else {
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  }
}
