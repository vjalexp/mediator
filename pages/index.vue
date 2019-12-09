<template>
  <v-container>
    <h4>Кол-во произведенных товаров по месяцам (тыс.шт.)</h4>
    <router-chart v-if="showLine"></router-chart>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      showLine: false
    };
  },
  mounted() {
    this.showLine = true;
  }
};
</script>