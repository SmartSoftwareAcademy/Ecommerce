<template>
  <div>
    <v-carousel v-for="item in slider" :key="item.id">
      <v-carousel-item
        :aspect-ratio="6 / 6"
        :src="slide.slider_image"
        v-for="slide in item.slider_products"
        :key="slide.id"
      >
        <v-row class="fill-height" align="center" justify="center">
          <div class="display-2 text-warning pl-5 pr-5 hidden-sm-only">
            <strong>{{ item.slider_text }}</strong>
          </div>
        </v-row>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>
<script>
export default {
  name: "slider",
  props: {
    slider: Array,
  },
  data() {
    return {};
  },
  mounted() {
    console.log(this.slider);
  },
  methods: {},
};
</script>
