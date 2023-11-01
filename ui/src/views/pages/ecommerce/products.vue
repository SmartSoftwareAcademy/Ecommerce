<template>
  <div class="container-fluid p-4">
    <v-alert
      :value="showAlert"
      :type="alert_type"
      @click:close="showAlert = false"
      dismissible
    >
      {{ message }}
    </v-alert>
    <div class="row">
      <div class="col-md-3 col-sm-3 col-xs-12">
        <!-- Show Filters Button -->
        <a @click="toggleFilters()" class="btn btn-default mb-3"
          ><i class="fa fa-filter"></i>
          {{ showFilters ? "Hide Filters" : "Show Filters" }}
        </a>
        <v-card outlined v-if="showFilters">
          <v-card-title>Filters</v-card-title>
          <v-divider></v-divider>
          <a href="#" @click="applyFilter('')" class="btn btn-primary text-white"
            >View All</a
          >
          <template>
            <v-treeview :items="items" :open="open">
              <template v-slot:label="{ item }">
                <a
                  @click="applyFilter(item)"
                  href="#"
                  class="bg-light text-primary p-2 rounded border-1"
                  >{{ item.name }}</a
                >
              </template>
            </v-treeview>
          </template>
          <v-divider></v-divider>
          <v-card-title>Price</v-card-title>
          <v-range-slider
            v-model="range"
            :max="max"
            :min="min"
            :height="10"
            class="align-center"
            dense
          ></v-range-slider>
          <v-row class="pa-2" dense>
            <v-col cols="12" sm="5">
              <v-text-field
                :value="range[0]"
                label="Min"
                outlined
                dense
                @change="$set(range, 0, $event)"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2">
              <p class="pt-2 text-center">TO</p>
            </v-col>
            <v-col cols="12" sm="5">
              <v-text-field
                :value="range[1]"
                label="Max"
                outlined
                dense
                @change="$set(range, 1, $event)"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-card-title>Rating</v-card-title>
          <v-range-slider
            v-model="ratingRange"
            :max="maxrating"
            :min="minRating"
            :height="10"
            class="align-center"
            dense
          ></v-range-slider>
          <v-row class="pa-2" dense>
            <v-col cols="12" sm="5">
              <v-text-field
                :value="ratingRange[0]"
                label="Min"
                outlined
                dense
                @change="$set(ratingRange, 0, $event)"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2">
              <p class="pt-2 text-center">TO</p>
            </v-col>
            <v-col cols="12" sm="5">
              <v-text-field
                :value="ratingRange[1]"
                label="Max"
                outlined
                dense
                @change="$set(ratingRange, 1, $event)"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </div>
      <div class="col-md-9 col-sm-9 col-xs-12">
        <v-breadcrumbs class="pb-0" :items="breadcrums"></v-breadcrumbs>
        <v-row dense>
          <v-col cols="12" sm="8" class="pl-6 pt-6">
            <small
              >Showing {{ filteredProducts.length }} of
              {{ products.length }} products</small
            >
          </v-col>
          <v-col cols="12" sm="4">
            <v-select
              class="pa-0"
              v-model="select"
              :items="options"
              style="margin-bottom: -20px"
              outlined
              dense
            ></v-select>
          </v-col>
        </v-row>

        <v-divider></v-divider>

        <div class="row text-center">
          <div
            class="col-md-3 col-sm-6 col-xs-12"
            v-for="item in filteredProducts"
            :key="item.id"
          >
            <v-hover v-slot:default="{ hover }">
              <v-card class="mx-auto" color="grey lighten-4" max-width="600">
                <v-img
                  v-if="item.product.images.length > 0"
                  class="white--text align-end"
                  :aspect-ratio="6 / 6"
                  :src="
                    item.product.images[0]
                      ? item.product.images[0].image
                      : 'https://placehold.co/600x400/000000/FFFFFF.png'
                  "
                >
                  <v-expand-transition>
                    <div
                      v-if="hover"
                      class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal display-3 white--text"
                      style="height: 100%"
                    >
                      <router-link
                        v-if="hover"
                        :to="{
                          name: 'Product Detail',
                          params: { stockitem: item },
                        }"
                        class="badge badge-pill badge-success"
                        outlined
                        ><v-btn href="#" class="bd-primary" icon>
                          <v-icon class="text-primary">mdi-eye</v-icon>
                        </v-btn>
                      </router-link>
                      <v-btn href="#" class="" @click="addFavorites(item)" icon>
                        <v-icon class="text-warning">mdi-heart</v-icon>
                      </v-btn>
                    </div>
                  </v-expand-transition>
                </v-img>
                <v-card-text class="text-primary">
                  <div>
                    <router-link
                      v-if="hover"
                      :to="{ name: 'Product Detail', params: { stockitem: item } }"
                      style="text-decoration: none"
                      >{{ item.product.title }}</router-link
                    >
                  </div>
                  <div v-if="!item.size">KShs.{{ item.product.price }}</div>
                  <div v-if="item.size">
                    {{ item.size.size }}{{ item.size.unit.name }} KShs.{{
                      item.size.unit_price
                    }}
                  </div>
                </v-card-text>
                <v-card-title
                  class="d-inline-block text-white"
                  v-for="cat in item.product.maincategory.categories"
                  :key="cat.id"
                >
                  <span class="d-inline badge badge-pill bg-warning"
                    ><a @click="applyFilter(cat.name)" href="#" class="text-white">{{
                      cat.name
                    }}</a></span
                  >
                </v-card-title>
              </v-card>
            </v-hover>
          </div>
          <v-pagination v-model="page" :length="pages"></v-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.8;
  position: absolute;
  width: 100%;
}
</style>
<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      page: 1,
      pageSize: 8,
      breadcrums: [
        {
          text: "Home",
          disabled: false,
          href: "/",
        },
        {
          text: "",
          disabled: false,
          href: "/",
        },
        {
          text: "",
          disabled: true,
          href: "/",
        },
      ],
      min: 0,
      max: 100000,
      items: [],
      products: [],
      range: [0, 1000000],
      ratingRange: [0, 5],
      minRating: 0,
      maxrating: 5,
      select: "Popularity",
      options: [
        "Default",
        "Popularity",
        "Relevance",
        "Price: Low to High",
        "Price: High to Low",
      ],
      item: 5,
      quantity: 1,
      color: "",
      size: "",
      message: "Success!",
      showAlert: false,
      alert_type: "success!",
      //filters
      showFilters: true,
    };
  },
  components: {},
  computed: {
    pages() {
      return Math.ceil(this.products.length / this.pageSize);
    },
    startIndex() {
      return (this.page - 1) * this.pageSize;
    },
    endIndex() {
      return this.startIndex + this.pageSize;
    },
    displayedProducts() {
      return this.products.slice(this.startIndex, this.endIndex);
    },
    filteredProducts() {
      return this.products
        .filter((item) => {
          if (!item.size) {
            const price = parseFloat(item.product.price);
            return price >= this.range[0] && price <= this.range[1];
          }
          if (item.size) {
            const price = parseFloat(item.size.unit_price);
            return price >= this.range[0] && price <= this.range[1];
          }
        })
        .slice(this.startIndex, this.endIndex);
    },
  },
  mounted() {
    if (this.$route.params.category) {
      this.breadcrums[1].text = this.$route.params.category.name;
      this.items.push(this.$route.params.category);
      this.updatearrays(this.$route.params.category.name);
    } else {
      this.updatearrays("");
      this.breadcrums[1].text = "products";
    }
  },
  methods: {
    toggleFilters() {
      this.showFilters = !this.showFilters;
      console.log(this.showFilters);
    },
    updatearrays(filter) {
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
        .get(window.$http + `stock?filter=` + filter)
        .then((response) => {
          var cat = this.$route.params.category;
          if (cat != null) {
            this.products = response.data["results"].filter(
              (e) =>
                e.product.maincategory.name === cat.name ||
                e.product.maincategory.categories.some((x) => x.name === cat.name) ||
                e.product.maincategory.categories.some((x) =>
                  x.Subcategories.some((y) => y.name === cat.name)
                )
            );
            console.log(this.products);
          } else {
            this.products = response.data["results"];
            axios.get(window.$http + `categories`).then((response) => {
              var data = response.data["results"];
              data.forEach((item, index) => {
                this.items.push({
                  id: item.id,
                  name: item.name,
                });
                if (data[index].Subcategories) {
                  var subcats = data[index].Subcategories;
                  this.items[index]["children"] = [];
                  subcats.forEach((val) => {
                    this.items[index].children.push({
                      id: val.id,
                      name: val.name,
                    });
                  });
                }
              });
            });
          }
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
    addFavorites(product) {
      if (!localStorage.getItem("user")) {
        this.$router.push({ name: "login" });
        return;
      }
      var price = product.price;
      if (product.discount_price > 0) {
        price = product.discount_price;
        product.price = price;
      }
      var favItem = {
        product: product,
        item_subtotal: price, // cart subtotal
        item_total: price * this.quantity,
      };
      this.$store.dispatch("favorites/addProductTofavorites", favItem);
      this.message = "Success!Item added to Favorites!";
      this.alert_type = "success";
      this.showAlert = true;
      console.log(this.$store.state.favorites);
    },
    applyFilter(item) {
      this.categories = [];
      this.products = [];
      this.items = [];
      if (item) {
        this.breadcrums[1].text = item.name;
        this.updatearrays(item.name);
      } else {
        this.updatearrays("");
      }
    },
  },
};
</script>
