<template>
  <div>
    Данное приложение - результат выполнения тестового задания. Перейдите на страницу "Ипотечный калькулятор", чтобы изучить его.
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {}
</script>
