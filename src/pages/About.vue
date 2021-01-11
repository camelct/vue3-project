<template>
  <div class="title">
    <hello-world msg="你好"></hello-world>
    <p @click="goToDashboard">About Page.</p>
    <p>this.$route.params {{ username }}</p>
    <p>this.$route.query {{ age }}</p>
  </div>
</template>

<script>
import HelloWorld from "../components/HelloWorld.vue";
export default {
  name: "about",
  components: {
    HelloWorld,
  },
  data() {
    return {
      isAuthenticated: false,
    };
  },
  computed: {
    age() {
      return this.$route.query.age;
    },
    username() {
      return this.$route.params.username;
    },
  },
  methods: {
    goToDashboard() {
      if (this.isAuthenticated) {
        this.$router.push("/card");
      } else {
        this.$router.push("/");
      }
    },
  },
};
</script>