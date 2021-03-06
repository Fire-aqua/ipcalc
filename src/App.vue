<template>
  <v-app>
    <div id="nav">
      <router-link to="/">Стартовая страница</router-link> |
      <router-link to="/vtb">Ипотечный калькулятор</router-link>
    </div>
    <router-view />
  </v-app>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(34, 48, 85);
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: rgb(61, 104, 155);

    &.router-link-exact-active {
      color: rgb(210, 15, 42);
    }
  }
}
</style>
