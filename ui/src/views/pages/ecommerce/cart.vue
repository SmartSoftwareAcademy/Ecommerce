<template>
  <div class="container mb-16 pb-16">
    <PageHeader :title="title" :items="items" />
    <v-alert
      :value="showAlert"
      :type="alert_type"
      @click:close="showAlert = false"
      dismissible
    >
      {{ message }}
    </v-alert>
    <div class="row" v-if="cartItems.items.length > 0">
      <div class="col-xl-8">
        <div
          class="card border shadow-none"
          v-for="(item, index) in cartItems.items"
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
                  <p class="mb-1" v-if="item.color !== null">
                    Color :
                    <span class="fw-medium badge badge-pill bg-warning">{{
                      item.color.color
                    }}</span>
                  </p>
                  <p>
                    Size :
                    <span
                      class="fw-medium badge badge-pill bg-warning"
                      v-if="item.size !== null"
                      >{{ item.size.size }} {{ item.size.unit.unit_symbol }}</span
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
                  <li class="list-inline-item" v-b-tooltip.hover title="Add Favourites">
                    <a href="#" class="text-muted px-2" @click="addFavorites(item)">
                      <i class="uil uil-heart"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="row">
                <div class="form-group">
                  <button class="btn btn-danger uil uil-cancel" @click="clearCart()">
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>

            <div>
              <div class="row">
                <div class="col-md-4">
                  <div class="mt-3">
                    <p class="text-muted mb-2">retail_price</p>
                    <span v-if="!item.size">
                      <h5 class="font-size-16" v-if="item.product.discount_price > 0">
                        KShs.{{
                          new Intl.NumberFormat().format(item.product.discount_price)
                        }}
                      </h5>
                      <h5 class="font-size-16" v-else>
                        KShs.{{ new Intl.NumberFormat().format(item.product.retail_price) }}
                      </h5>
                    </span>
                    <span v-else>
                      <h5 class="font-size-16" v-if="item.size.unit_discount_price > 0">
                        KShs.{{
                          new Intl.NumberFormat().format(item.size.unit_discount_price)
                        }}
                      </h5>
                      <h5 class="font-size-16" v-else>
                        KShs.{{ new Intl.NumberFormat().format(item.size.retail_price) }}
                      </h5>
                    </span>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="mt-3">
                    <p class="text-muted mb-2">Quantity</p>
                    <div class="row" style="width: 120px">
                      <div class="col-md-3">
                        <button @click="decrementQuantity(item)" class="btn btn-warning">
                          -
                        </button>
                      </div>
                      <div class="col-md-3">
                        <strong>
                          <input
                            type="number"
                            v-model="quantity"
                            class="ml-3 mt-2 mr-2"
                            disabled
                          />
                        </strong>
                      </div>
                      <div class="col-md-3">
                        <button
                          @click="incrementQuantity(item)"
                          class="btn btn-warning d-inline"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="mt-3">
                    <p class="text-muted mb-2">Total</p>
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
          <div class="col-sm-6">
            <div class="text-sm-end mt-2 mt-sm-0">
              <router-link
                :to="{
                  name: 'Checkout',
                  params: { cartItems: cartItems, orderNo: generateOrderId },
                }"
                class="btn btn-warning text-white"
              >
                <i class="uil uil-shopping-cart-alt me-1"></i> PROCEED TO CHECKOUT
              </router-link>
            </div>
          </div>
          <!-- end col -->
        </div>
        <!-- end row-->
      </div>
      <div class="col-xl-4">
        <div class="mt-5 mt-lg-0">
          <div class="card border shadow-none">
            <div class="card-header bg-transparent border-bottom py-3 px-4">
              <h5 class="font-size-16 mb-0">
                Order Summary
                <span class="float-end">{{ generateOrderId }}</span>
              </h5>
            </div>
            <div class="card-body p-4">
              <div class="table-responsive">
                <table class="table mb-0">
                  <tbody>
                    <tr>
                      <td>Sub Total :</td>
                      <td class="text-end">
                        KShs.{{ new Intl.NumberFormat().format(cartItems.subtotal) }}
                      </td>
                    </tr>
                    <tr>
                      <td>Shipping Charge :</td>
                      <td class="text-end">
                        KShs.{{ new Intl.NumberFormat().format(cartItems.shipping) }}
                      </td>
                    </tr>
                    <tr>
                      <td>VAT Tax :</td>
                      <td class="text-end">
                        KShs.{{ new Intl.NumberFormat().format(cartItems.tax) }}
                      </td>
                    </tr>
                    <tr class="bg-light">
                      <th>Total :</th>
                      <td class="text-end">
                        <span class="fw-bold"
                          >KShs.{{
                            new Intl.NumberFormat().format(cartItems.total)
                          }}</span
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- end table-responsive -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-16 pb-16" v-else>
      <div class="col-lg-12">
        <div class="col-sm-6">
          <h5 class="text-center">Your cart is empty!</h5>
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
import axios from "@/Axiosconfig";
// import Swal from "sweetalert2";
import appConfig from "@/app.config";
export default {
  page: {
    title: "Cart",
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
      title: "Cart",
      items: [
        {
          text: "Ecommerce",
        },
        {
          text: "Cart",
          active: true,
        },
      ],
      quantity: 1,
      message: "Operation successful!",
      alert_type: "error",
      showAlert: false,
    };
  },
  computed: {
    generateOrderId() {
      // Generate a random 10-digit number
      let randomNumber = Math.floor(Math.random() * 100000) + 1000000;
      // Check if the number has 10 digits
      if (randomNumber.toString().length !== 10) {
        // If not, generate a new random number
        randomNumber = Math.floor(Math.random() * 100000) + 1000000;
      }
      return randomNumber + new Date().getTime();
    },
    cartItems() {
      return this.$store.state.cart;
    },
  },
  mounted() {
    console.log(this.cartItems);
  },
  methods: {
    decrementQuantity(item) {
      if (item.quantity > 1) {
        const newQuantity = item.quantity - 1;
        this.quantity = newQuantity;
        let new_item = item;
        new_item.quantity = 0;
        axios
          .post(window.$http + "cart/", new_item)
          .then((response) => {
            this.$store.dispatch("cart/updateCart", { item, quantity: newQuantity });
            this.message = response.data.message.toString();
            this.alert_type = response.data.icon;
            this.showAlert = true;
          })
          .catch((error) => {
            this.message = error.toString();
            this.alert_type = "error";
            this.showAlert = true;
          });
      }
    },
    incrementQuantity(item) {
      const newQuantity = item.quantity + 1;
      this.quantity = newQuantity;
      this.$store.dispatch("cart/updateCart", { item, quantity: newQuantity });
      axios
        .post(window.$http + "cart/", item)
        .then((response) => {
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
    removeItem(index, item) {
      axios
        .delete(window.$http + `cart/delete/${item.stock}/${0}/`)
        .then((response) => {
          this.$store.dispatch("cart/removeFromCart", { index, item });
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
    clearCart() {
      axios
        .delete(window.$http + `cart/clear/${0}/${JSON.parse(sessionStorage.user).id}/`)
        .then((response) => {
          this.$store.dispatch("cart/clearCart");
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
    addFavorites(product) {
      if (!sessionStorage.getItem("user")) {
        this.$router.push({ name: "login" });
        return;
      }
      var retail_price = product.retail_price;
      if (product.discount_price > 0) {
        retail_price = product.discount_price;
        product.retail_price = retail_price;
      }
      var favItem = {
        product: product,
        item_subtotal: retail_price, // cart subtotal
        item_total: retail_price * this.quantity,
      };
      this.$store.dispatch("favorites/addProductTofavorites", favItem);
      this.message = "Success!Item added to Favorites!";
      this.alert_type = "success";
      this.showAlert = true;
      console.log(this.$store.state.favorites);
    },
  },
  middleware: "authentication",
};
</script>
