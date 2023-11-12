<template>
  <b-container class="overflow-auto bg-warning" max-height="200px">
    <b-scrollspy scroll-y class="overflow-auto" max-height="200px">
      <h3 class="text-danger text-center">
        <v-chip closable prepend-icon="mdi-vuetify" class="bg-danger"
          >HOT&nbsp;<small>Weekly Deals!!</small></v-chip
        >
      </h3>
      <b-row class="overflow-auto" max-height="200px">
        <!-- Content goes here -->
        <v-card
          class="pa-0 mt-2"
          max-width="100%"
          v-for="item in topPicks"
          :key="item.id"
        >
          <v-img :src="item.product.images[0].image" :aspect-ratio="5 / 4"></v-img>
          <v-card-title class="">{{ item.product.title }}</v-card-title>
          <v-card-actions>
            <v-btn color="warning" @click="visitRoute(item)">Shop Now</v-btn>
          </v-card-actions>
        </v-card>
      </b-row>
    </b-scrollspy>
  </b-container>
</template>
<script>
export default {
  props: {
    topPicks: Array,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    visitRoute(item) {
      this.$router.push({
        name: "Products",
        params: { category: item.product.maincategory },
      });
    },
  },
};
</script>
<style>
.scrollable .v-card-text {
  max-height: 200px;
  /* Set a maximum height to enable scrolling */
  overflow-y: auto;
  /* Enable vertical scrolling */
}
</style>
