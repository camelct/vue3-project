<template>
  <h2 class="title">
    nav-bar
    <span class="name">123</span>
  </h2>
  <div class="nav">
    <router-link to="/"> Home </router-link>
    <router-link to="/about/大帅哥?age=123"> About </router-link>
    <router-link to="/card"> Card </router-link>
    <router-link to="/todo"> TODO </router-link>
  </div>
  <router-view />
</template>

<script>
export default {
  components: {},
};
</script>

<style scoped>
.title {
  color: red;
}

.title .name {
  color: blue;
}
</style>