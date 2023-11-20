<template>
  <v-container>
    <v-row no-gutters>
      <v-col :cols="12">
        <v-card-text class="" tile outlined>
          <v-card-title class="subheading">Deals of the Day</v-card-title>
          <v-divider></v-divider>
          <div class="row">
            <div
              class="col-12 col-md-4 col-sm-6 col-xs-6 text-center"
              v-for="item in dealsData"
              :key="item.id"
            >
              <v-hover v-slot:default="{ hover }" open-delay="200">
                <v-card :elevation="hover ? 16 : 2">
                  <v-img
                    class="white--text align-end"
                    :src="item.product.images[0].image"
                    :aspect-ratio="3 / 3"
                  >
                  </v-img>
                  <v-card-text class="text--primary text-center">
                    <v-card-title class="">{{
                      getFirstTwoWords(item.product.title) + "..."
                    }}</v-card-title>
                    <div class="text-warning">Upto 60% + Extra 10%</div>
                  </v-card-text>

                  <div class="text-center">
                    <router-link
                      :to="{
                        name: 'Product Detail',
                        params: { stockitem: item },
                      }"
                      class="bg-warning"
                      ><v-btn href="#" class="bg-danger" icon outlined> Explore </v-btn>
                    </router-link>
                  </div>
                </v-card>
              </v-hover>
            </div>
          </div>
        </v-card-text>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: {
    dealsData: Array,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    gotProducts() {
      this.$router.push({ name: "Products" });
    },
    getFirstTwoWords(str) {
      // Split the sentence into an array of words
      const words = str.split(" ");
      // Take the first two words
      const firstTwoWords = words.slice(0, 2).join(" ");
      return firstTwoWords;
    },
  },
};
</script>
