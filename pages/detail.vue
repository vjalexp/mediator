<template>
  <v-card class="elevation-0">
    <v-card-actions>
      <v-btn color="blue darken-3" dark fab @click="$router.back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-card-actions>

    <v-list-item three-line>
      <v-list-item-content>
        <v-card-text>
          <p class="display-1 text--primary">{{$route.params.detailObj['serial']}}</p>
          <p><span class="grey--text overline">DEVICE-MODEL:</span> {{$route.params.detailObj['device-model']}}</p>
          <p><span class="grey--text overline">DEVICE-NAME:</span> {{$route.params.detailObj['device-name']}}</p>
          <p><span class="grey--text overline">DEVICE-PLATFORM:</span> {{$route.params.detailObj['device-platform']}}</p>
          <p><span class="grey--text overline">HARDWARE-VERSION:</span> {{ $route.params.detailObj['hardware-version'] }}</p>
          <p><span class="grey--text overline">PRODUCED:</span> {{ $route.params.detailObj['produced'] }}</p>
          <p><span class="grey--text overline">PRODUCTION-COUNTRY:</span> {{ $route.params.detailObj['production-country'] }}</p>
          <p><span class="grey--text overline">QRCODE:</span> {{ $route.params.detailObj['qrcode'] }}</p>
          <p><span class="grey--text overline">SERIAL:</span> {{ $route.params.detailObj['serial'] }}</p>
        </v-card-text>
      </v-list-item-content>

      <v-content>
        <qrcode-vue :value="$route.params.detailObj['qrcode']" size="300" level="M"></qrcode-vue>
      </v-content>
    </v-list-item>

  </v-card>
</template>

<script>
import QrcodeVue from 'qrcode.vue'

export default {
  data: () => ({
    
  }),

  components: {
    QrcodeVue,
  },

};
</script>