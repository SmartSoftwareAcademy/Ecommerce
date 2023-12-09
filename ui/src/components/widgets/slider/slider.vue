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
    <!-- <div class="col-sm-12">
      <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="4000"
        controls
        indicators
        background="#ababab"
        img-width="1024"
        img-height="480"
        style="text-shadow: 1px 1px 2px #333"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        <b-carousel-slide
          v-for="item in slider"
          :key="item.id"
          :caption="slider.map((x) => x)"
          :text="item.slider_text"
          img-src="https://picsum.photos/1024/480/?image=52"
        ></b-carousel-slide>
      </b-carousel>
    </div>-->
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
