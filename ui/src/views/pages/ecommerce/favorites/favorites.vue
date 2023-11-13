<template>
  <div class="container mb-16 pb-16">
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="form-group">
        <button class="btn btn-danger uil uil-cancel" @click="clearfavorites()">
          Clear Favorites
        </button>
      </div>
    </div>
    <div class="row" v-if="favoritesItems.items.length > 0">
      <div class="col-xl-8">
        <div
          class="card border shadow-none"
          v-for="(item, index) in favoritesItems.items"
          :key="item.product.id"
        >
          <div class="card-body">
            <div class="media border-bottom pb-3">
              <div class="me-4">
                <img :src="item.product.images[0].image" alt class="avatar-lg" />
              </div>
              <div class="media-body align-self-center overflow-hidden">
                <div>
                  <h5 class="text-truncate font-size-16">
                    <router-link
                      :to="{
                        name: 'Product Detail',
                        params: {
                          product: item.product,
                          category: item.product.maincategory,
                        },
                      }"
                      class="text-dark"
                      >{{ item.product.title }}</router-link
                    >
                  </h5>
                  <p v-if="item.size">
                    Size :
                    <span
                      class="fw-medium badge badge-pill bg-warning"
                      v-if="item.size !== ''"
                      >{{ item.size }}</span
                    >
                  </p>
                </div>
              </div>
              <div class="ms-2">
                <ul class="list-inline mb-0 font-size-16">
                  <li class="list-inline-item" v-b-tooltip.hover title="Remove">
                    <a href="#" class="text-muted px-2" @click="removeItem(index, item)">
                      <i class="uil uil-trash-alt text-danger"></i>
                    </a>
                  </li>
                  <li class="list-inline-item" v-b-tooltip.hover title="Cart">
                    <a class="btn btn-warning text-white" @click="addToCart(item)">
                      <i class="uil uil-shopping-cart-alt me-1"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <div class="row">
                <div class="col-md-4">
                  <div class="mt-3">
                    <h5 class="text-muted mb-2">retail_price</h5>
                  </div>
                </div>
                <div class="col-md-4 float-end">
                  <div class="mt-3">
                    <h5 class="font-size-16">
                      KShs.{{ new Intl.NumberFormat().format(item.item_total) }}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- end card -->

        <div class="row mt-4">
          <div class="col">
            <router-link to="/ecommerce/products" class="btn btn-link text-muted">
              <i class="uil uil-arrow-left me-1"></i> Continue Shopping
            </router-link>
          </div>
          <!-- end col -->

          <!-- end col -->
        </div>
        <!-- end row-->
      </div>
    </div>
    <div class="row mb-16 pb-16" v-else>
      <div class="col-lg-12">
        <div class="col-sm-6">
          <h5 class="text-center">Your don't have any Favorites yet!</h5>
          <router-link :to="{ name: 'Products' }" class="btn btn-light text-muted">
            <i class="uil uil-arrow-left me-1 text-warning float-left"></i> Continue
            Shopping
          </router-link>
        </div>
      </div>
    </div>
    <!-- end row -->
  </div>
</template>
<script>
import PageHeader from "@/components/page-header";
// import axios from "axios";
// import Swal from "sweetalert2";
import appConfig from "@/app.config";
export default {
  page: {
    title: "favorites",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: {
    PageHeader,
  },
  data() {
    return {
      title: "My Favorite Products",
      items: [
        {
          text: "Ecommerce",
        },
        {
          text: "favorites",
          active: true,
        },
      ],
    };
  },
  computed: {
    favoritesItems() {
      return this.$store.state.favorites;
    },
  },
  mounted() {},
  methods: {
    addToCart(product) {
      if (!localStorage.getItem("user")) {
        this.$router.push({ name: "login" });
        return;
      }
      console.log(product);
      var retail_price = product.retail_price;
      if (product.discount_price > 0) {
        retail_price = product.discount_price;
        product.retail_price = retail_price;
      }
      var cartItem = {
        product: product,
        size: this.size,
        color: this.color,
        quantity: this.quantity,
        item_subtotal: retail_price, // cart subtotal
        tax: 0.16, // tax
        item_total: retail_price * this.quantity,
      };
      this.$store.dispatch("cart/addProductToCart", cartItem);
      this.message = "Success!Item added to cart!";
      this.alert_type = "success";
      this.showAlert = true;
    },
    removeItem(index, item) {
      this.$store.dispatch("favorites/removeFromfavorites", { index, item });
    },
    clearfavorites() {
      this.$store.dispatch("favorites/clearFavorites");
    },
  },
  middleware: "authentication",
};
</script>
