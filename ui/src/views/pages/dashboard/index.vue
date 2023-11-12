<script>
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

import slider from "@/components/widgets/slider/slider.vue";
import Deals from "@/components/Deals";
import Policy from "../ecommerce/product/parts/Policy.vue";
import FlashSale from "@/components/FlashSale.vue";
import Categories from "./RightSideBar.vue";
import LeftSideCard from "./LeftSideCard.vue";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  page: {
    title: "Home",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: {
    Categories,
    Deals,
    FlashSale,
    LeftSideCard,
    Policy,
    PageHeader,
    slider,
  },
  data() {
    return {
      title: "Home",
      items: [
        {
          text: "Home",
        },
        {
          text: "",
          active: true,
        },
      ],
      inventorydata: [],
      dealsData: [],
      flashData: [],
      topPicks: [],
      newArrivals: [],
      slider: [],
      flash_sale_date: new Date("2023-12-10T00:00:00.000Z"),
      currentPage: 1,
      perPage: 6,
      limit: 6,
      offset: 0,
      totalProducts: 0,
    };
  },
  mounted() {
    this.updateArrays();
  },
  methods: {
    updateArrays() {
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
        .get(window.$http + `stock/?limit=${this.limit}&offset=${this.offset}`)
        .then((response) => {
          this.inventorydata = response.data["results"];
          this.totalProducts = response.data["count"];
          this.dealsData = this.inventorydata.filter((f) => f.is_deal_of_the_day == true);
          this.flashData = this.inventorydata.filter((f) => f.is_flash_sale == true);
          this.topPicks = this.inventorydata
            .filter((f) => f.is_top_pick == true)
            .slice(0, 2);
          this.newArrivals = this.inventorydata
            .filter((f) => f.is_new_arrival == true)
            .slice(0, 1);
          axios.get(window.$http + `store/?limit=1`).then((res) => {
            this.slider = res.data["results"];
            if (this.slider) {
              this.flash_sale_date = this.slider[0].flash_sale_end_date;
            }
          });
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
    handlePageChange(newPage) {
      this.currentPage = newPage;
      this.limit = this.perPage;
      this.offset = (this.currentPage - 1) * this.perPage;
      this.updateArrays();
    },
  },
};
</script>

<template>
  <div class="container-fluid">
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-sm-3 col-md-2 overflow-auto">
        <Categories />
      </div>
      <div class="col-sm-8 col-md-8 col-sm-6 col-md-6 col-sm-3">
        <slider :slider="slider" />
      </div>
      <div class="col-sm-2 col-md-2">
        <LeftSideCard :topPicks="topPicks" />
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 col-sm-12 col-md-6 col-sm-6 col-sm-3 col-md-3">
        <Policy />
      </div>
      <FlashSale
        :flashData="flashData"
        :topPicks="topPicks"
        :newArrivals="newArrivals"
        :flash_sale_date="flash_sale_date"
      />
      <Deals :dealsData="dealsData" />
    </div>
    <div class="row mb-2">
      <v-pagination
        v-if="totalProducts > 1"
        v-model="currentPage"
        :total-visible="3"
        :prev-text="'Previous'"
        :next-text="'Next'"
        :length="Math.ceil(totalProducts / perPage)"
        @input="handlePageChange(currentPage)"
      ></v-pagination>
    </div>
  </div>
</template>
