<template>
   <v-card>
    <v-card-title>
      Enduro
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Поиск"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="trackers"
      :footer-props="{
        'items-per-page-options': [100, 1000, 10000, -1]
      }"
      @click:row="openDetails"
      :itemsPerPage.sync="options.itemsPerPage"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  async asyncData () {
    const {data} = await axios.get('/mock/enduro.json');
    return {trackers:data};
  },
  data() {
    return {
      search: '',
       headers: [
          { text: 'Serial', align: 'left', sortable: false, value: 'data.serial' },
          { text: 'Device Model', value: 'data.device-model' },
          { text: 'Device Name', value: 'data.device-name' },
          { text: 'Device Platform', value: 'data.device-platform' },
          { text: 'Hardware Version', value: 'data.hardware-version' },
          { text: 'Production Country', value: 'data.production-country' },
      ],
      options: {
        itemsPerPage: 1000,
      },
      products: []
    };
  },

  computed: {
  },

  methods: {
    openDetails(item) {
      this.$router.push({ name: "detail", params: { detailObj: item.data } });
    }
  }
};
</script>
