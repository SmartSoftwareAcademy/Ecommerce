<script>
import Swal from "sweetalert2";
import axios from "@/Axiosconfig";
export default {
  data() {
    return {
      orderData: [],
      baseurl: "",
    };
  },
  mounted() {
    this.updatearray();
    this.baseurl = window.ref;
  },
  methods: {
    updatearray() {
      Swal.fire({
        title: "Please Wait !",
        html: "Loading data...", // add html attribute if you want or remove
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });

      axios
        .get(`top-products`)
        .then((response) => {
          // JSON responses are automatically parsed.
          this.orderData = response.data;
          Swal.close();
        })
        .catch((e) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "" + e,
            showConfirmButton: true,
          }).then((e) => {
            Swal.close(e);
          });
        });
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

<template>
  <div class="card">
    <div class="card-body">
      <div class="row align-items-center">
        <div class="col-sm-12">
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
            <!-- Text slides with image -->
            <b-carousel-slide
              v-for="product in orderData"
              :key="product.id"
              :caption="product.product__title"
              text="Nulla vitae elit libero, a pharetra augue mollis interdum."
              img-src="https://picsum.photos/1024/480/?image=52"
            ></b-carousel-slide>
          </b-carousel>
        </div>
      </div>
      <div class="float-end">
        <b-dropdown
          right
          toggle-class="text-reset p-0"
          variant="white"
          menu-class="dropdown-menu-end"
        >
          <template v-slot:button-content>
            <span class="fw-semibold">Sort By:</span>
            <span class="text-muted">
              Yearly
              <i class="mdi mdi-chevron-down ms-1"></i>
            </span>
          </template>
          <a class="dropdown-item" href="#">Monthly</a>
          <a class="dropdown-item" href="#">Yearly</a>
          <a class="dropdown-item" href="#">Weekly</a>
        </b-dropdown>
      </div>
      <h4 class="card-title mb-4 mt-2">Top Selling Products</h4>
      <div
        class="row align-items-center no-gutters mt-3"
        v-for="product in orderData"
        :key="product.index"
      >
        <div class="col-sm-12">
          <p class="text-truncate mt-1 mb-0">
            <i class="mdi mdi-circle-medium text-secondary me-2"></i>
            {{ product.product__title }}
          </p>
        </div>
        <div class="col-sm-12">
          <b-progress
            :value="product.total_sales"
            variant="warning"
            class="mt-1"
            height="6px"
          ></b-progress>
        </div>
      </div>
      <!-- end row-->
    </div>
    <!-- end card-body-->
  </div>
  <!-- end card-->
</template>
