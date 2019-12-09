<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-card class="mx-auto elevation-0" max-width="400">
        <v-list dense>
          <v-list-item-group
            color="indigo"
          >
            <v-list-item v-for="item in productItems" :key="item" :to="item">
              <v-list-item-content>
                <v-list-item-title class="text-capitalize" v-text="item"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <nuxt-link to="/" text="true" style="width:500px;color:#fff;text-decoration:none">
        <v-toolbar-title class="ml-0 pl-4">
          <span class="hidden-sm-and-down">База произведенных товаров</span>
        </v-toolbar-title>
      </nuxt-link>
    </v-app-bar>

    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      fproduct: "",
      fparam: "",
      fvalue: "",
      drawer: null,
      productItems: [],
      customSortOptions: [
        'device model',
        'device name',
        'device platform',
        'hardware version',
        'production country',
        'serial',
        'slot1 / slot2 / IMEI',
      ],
    };
  },

  mounted() {
    axios.get("/mock/list.json").then(response => {
      this.productItems = response.data;
    });
  },

  methods: {
    filterAll() {
      this.$router.push({ name: "filter", params: { filterProduct: this.fproduct, filterParam: this.fparam, filterValue: this.fvalue } });
    },
  },
};
</script>
