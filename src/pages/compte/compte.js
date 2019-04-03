import information from "components/information/information.vue";
import classes from "components/classes_list/classes.vue";
export default {
  components: {
    information,
    classes
  },
  computed: {
    nb_classe(){
      return this.$store.state.classe.classes.length
    }
  },
  name: 'compte'
}
