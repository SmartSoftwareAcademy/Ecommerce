<template>
  <div>
    <v-container>
      <v-alert
        :value="showAlert"
        :type="alert_type"
        @click:close="showAlert = false"
        dismissible
      >
        {{ message }}
      </v-alert>
      <div class="row">
        <div class="col-md-5 col-sm-5 col-xs-12">
          <v-carousel>
            <v-carousel-item
              v-for="image in $route.params.stockitem.product.images"
              :src="image.image"
              :key="image.id"
            >
            </v-carousel-item>
          </v-carousel>
        </div>
        <div class="col-md-7 col-sm-7 col-xs-12">
          <v-breadcrumbs class="pb-0" :items="breadcrums"></v-breadcrumbs>
          <div class="pl-6 containers">
            <p class="display-3 mb-0">
              {{ getFirstTwoWords($route.params.stockitem.product.title) }}
            </p>
            <v-card-actions class="pa-0 p-1 bg-light">
              <div v-if="!$route.params.stockitem.size">
                <p
                  class="headline font-weight-light pt-3"
                  v-if="$route.params.stockitem.product.discount_price"
                >
                  KShs.{{ $route.params.stockitem.product.discount_price
                  }}<del style="" class="subtitle-1 font-weight-thin text-danger"
                    >&nbsp;KShs.{{
                      new Intl.NumberFormat().format(
                        $route.params.stockitem.product.retail_price
                      )
                    }}</del
                  >
                </p>
                <p class="headline font-weight-light pt-3 text-warning" v-else>
                  KShs.{{ $route.params.stockitem.product.retail_price }}
                </p>
              </div>
              <div v-else>
                <p
                  class="headline font-weight-light pt-3"
                  v-if="$route.params.stockitem.size.unit_discount_price"
                >
                  KShs.{{ $route.params.stockitem.size.unit_discount_price
                  }}<del style="" class="subtitle-1 font-weight-thin text-danger"
                    >&nbsp;KShs.{{
                      new Intl.NumberFormat().format(
                        $route.params.stockitem.size.retail_price
                      )
                    }}</del
                  >
                </p>
                <p class="headline font-weight-light pt-3 text-warning" v-else>
                  KShs.{{ $route.params.stockitem.size.retail_price }}
                </p>
              </div>
              <v-spacer></v-spacer>
              <v-rating
                v-model="highestreview"
                class=""
                background-color="warning lighten-3"
                color="warning"
                dense
              ></v-rating>
              <span class="body-2 font-weight-thin text-primary">
                {{ highestRatingCount }} Customer Reviews</span
              >
            </v-card-actions>
            <p class="subtitle-1 font-weight-thin">
              {{ $route.params.stockitem.product.title }}
            </p>
            <p class="subtitle-3 font-weight-thin">
              Shipping From:<span class="fa fa-shipping-fast text-warning">
                Official Store by
                <span class="badge badge-info bg-info">{{
                  $route.params.stockitem.product.vendor.name
                }}</span></span
              >
            </p>
            <div class="row">
              <div class="col-sm-6" v-if="$route.params.stockitem.size">
                <p class="title">
                  UNIT PACKAGING: {{ $route.params.stockitem.size.size }}
                  {{ this.$route.params.stockitem.size.unit.unit_symbol }}
                </p>
              </div>
              <div class="row bg-light p-0 m-0">
                <p class="my-2" v-if="stockitem.color">
                  COLOR:{{ $route.params.stockitem.color.color }}
                </p>
              </div>
            </div>
            <p class="title mt-2">QUANTITY</p>
            <v-text-field
              type="number"
              outlined
              style="width: 100px"
              v-model="quantity"
              :value="1"
              :step="1"
              min="1"
              dense
            ></v-text-field>
            <v-btn
              class="warning white--text"
              outlined
              tile
              dense
              @click="addToCart($route.params.stockitem)"
              ><v-icon>mdi-cart</v-icon> ADD TO CART</v-btn
            >
            <v-btn
              class="ml-4 pl-4"
              outlined
              tile
              @click="addFavorites($route.params.stockitem)"
              ><v-icon class="text-secondary">mdi-heart</v-icon>ADD TO FAVOURITES</v-btn
            >
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-xs-12 col-md-12">
          <v-tabs>
            <v-tab>Description</v-tab>
            <v-tab>REVIEWS</v-tab>
            <v-tab-item>
              <p class="pt-10 subtitle-1 font-weight-thin">
                {{ this.$route.params.stockitem.product.description }}
              </p>
            </v-tab-item>
            <v-tab-item>
              <v-list three-line="true" avatar="true" class="overflow-auto">
                <v-list-item-group v-model="item" color="primary">
                  <v-list-item v-for="(item, i) in reviews" :key="i" inactive="true">
                    <v-list-item-avatar class="bg-primary">
                      <v-text class="text-white">{{ item.user.username }}</v-text>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title v-html="item.user.username"></v-list-item-title
                      ><v-rating
                        v-model="item.rating"
                        class=""
                        background-color="warning lighten-3"
                        color="warning"
                        dense
                      ></v-rating>
                      <v-list-item-subtitle v-html="item.text"></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-tab-item>
          </v-tabs>
          <v-card-text class="pa-0 pt-4" tile outlined>
            <p class="subtitle-1 font-weight-light pt-3 text-center">
              YOU MIGHT ALSO LIKE
            </p>
            <v-divider></v-divider>
            <div class="row text-center">
              <div
                class="col-md-3 col-sm-4 col-xs-12 text-center"
                v-for="product in relatedProducts"
                :key="product.id"
              >
                <v-hover v-slot:default="{ hover }" open-delay="200">
                  <v-card :elevation="hover ? 16 : 2">
                    <v-img
                      class="white--text align-end"
                      :aspect-ratio="6 / 6"
                      :src="product.images[0].image"
                    >
                      <v-card-title
                        class="text-danger d-inline-block mt-2"
                        v-for="cat in product.maincategory.categories"
                        :key="cat.id"
                      >
                        {{ cat.name }}</v-card-title
                      >
                    </v-img>

                    <v-card-text class="text--primary text-center">
                      <div v-if="$route.params.stockitem.size">
                        <p
                          class="badge badge-pill bg-info"
                          v-if="
                            $route.params.stockitem.size.unit_dicount_retail_price > 0
                          "
                        >
                          {{
                            (
                              ((parseFloat($route.params.stockitem.size.retail_price) -
                                parseFloat(
                                  $route.params.stockitem.size.unit_dicount_retail_price
                                )) /
                                parseFloat($route.params.stockitem.size.retail_price)) *
                              100
                            ).toFixed(2)
                          }}
                        </p>
                        <p class="badge badge-pill bg-info" v-else>
                          Upto 2 % Extra Discount
                        </p>
                      </div>
                      <div v-else>
                        <p
                          class="badge badge-pill bg-info"
                          v-if="product.discount_price > 0"
                        >
                          Upto
                          {{
                            (
                              ((product.retail_price - product.discount_price) /
                                product.retail_price) *
                              100
                            ).toFixed(2)
                          }}% Extra Discount
                        </p>
                        <p class="badge badge-pill bg-info" v-else>
                          Upto 2 % Extra Discount
                        </p>
                      </div>
                      <div>{{ getFirstTwoWords(product.title) }}</div>
                    </v-card-text>

                    <div class="text-center">
                      <v-btn class="ma-2" outlined color="info"> Explore </v-btn>
                    </div>
                  </v-card>
                </v-hover>
              </div>
            </div>
          </v-card-text>
        </div>
      </div>
    </v-container>
    <v-card class="accent">
      <v-container>
        <v-row no-gutters>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row>
              <v-col class="col-12 col-sm-3 pr-4 hidden-sm-only" align="right">
                <v-icon class="display-2">mdi-truck</v-icon>
              </v-col>
              <v-col class="col-12 col-sm-9 pr-4">
                <h3 class="font-weight-light">FREE SHIPPING & RETURN</h3>
                <p class="font-weight-thin">Free Shipping over $300</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row>
              <v-col class="col-12 col-sm-3 pr-4" align="right">
                <v-icon class="display-2">mdi-cash-usd</v-icon>
              </v-col>
              <v-col class="col-12 col-sm-9 pr-4">
                <h3 class="font-weight-light">MONEY BACK GUARANTEE</h3>
                <p class="font-weight-thin">30 Days Money Back Guarantee</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row>
              <v-col class="col-12 col-sm-3 pr-4" align="right">
                <v-icon class="display-2">mdi-headset</v-icon>
              </v-col>
              <v-col class="col-12 col-sm-9 pr-4">
                <h3 class="font-weight-light">020-800-456-747</h3>
                <p class="font-weight-thin">24/7 Available Support</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<script>
//import { mapActions } from 'vuex';
//import cart from '@/state/modules/cart';
import axios from "@/Axiosconfig";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      rating: 4.5,
      breadcrums: [
        {
          text: "Home",
          disabled: false,
          href: "/",
        },
        {
          text: this.$route.params.stockitem.product.maincategory.name,
          disabled: false,
          href: "/",
        },
        {
          text: this.getFirstTwoWords(this.$route.params.stockitem.product.title),
          disabled: true,
          href: "/",
        },
      ],
      item: 5,
      reviews: [
        {
          user: "Kelly",
          title: "Lorem ipsum dolor",
          rating: 4,
          subtitle:
            "<span class='text--primary'>Britta Holt</span> &mdash; Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        },
      ],
      product: null,
      stockitem: this.$route.params.stockitem,
      quantity: 1,
      relatedProducts: [],
      size: "",
      color: "",
      sizes: [],
      colors: [],
      message: "Operation successful!",
      alert_type: "error",
      showAlert: false,
      highestreview: 1,
    };
  },

  computed: {
    highestRatingCount() {
      const highestRating = Math.max(...this.reviews.map((review) => review.rating));
      const highestRatingReviews = this.reviews.filter(
        (review) => review.rating === highestRating
      );
      return highestRatingReviews.length;
    },
  },
  mounted() {
    this.stockitem = this.$route.params.stockitem;
    this.updatearrays();
  },
  methods: {
    updatearrays() {
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
        .get(`products/${this.$route.params.stockitem.product.id}/`)
        .then((response) => {
          this.relatedProducts = response.data.related_products;
          axios
            .get(`reviews?sku=${this.$route.params.stockitem.sku}`)
            .then((response) => {
              if (response.data["results"].length > 0) {
                this.reviews = response.data["results"];
                const highestRating = Math.max(
                  ...this.reviews.map((review) => review.rating)
                );
                this.highestreview = this.reviews.filter(
                  (review) => review.rating === highestRating
                )[0].rating;
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
    getFirstTwoWords(str) {
      // Split the sentence into an array of words
      const words = str.split(" ");
      // Take the first two words
      const firstTwoWords = words.slice(0, 3).join(" ");
      return firstTwoWords;
    },
    addToCart(item) {
      if (!sessionStorage.getItem("user")) {
        this.$router.push({ name: "login" });
        return;
      }
      var retail_price = 0;
      if (item.size != null) {
        console.log("Has size...");
        if (item.size.unit_dicount_retail_price > 0) {
          retail_price = item.size.unit_dicount_retail_price;
          item.product.retail_price = retail_price;
          item.size.retail_price = retail_price;
        } else {
          retail_price = item.size.retail_price;
          item.product.retail_price = retail_price;
        }
      } else {
        if (item.product.discount_price > 0) {
          retail_price = item.product.discount_price;
          item.product.retail_price = retail_price;
        } else {
          retail_price = item.product.retail_price;
        }
      }
      var cartItem = {
        user: JSON.parse(sessionStorage.user).id,
        product: item.product,
        size: item.size,
        stock: item.id,
        color: item.color,
        quantity: this.quantity,
        item_subtotal: retail_price, // cart subtotal
        tax: 0.0, // tax
        item_total: retail_price * this.quantity,
        retail_price: retail_price,
      };
      axios
        .post(`cart/`, cartItem)
        .then((response) => {
          this.$store.dispatch("cart/addProductToCart", cartItem);
          this.message = response.data.message.toString();
          this.alert_type = response.data.icon;
          this.showAlert = true;
        })
        .catch((error) => {
          this.message = error.toString();
          this.alert_type = "error";
          this.showAlert = true;
        });
    },
    addFavorites(item) {
      if (!sessionStorage.getItem("user")) {
        this.$router.push({ name: "login" });
        return;
      }
      var retail_price = 0;
      if (item.size) {
        if (item.unit_discount_price > 0) {
          retail_price = item.unit_discount_price;
          item.product.retail_price = retail_price;
          item.size.retail_price = retail_price;
        } else {
          retail_price = item.size.retail_price;
        }
      } else {
        if (item.product.discount_price > 0) {
          retail_price = item.product.discount_price;
          item.product.retail_price = retail_price;
        } else {
          retail_price = item.product.retail_price;
        }
      }
      var favItem = {
        product: item.product,
        item_subtotal: retail_price, // cart subtotal
        item_total: retail_price * this.quantity,
      };
      this.$store.dispatch("favorites/addProductTofavorites", favItem);
      this.message = "Success!Item added to Favorites!";
      this.alert_type = "success";
      this.showAlert = true;
    },
  },
};
</script>
