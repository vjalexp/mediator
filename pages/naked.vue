<template>
  <div>
    <v-dialog v-model="currentBike.opened" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card class="elevation-0">
        <v-toolbar dark color="accent">
          <v-btn icon dark @click="currentBike.opened = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Bike Details</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list-item three-line>
          <v-list-item-content>
            <v-card-text>
              <div v-for="(value, key) in currentBike.item.data" :key="key">
                <p><span class="grey--text overline">{{key}}:</span> {{ value }}</p>
                <p v-if="key=='qrcode'">
                  <qrcode-vue :value="value" size="300" level="M"></qrcode-vue>
                </p>
              </div>
            </v-card-text>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-dialog>


    <v-card>
      <v-card-title>
        Naked Bike
        <v-spacer></v-spacer>
        <v-text-field
          :value="itemsPerPage"
          label="Число записей на странице"
          type="number"
          min="-1"
          max="15"
          @input="itemsPerPage = parseInt($event, 10)"
          append-icon="mdi-numeric"
          hide-details
        ></v-text-field>
		
        <v-spacer></v-spacer>
		
	    <v-text-field
          :value="searchDelay" 
          @input="searchDelay = searchDebounce($event)"
          append-icon="mdi-magnify"
          label="Поиск"
          hide-details
        ></v-text-field>
      </v-card-title>

      <div class="text-center pl-4 pr-4 pt-2 pb-2">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>

      <v-data-table
        :headers="headers"
        :items="filteredBikes"
        @click:row="openModalDetails"
        :loading="loading"
        :search="searchComplete"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        @page-count="pageCount = $event"
        :fixed-header="true"
        class="elevation-1"
      ></v-data-table>

      <div class="text-center pl-4 pr-4 pt-2 pb-8">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>

    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import QrcodeVue from "qrcode.vue";
import virtualList from "vue-virtual-scroll-list";

export default {
  components: {
    virtualList,
    QrcodeVue
  },

  beforeMount() {
    this.getQty();
    this.repeatChunksLoad();
  },

  data() {
    return {
      currentBike: {
        opened: false,
        item: {}
      },

      loading: true,
	  searchDelay: "",
      searchComplete: "",
      page: 1,
      pageCount: 0,
      itemsPerPage: 1000,
      headers: [
        { text: "Serial", align: "left", sortable: true, value: "data.serial" },
        { text: "Device Name", sortable: false, value: "data.device-name" },
        { text: "Hardware Version", sortable: false, value: "data.hardware-version" }
      ],
      bikes: [],
      bikeOffset: 0,
      bikeLimit: 1000,
      bikeQty: 0
    };
  },

  computed: {
    filteredBikes() {
      var bik = [...this.bikes];
      if (this.search && this.search.length > 1) {
        bik = bik.filter(bike => {
          var regPhrase = new RegExp(this.search, 'i');
          return regPhrase.test(bike.data.serial);
        });
      }
      return bik;
    }
  },

  methods: {
	delaySearch(ev) {
      var promise = new Promise(function(resolve, reject) {
        window.setTimeout(function() {
          resolve(ev);
        }, 4000);
      });
      return promise;
    },
    
    searchDebounce(myevent) {
      this.delaySearch(myevent).then((complete) => {
        this.searchComplete = complete;
      });
      return this.searchComplete;
    },
	
    getQty() {
      axios.get("/api/bike?qty=1").then(response => {
        this.bikeQty = response.data;
      });
    },

    repeatChunksLoad() {
      this.loading = true;
      axios
        .get("/api/bike?limit=" + this.bikeLimit + "&offset=" + this.bikeOffset).then(response => {
          this.loading = false;
          this.bikes = [...this.bikes, ...response.data];
          this.bikeOffset = this.bikeOffset + this.bikeLimit;
          if (this.bikeOffset < this.bikeQty.qty) {
            this.loading = false;
            this.repeatChunksLoad();
          }
        });
      return;
    },

    openModalDetails(item) {
      this.currentBike.opened = true;
      this.currentBike.item = item;
    }
  }
};
</script>
