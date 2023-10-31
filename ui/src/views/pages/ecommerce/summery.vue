<script>
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
// import axios from '@/Axiosconfig.js';
// import Swal from "sweetalert2";
export default {
  components: {
    PageHeader,
  },
  page: {
    title: "SUMMARY",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  data() {
    return {
      title: "SUMMARY",
      items: [
        {
          text: "Checkout",
        },
        {
          text: "Summary",
          active: true,
        },
      ],
      editmode: false,
      modaltitle: "Add shipping Address",
      cartItems: [],
      address: [],
      useraddr: null,
      user: null,
      orderNo: null,
      paymentMethod: null,
      selectedAddress: null,
      showdetails: false,
      showaddress: false,
    };
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    defaultaddress() {
      return this.$store.state.address.defaultaddress;
    },
    getDeliveryaddress() {
      return this.$store.state.address.delivery_address;
    },
  },
  mounted() {
    this.cartItems = this.cart;
    this.user = JSON.parse(localStorage.user);
    this.orderNo = this.$route.params.orderNo;
    this.paymentMethod = this.$route.params.paymentMethod;
    this.useraddr = this.defaultaddress;
    this.address = this.getDeliveryaddress;
  },
  methods: {},
  middleware: "authentication",
};
</script>

<template>
  <div class="container">
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-xl-12">
        <div class="custom-accordion">
          <div class="card">
            <div class="p-4 border-top">
              <div class="row">
                <div class="card">
                  <div class="media-body overflow-hidden bg-light">
                    <h5
                      class="font-size-16 mb-1 d-inline border-2 shadow-sm border-light"
                    >
                      YOUR ADDRESS
                    </h5>
                    <router-link
                      :to="{ name: 'Addresses' }"
                      class="text-muted mb-1 d-inline float-right mr-4 pr-4 btn btn-default border-2 shadow-sm border-warning"
                      v-if="useraddr"
                    >
                      CHANGE
                    </router-link>
                  </div>
                  <div class="form-group">
                    <a
                      class="link m-2"
                      href="#"
                      @click="showaddress = true"
                      v-if="!showaddress"
                      >Show details<i class="fa fa-plus"></i
                    ></a>
                    <a
                      class="link m-2"
                      href="#"
                      @click="showaddress = false"
                      v-if="showaddress"
                      >Hide details<i class="fa fa-minus"></i
                    ></a>
                  </div>
                </div>
                <div class="card-body" v-if="useraddr">
                  <h5 class="text-wrap">
                    {{ useraddr.first_name }} {{ useraddr.last_name }}
                  </h5>
                  <p>
                    <span>{{ useraddr.delivery_address }}</span
                    ><br />
                    <span>{{ useraddr.region }}</span
                    ><br />
                    <span>{{ useraddr.phone }}</span>
                  </p>
                </div>
              </div>
              <div class="row" v-show="showaddress">
                <h5 class="text-uppercase text-muted">YUOR PICKUP STATION</h5>
                <div class="col-lg-3 col-sm-6">
                  <label class="card-radio-label">
                    <span class="card-radio text-wrap">
                      <i class="uil uil-postcard text-warning float-end h2"></i>
                      <h5 class="font-weight-bold">{{ address.pickup_location }}</h5>
                      <v-divider></v-divider>
                      <p>{{ useraddr.region }}, {{ address.description }}</p>
                      <a class="mt-1" :href="address.google_pin" target="_blank"
                        >View on map
                      </a>
                      <h5 class="disabled font-weight-light mt-2">Open Hours:</h5>
                      <p class="">{{ address.open_hours }}</p>
                      <h5 class="disabled font-weight-light mt-2">Payment Options:</h5>
                      <p class="">{{ address.payment_options }}</p>
                    </span>
                    <div class="card border-1 border-light bg-warning p-0 m-0">
                      <div class="card-body m-0 p-2">
                        <div
                          class="col-sm-12 m-0 p-0"
                          v-if="address.shipping_charge !== 0"
                        >
                          <h5 clas="my-2 text-white">
                            <b class="text-white">Delivery Fee:</b> KShs.{{
                              new Intl.NumberFormat().format(address.shipping_charge)
                            }}
                          </h5>
                        </div>
                        <div class="col-sm-12 m-0 p-0" v-else>
                          <h5 clas="my-2 text-white">
                            <b class="text-white">Delivery Fee:</b>FREE
                          </h5>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="p-4 border-top">
              <div class="row">
                <div class="media-body overflow-hidden bg-light">
                  <h5 class="font-size-16 mb-1 d-inline border-2 shadow-sm border-light">
                    PAYMENT METHOD
                  </h5>
                  <button
                    class="text-muted mb-1 d-inline float-right mr-4 pr-4 btn btn-default border-2 shadow-sm border-warning"
                  >
                    CHANGE
                  </button>
                </div>
                <div class="col-lg-12 col-sm-12">
                  <div class="card">
                    <label class="card-body">
                      <h5 class="text-center text-uppercase">
                        {{ paymentMethod }}
                      </h5>
                    </label>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="card checkout-order-summary">
                    <div class="card-body">
                      <div class="p-3 bg-light mb-4">
                        <h5 class="font-size-16 mb-0 text-uppercase">
                          Order Summary
                          <span class="float-end ms-2 badge badge-pill bg-warning"
                            >#{{ orderNo }}</span
                          >
                        </h5>
                        <a
                          class="link m-2"
                          href="#"
                          @click="showdetails = true"
                          v-if="!showdetails"
                          >Show details<i class="fa fa-plus"></i
                        ></a>
                        <a
                          class="link m-2"
                          href="#"
                          @click="showdetails = false"
                          v-if="showdetails"
                          >Hide details<i class="fa fa-minus"></i
                        ></a>
                      </div>
                      <div class="table-responsive">
                        <table class="table table-centered mb-0 table-nowrap">
                          <thead>
                            <tr v-show="showdetails">
                              <th class="border-top-0" style="width: 110px" scope="col">
                                Product
                              </th>
                              <th class="border-top-0" scope="col">Product Desc</th>
                              <th class="border-top-0" scope="col">Price(KShs)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="item in cart.items"
                              :key="item.id"
                              v-show="showdetails"
                            >
                              <th scope="row">
                                <img
                                  :src="item.product.images[0].image"
                                  alt="product-img"
                                  title="product-img"
                                  class="avatar-md"
                                />
                              </th>
                              <td>
                                <h5 class="font-size-14 text-truncate">
                                  <router-link
                                    :to="{
                                      name: 'Product Detail',
                                      params: {
                                        product: item.product,
                                        category: item.product.maincategory,
                                      },
                                    }"
                                    class="text-dark text-truncate"
                                    >{{ item.product.title }}</router-link
                                  >
                                </h5>
                                <p class="text-muted mb-0">
                                  {{ item.item_subtotal }} x {{ item.quantity }}
                                </p>
                              </td>
                              <td>
                                {{
                                  new Intl.NumberFormat().format(
                                    item.item_total * item.quantity
                                  )
                                }}
                              </td>
                            </tr>
                            <tr>
                              <td colspan="2">
                                <h5 class="font-size-14 m-0">Sub Total :</h5>
                              </td>
                              <td>
                                KShs.{{ new Intl.NumberFormat().format(cart.subtotal) }}
                              </td>
                            </tr>
                            <tr>
                              <td colspan="2">
                                <h5 class="font-size-14 m-0">Shipping Charge :</h5>
                              </td>
                              <td>
                                KShs.{{ new Intl.NumberFormat().format(cart.shipping) }}
                              </td>
                            </tr>
                            <tr>
                              <td colspan="2">
                                <h5 class="font-size-14 m-0">Tax :</h5>
                              </td>
                              <td>KShs.{{ new Intl.NumberFormat().format(cart.tax) }}</td>
                            </tr>
                            <tr class="bg-light">
                              <td colspan="2">
                                <h5 class="font-size-14 m-0">Total:</h5>
                              </td>
                              <td>
                                KShs.{{ new Intl.NumberFormat().format(cart.total) }}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row my-4">
          <div class="col">
            <router-link to="/ecommerce/products" class="btn btn-link text-muted">
              <i class="uil uil-arrow-left me-1"></i> Continue Shopping
            </router-link>
          </div>
          <!-- end col -->
          <div class="col">
            <div class="text-sm-right mt-2 mt-sm-0">
              <router-link
                :to="{
                  name: 'Pay',
                  params: {
                    orderNo: this.orderNo,
                    useraddress: defaultaddress,
                    deliveryaddress: this.selectedAddress,
                    paymentMethod: this.paymentMethod,
                  },
                }"
                href="#"
                class="btn btn-warning text-white"
              >
                <i class="uil uil-shopping-cart-alt me-1 text-white"></i> CONFIRM
              </router-link>
            </div>
          </div>
          <!-- end col -->
        </div>
        <!-- end row-->
      </div>
    </div>
    <!-- end row -->
  </div>
</template>
