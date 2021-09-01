<template>
  <RepoList />
</template>

<script>
import RepoList from "./components/RepoList.vue";

export default {
  name: "App",
  components: {
    RepoList,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  width: 100vw;
  height: 100vh;
  background-image: url("./assets/background2.jpeg");
  background-size: cover;
  position: relative;
}
//overLay layer
#app::after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgb(0 0 0 / 75%);
}
</style>
