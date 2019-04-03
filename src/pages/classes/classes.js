import axios from 'axios';
import classeDialog from "components/classe/dialogs/classe/classe.vue";
export default {
  components: {
    "classe-dialog":classeDialog
  },
  computed: {
    classes(){
      return this.$store.state.classe.classes
    }, 
    listMatiereOptions(){
      let classes = this.$store.state.classe.classes
      let list = []
      let options = []
      for(var i in classes){
        if(list.indexOf(classes[i].matiere) == -1){
          list.push(classes[i].matiere)
          options.push({
            label: (classes[i].matiere == undefined)? "NA": classes[i].matiere ,
            value: (classes[i].matiere == undefined)? "NA": classes[i].matiere 
          },)
        }
      }
      console.log(options)
      return options
    }, 
    listNiveauOptions(){
      let classes = this.$store.state.classe.classes
      let list = []
      let options = []
      for(var i in classes){
        if(list.indexOf(classes[i].niveau) == -1){
          list.push(classes[i].niveau)
          options.push({
            label: (classes[i].niveau == undefined)? "NA": classes[i].niveau ,
            value: (classes[i].niveau == undefined)? "NA": classes[i].niveau 
          },)
        }
      }
      console.log(options)
      return options
    }
  },
  data() {
    return {
      rows_per_page_options: [0, 0],
      filter: "",
      dialogClasse: false, 
      filterGroupe: [],
      filterMatiere: [], 
      filterNiveau: [], 
      filtrerPrix: {
        min: 0,
        max: 10000
      },
      columns: [{
          name: 'desc',
          required: true,
          label: 'Dessert (100g serving)',
          align: 'left',
          field: 'name',
          sortable: true
        },
        {
          name: 'calories',
          label: 'Calories',
          field: 'calories',
          sortable: true
        },
        {
          name: 'fat',
          label: 'Fat (g)',
          field: 'fat',
          sortable: true
        },
        {
          name: 'carbs',
          label: 'Carbs (g)',
          field: 'carbs'
        },
        {
          name: 'protein',
          label: 'Protein (g)',
          field: 'protein'
        },
        {
          name: 'sodium',
          label: 'Sodium (mg)',
          field: 'sodium'
        },
        {
          name: 'calcium',
          label: 'Calcium (%)',
          field: 'calcium',
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: 'iron',
          label: 'Iron (%)',
          field: 'iron',
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        }
      ],
      visibleColumns: ['desc', 'fat', 'carbs', 'protein', 'sodium', 'calcium', 'iron'],
      separator: 'horizontal',
      selection: 'multiple',
      selected: [
        // initial selection
        {
          name: 'Ice cream sandwich'
        }
      ],
      pagination: {
        rowsPerPage: 0
      },
      paginationControl: {
        rowsPerPage: 3,
        page: 1
      },
      loading: false,
      dark: true,
      selectedSecond: [{
        name: 'Eclair'
      }]
    }
  },
  methods: {
    seeClasse(classe){
      let data = {
        "token": this.$store.state.utilisateur.token, 
        "idClass": classe.idClass, 
        "self": this
      }
      this.$store.dispatch("classe/get_classe", data)
      this.dialogClasse = true
    }, 
    modifier(row) {
      let classe = row.classe
      let next = '/classe/' + classe.idClass
      this.$router.push(next)
    },
    appliquerFiltre(){
      let data = {
        "token": this.$store.state.utilisateur.token, 
        "self": this
      }
      let filtre = ""
      if(this.filterMatiere.length != 0){
        filtre = "matiere__in=" + this.filterMatiere.join()
      }
      if(this.filterMatiere.length != 0){
        filtre = filtre + "&niveaux__in=" + this.filterNiveau.join()
      }
      filtre = filtre +  "&prix__gte=" + this.filtrerPrix.min
      filtre = filtre +  "&prix__lte=" + this.filtrerPrix.max
      data.filter = filtre
      this.$store.dispatch("classe/get_all_classes", data)
    }, 
    get_enseignant_classe(classe) {
      let enseignants = []
      for (var i in classe.enseignants) {
        enseignants.push({
          label: classe.enseignants[i].nom,
          icon: 'portrait'
        })
      }
      return enseignants
    }, 
    aller_en_cours(classe){
      let next = '/cours/' + classe.idClass
      this.$store.commit("classe/GET_CLASSE", classe)
      this.$router.push(next)
    },
    myclasse(idClasse){
      return this.$store.state.utilisateur.classes.indexOf(idClasse) != -1
    },
    async inscription(classe) {
      let formData = new FormData()
      formData.append("username", this.$store.state.utilisateur.username)
      formData.append("idClasse", classe.idClass)
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
    let data = {
      "token": this.$store.state.utilisateur.token,
      "self": this
    }
    this.$store.dispatch("classe/get_all_classes", data)
  },
  destroyed() {
    console.log("good bye")
  }
};
