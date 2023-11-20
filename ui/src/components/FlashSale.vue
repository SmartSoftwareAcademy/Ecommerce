<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-sm-6 col-xs-12">
        <v-card>
          <v-img
            :aspect-ratio="6 / 6"
            :src="topItem.product.images[0].image"
            class="white--text align-center"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="350px"
          >
            <h1 class="text-center font-size text-white">Top Picks</h1>
            <div class="text-center">
              <v-btn
                :to="{
                  name: 'Product Detail',
                  params: { stockitem: topItem },
                }"
                class="white--text"
                outlined
                >SHOP NOW</v-btn
              >
            </div>
          </v-img>
        </v-card>
        <!--        </v-hover>-->
      </div>
      <div class="col-md-6 col-sm-6 col-xs-12">
        <v-card>
          <v-img
            :aspect-ratio="6 / 6"
            :src="newItem.product.images[0].image"
            class="white--text align-center"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="350px"
          >
            <h1 class="text-center font-size text-white">New Arrivals</h1>
            <div class="text-center">
              <v-btn
                :to="{
                  name: 'Product Detail',
                  params: { stockitem: newItem },
                }"
                class="white--text"
                outlined
                >SHOP NOW</v-btn
              >
            </div>
          </v-img>
        </v-card>
      </div>
    </div>
    <div class="row">
      <div
        class="col-lg-12 col-sm-12 col-md-6 col-md-3 col-sm-3 flex flex-row flex-column"
      >
        <h3 class="bg-warning p-2 rounded-2">
          Flash Sale
          <p class="badge badge-pill bg-danger d-inline">days:</p>
          <b> {{ days }} </b>
          <p class="badge badge-pill bg-danger d-inline">hours:</p>
          <b> {{ hours }} </b>
          <p class="badge badge-pill bg-danger d-inline">minutes:</p>
          <b> {{ minutes }} </b>
          <p class="badge badge-pill bg-danger d-inline">seconds:</p>
          <b> {{ seconds }} </b>
        </h3>
      </div>
      <div class="col-md-4 col-sm-4 col-xs-12" v-for="item in flashData" :key="item.id">
        <v-card outlined>
          <v-img
            :aspect-ratio="4 / 4"
            :src="item.product.images[0].image"
            class="white--text align-center"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          >
            <h2 class="text-center font-size text-white bg-warning">
              {{ getFirst3Words(item.product.title)
              }}<span v-if="item.size" class="badge badge-pill"
                >{{ item.size.size }}{{ item.size.unit.unit_symbol }}</span
              >
            </h2>
            <div class="text-center mt-2">
              <v-btn
                class="white--text caption bg-danger"
                :to="{
                  name: 'Product Detail',
                  params: { stockitem: item },
                }"
                text
                >SHOP NOW
                <v-icon class="white--text caption">mdi-arrow-right</v-icon></v-btn
              >
            </div>
          </v-img>
        </v-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    flashData: Array,
    newArrivals: Array,
    topPicks: Array,
    flash_sale_date: String,
  },
  data() {
    return {
      endTime: new Date("2023-12-10T00:00:00.000Z"),
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      timerInterval: null,
      newItem: null,
      topItem: null,
    };
  },
  mounted() {
    this.endTime = new Date(this.flash_sale_date + ".000Z");
    setInterval(() => {
      const now = new Date().getTime();
      const distance = this.endTime - now;
      if (this.endTime > now) {
        this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
      }
    }, 1000);
    this.newItem = this.newArrivals[0];
    this.topItem = this.topPicks[0];
    console.log(this.newItem);
  },
  methods: {
    getFirst3Words(str) {
      // Split the sentence into an array of words
      const words = str.split(" ");
      // Take the first two words
      const firstTwoWords = words.slice(0, 3).join(" ");
      return firstTwoWords;
    },
  },
};
</script>
