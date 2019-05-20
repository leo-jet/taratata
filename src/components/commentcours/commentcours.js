export default {
  name: "commentcours",
  props: [],
  mounted() {
    var btnFb = document.querySelector(".fb-comments");
    btnFb.setAttribute("data-href", window.location.href);
    this.$nextTick(FB.XFBML.parse())
  },
  computed: {},
  data() {
    return {}
  }
}
