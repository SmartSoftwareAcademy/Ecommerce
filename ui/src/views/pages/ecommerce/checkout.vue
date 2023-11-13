<script>
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import addAddress from "@/views/pages/humanresource/parts/Addressbook";
import Swal from "sweetalert2";

// import axios from '@/Axiosconfig.js';
// import Swal from "sweetalert2";
export default {
  components: {
    PageHeader,
    addAddress,
  },
  page: {
    title: "CHECKOUT",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  data() {
    return {
      title: "CHECKOUT",
      items: [
        {
          text: "Checkout",
        },
        {
          text: "Checkout",
          active: true,
        },
      ],
      modaltitle: "Address Book",
      cartItems: [],
      addr: null,
      editmode: false,
      selectmode: false,
      myid: 0,
      myindex: 0,
      selectedCity: null,
      selectedTown: "",
      zip_code: "",
      first_name: "",
      last_name: "",
      phone_number: "",
      other_phone: "",
      delivery_address: "",
      default_address: false,
      addresses: [],
      useraddr: null,
      user: null,
      orderNo: null,
      daysfrom: 7,
      daysto: 10,
      date: new Date(),
      paymentMethod: null,
      selectedAddress: null,
    };
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    defaultaddress() {
      return this.$store.state.address.defaultaddress;
    },
    useraddress() {
      return this.$store.state.address.addresses;
    },
    delivery_addresses() {
      return this.$store.state.address.delivery_addresses;
    },
    dateFrom() {
      const date = new Date(this.date);
      date.setDate(date.getDate() + this.daysfrom);
      return date.toDateString();
    },
    dateTo() {
      const date = new Date(this.date);
      date.setDate(date.getDate() + this.daysto);
      return date.toDateString();
    },
  },
  mounted() {
    this.getuserAddress();
    this.cartItems = this.$route.params.cartItems;
    this.user = JSON.parse(localStorage.user);
    this.orderNo = this.$route.params.orderNo;
    console.log(this.useraddr);
  },
  methods: {
    getuserAddress() {
      //alert('address changed!')
      this.useraddr = this.defaultaddress;
      this.addresses = this.delivery_addresses;
    },
    setShippingCharge(charge) {
      if (charge == null) {
        charge = 100;
      }
      this.$store.dispatch("cart/setShippingCharge", charge);
    },
    addDeliveryAddress(addr) {
      this.$store.dispatch("address/addDeliveryAddress", addr);
    },
    checkout() {
      if (this.selectedAddress === null) {
        Swal.fire("Validation Error!", "Please select a delivery address!", "warning");
        return;
      }
      if (this.paymentMethod === null) {
        Swal.fire("Validation Error!", "Please select a payment method!", "warning");
        return;
      }
      this.$router.push({
        name: "Summary",
        params: {
          orderNo: this.orderNo,
          useraddress: this.defaultaddress,
          deliveryaddress: this.selectedAddress,
          paymentMethod: this.paymentMethod,
        },
      });
    },
  },
  middleware: "authentication",
};
</script>

<template>
  <div class="container">
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-xl-12">
        <div class="card">
          <b-modal :title="modaltitle" size="lg" id="modal-address">
            <addAddress
              @getuserAddress="getuserAddress()"
              :editmode="editmode"
              :modaltitle="modaltitle"
              :id="myid"
              :selectedCity="selectedCity"
              :selectedTown="selectedTown"
              :zip_code="zip_code"
              :first_name="first_name"
              :last_name="last_name"
              :phone_number="phone_number"
              :other_phone="other_phone"
              :delivery_address="delivery_address"
              :default_address="default_address"
            />
          </b-modal>
        </div>
        <form id="checkout-form" ref="checkout-form" @submit.prevent="checkout()">
          <div class="custom-accordion">
            <div class="card">
              <a
                href="javascript: void(0);"
                class="collapsed text-dark"
                data-toggle="collapse"
                v-b-toggle.checkout-shippinginfo-collapse
              >
                <div class="p-4">
                  <div class="media align-items-center">
                    <div class="me-3">
                      <i class="uil uil-truck text-primary h2"></i>
                    </div>
                    <div class="media-body overflow-hidden">
                      <h5 class="font-size-16 mb-1">DELIVERY</h5>
                      <p class="text-muted text-truncate mb-0">Shipping Address</p>
                    </div>
                    <i class="mdi mdi-chevron-up accor-down-icon font-size-24"></i>
                  </div>
                </div>
              </a>

              <b-collapse id="checkout-shippinginfo-collapse">
                <div class="p-4 border-top">
                  <div class="row">
                    <div class="card">
                      <div class="media-body overflow-hidden bg-light mb-4">
                        <h5
                          class="font-size-14 mb-1 d-inline border-2 shadow-sm border-light"
                        >
                          YOUR ADDRESS
                        </h5>
                        <router-link
                          :to="{ name: 'Addresses' }"
                          class="text-muted mb-1 d-inline float-right mr-4 pr-4 btn btn-default border-2 shadow-sm border-warning"
                          v-if="useraddr !== null"
                        >
                          CHANGE
                        </router-link>
                        <button
                          class="btn btn-default bg-light text-warning font-weight-bold d-inline float-end shadow-sm mr-4"
                          v-b-modal.modal-address
                          v-if="true"
                        >
                          ADD SHIPING ADDRESS
                        </button>
                        <div class="card-body" v-if="useraddr !== null">
                          <h5 class="text-wrap">
                            {{ useraddr.address_label }}
                          </h5>
                          <p>
                            <span
                              >{{ useraddr.postal_code }},{{
                                useraddr.city__pickup_location || useraddr.city
                              }}
                              - {{ useraddr.region__region || useraddr.region }}</span
                            >
                            <br />
                            <span>{{ useraddr.phone }}/{{ useraddr.other_phone }}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h5
                    class="font-size-14 mb-3 badge badge-pill bg-warning text-uppercase"
                    v-if="useraddr !== null"
                  >
                    pickup stations near you
                  </h5>
                  <p class="text-uppercase" v-if="useraddr !== null">
                    click to select a pickup station
                  </p>
                  <div class="row" v-if="useraddr !== null">
                    <div
                      class="col-lg-3 col-sm-6"
                      v-for="addr in delivery_addresses"
                      :key="addr.id"
                    >
                      <div>
                        <label class="card-radio-label">
                          <input
                            type="radio"
                            name="pay-method"
                            v-model="selectedAddress"
                            :value="addr"
                            @click="
                              setShippingCharge(addr.shipping_charge),
                                addDeliveryAddress(addr)
                            "
                            :id="addr.id"
                            class="card-radio-input"
                            required
                          />
                          <span class="card-radio text-wrap">
                            <i class="uil uil-postcard text-warning float-end h2"></i>
                            <h5 class="font-weight-bold">{{ addr.city }}</h5>
                            <p class="text-muted">
                              Available between {{ dateFrom }} and
                              {{ dateTo }}
                            </p>
                            <v-divider></v-divider>
                            <p>
                              {{ useraddr.region_region || useraddr.region }},
                              {{ addr.description }}
                            </p>
                            <a class="mt-1" :href="addr.google_pin" target="_blank"
                              >View on map
                            </a>
                            <h5 class="disabled font-weight-light mt-2">Open Hours:</h5>
                            <p class="">{{ addr.open_hours }}</p>
                            <h5 class="disabled font-weight-light mt-2">
                              Payment Options:
                            </h5>
                            <p class="">{{ addr.payment_options }}</p>
                          </span>
                          <div class="card border-1 border-light bg-warning p-0 m-0">
                            <div class="card-body m-0 p-2">
                              <h5 clas="my-2 text-white" v-if="addr.shipping_charge">
                                <b class="text-white">Delivery Fee:</b> KShs.{{
                                  addr.shipping_charge
                                }}
                              </h5>
                              <h5
                                clas="my-2 text-white"
                                v-if="addr.shipping_charge === 0"
                              >
                                <b class="text-white">Delivery Fee:</b>FREE
                              </h5>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </b-collapse>
            </div>

            <div class="card">
              <a
                href="javascript: void(0);"
                class="collapsed text-dark"
                data-toggle="collapse"
                v-b-toggle.checkout-paymentinfo-collapse
              >
                <div class="p-4">
                  <div class="media align-items-center">
                    <div class="me-3">
                      <i class="uil uil-bill text-primary h2"></i>
                    </div>
                    <div class="media-body overflow-hidden">
                      <h5 class="font-size-16 mb-1">PAYMENT</h5>
                      <p class="text-muted text-truncate mb-0">Payment Method</p>
                    </div>
                    <i class="mdi mdi-chevron-up accor-down-icon font-size-24"></i>
                  </div>
                </div>
              </a>

              <b-collapse id="checkout-paymentinfo-collapse">
                <div class="p-4 border-top">
                  <div>
                    <h5 class="font-size-14 mb-3">Payment method :</h5>

                    <div class="row">
                      <div class="col-lg-3 col-sm-6">
                        <div data-toggle="collapse">
                          <label class="card-radio-label">
                            <input
                              type="radio"
                              name="pay-method"
                              id="pay-methodoption1"
                              v-model="paymentMethod"
                              value="card"
                              class="card-radio-input"
                              required
                            />
                            <span class="card-radio text-center text-truncate">
                              <i class="uil uil-postcard d-block h2 mb-3"></i>
                              Credit / Debit Card
                            </span>
                          </label>
                        </div>
                      </div>

                      <div class="col-lg-3 col-sm-6">
                        <div>
                          <label class="card-radio-label">
                            <input
                              type="radio"
                              name="pay-method"
                              id="pay-methodoption2"
                              v-model="paymentMethod"
                              value="mpesa"
                              class="card-radio-input"
                            />
                            <span class="card-radio text-center text-truncate">
                              <img
                                :src="require('@/assets/img/shop/mpesa.png')"
                                width="100"
                                height="70"
                              />
                            </span>
                          </label>
                        </div>
                      </div>

                      <div class="col-lg-3 col-sm-6">
                        <div>
                          <label class="card-radio-label">
                            <input
                              type="radio"
                              name="pay-method"
                              id="pay-methodoption3"
                              v-model="paymentMethod"
                              value="mpesa_on_delivery"
                              class="card-radio-input"
                              checked
                            />
                            <span class="card-radio text-center text-truncate">
                              <i class="uil uil-money-bill d-block h2 mb-3"></i>
                              <span>Mpesa on Delivery</span>
                            </span>
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
                            </div>
                            <div class="table-responsive">
                              <table class="table table-centered mb-0 table-nowrap">
                                <thead>
                                  <tr>
                                    <th
                                      class="border-top-0"
                                      style="width: 110px"
                                      scope="col"
                                    >
                                      Product
                                    </th>
                                    <th class="border-top-0" scope="col">Product Desc</th>
                                    <th class="border-top-0" scope="col">retail_price(KShs)</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr v-for="item in cart.items" :key="item.id">
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
                                      KShs.{{
                                        new Intl.NumberFormat().format(cart.subtotal)
                                      }}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colspan="2">
                                      <h5 class="font-size-14 m-0">Shipping Charge :</h5>
                                    </td>
                                    <td>
                                      KShs.{{
                                        new Intl.NumberFormat().format(cart.shipping)
                                      }}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colspan="2">
                                      <h5 class="font-size-14 m-0">Tax :</h5>
                                    </td>
                                    <td>
                                      KShs.{{ new Intl.NumberFormat().format(cart.tax) }}
                                    </td>
                                  </tr>
                                  <tr class="bg-light">
                                    <td colspan="2">
                                      <h5 class="font-size-14 m-0">Total:</h5>
                                    </td>
                                    <td>
                                      KShs.{{
                                        new Intl.NumberFormat().format(cart.total)
                                      }}
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
              </b-collapse>
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
                <button class="btn btn-warning" @click="checkout()" type="submit">
                  <i class="uil uil-shopping-cart-alt me-1 text-white"></i> PROCEED TO
                  SUMMARY
                </button>
              </div>
            </div>
            <!-- end col -->
          </div>
        </form>
        <!-- end row-->
      </div>
    </div>
    <!-- end row -->
  </div>
</template>
