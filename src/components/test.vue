<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>test</li>
    </ul>

  </div>
</template>

<script>
// import apiConfig from '../serviceAPI.config.js';
export default {
  name: 'test',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
  // ...mapGetters(['user', 'project'])
  },
  mounted(){

  },
  methods:{

  }
}
</script>

<style scoped>

</style>
