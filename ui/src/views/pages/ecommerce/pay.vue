<script>
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import axios from "@/Axiosconfig.js";
import Swal from "sweetalert2";
export default {
  components: {
    PageHeader,
  },
  page: {
    title: "PAYMENT",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  data() {
    return {
      title: "PAYMENT",
      items: [
        {
          text: "Checkout",
        },
        {
          text: "Payment",
          active: true,
        },
      ],
      editmode: false,
      modaltitle: "Add shipping Address",
      myid: 1,
      myindex: 0,
      cartItems: [],
      address: [],
      useraddr: null,
      user: null,
      orderNo: null,
      paymentMethod: null,
      selectedAddress: null,
      showdetails: false,
      showaddress: false,
      prevPayments: true,
      editablePhoneNumber: false,
      PhoneNumber: "0743793901",
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
    hiddenPhone() {
      // Replace the first 4 characters with x
      const hiddenChars = this.PhoneNumber.substr(0, 4).replace(/./g, "x");
      // Return the hidden text with the last 4 digits
      return hiddenChars + "-" + this.PhoneNumber.substr(-4);
    },
    formattedPhoneNumber() {
      // check if phone number starts with 0
      if (/^0/.test(this.PhoneNumber)) {
        // replace leading 0 with 254
        return this.PhoneNumber.replace(/^0/, "254");
      } else if (/^254/.test(this.PhoneNumber)) {
        // phone number already starts with 254, so ignore
        return this.PhoneNumber;
      } else {
        // phone number doesn't start with 0 or 254, so return as is
        return this.PhoneNumber;
      }
    },
  },
  mounted() {
    this.cartItems = this.cart;
    this.user = JSON.parse(localStorage.user);
    this.orderNo = this.$route.params.orderNo;
    this.paymentMethod = this.$route.params.paymentMethod;
    this.useraddr = this.defaultaddress;
    this.address = this.getDeliveryaddress;
    this.PhoneNumber = this.useraddr.phone;
    console.log(this.paymentMethod);
  },
  methods: {
    placeOrder() {
      var formData = new FormData();
      var swal_title = "Please wait...!";
      var swal_message = "Placing your order...";
      //add cart items
      formData.append("total", this.cart.total);
      formData.append("subtotal", this.cart.subtotal);
      formData.append("tax_amount", this.cart.tax);
      formData.append("shipping", this.cart.shipping);
      formData.append("orderId", this.orderNo);
      formData.append("address_id", this.address.id);
      formData.append("paymethod", this.paymentMethod);
      formData.append("userid", this.user.id);
      formData.append("status", "pending");

      var orderitems = [];
      this.cart.items.forEach((item) => {
        orderitems.push({
          stock_id: item.stock,
          quantity: item.quantity,
          item_subtotal: item.item_subtotal,
          item_total: item.item_total,
          tax: item.tax,
          color: item.color,
          size: item.size,
        });
      });
      formData.append("orderitems", JSON.stringify(orderitems));
      //validate phone number
      if (this.paymentMethod === "mpesa") {
        if (
          /^(2547|2541)\d{8}$/.test(this.formattedPhoneNumber) &&
          this.formattedPhoneNumber.length === 12
        ) {
          //valid pass
        } else {
          Swal.fire("Phone validation error!", "Invalid phone number!", "warning"); // invalid phone number
          return;
        }
        swal_message = "Payment processing...";
        swal_title = "Please Wait...!\nThis may take upto 1 min!";
      }
      Swal.fire({
        title: swal_title,
        html: swal_message, // add html attribute if you want or remove
        timer: 60000, // set timer to 45 seconds
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });
      axios
        .post("oerderadd/", formData)
        .then((response) => {
          //send stk push
          if (this.paymentMethod === "mpesa") {
            axios
              .post("stkpush/", {
                orderId: this.orderNo,
                phone: this.formattedPhoneNumber,
                total: this.cart.total,
                reference: "5464747",
                tr_description: "Bengomall",
              })
              .then((res) => {
                console.log(res.data);
                var pwd = res.data["password"];
                var checkoutID = res.data["checkoutID"];
                var timestamp = res.data["timestamp"];
                axios
                  .post("payment/confirm/", {
                    pwd: pwd,
                    timestamp: timestamp,
                    chekoutID: checkoutID,
                    orderId: this.orderNo,
                  })
                  .then((res) => {
                    Swal.close();
                    Swal.fire({
                      position: "center",
                      icon: "success",
                      title: "Success!",
                      html: res.data.toString(),
                      showConfirmButton: false,
                      timer: 3000,
                    });
                  });
              });
            this.clearValues();
          } else {
            Swal.fire({
              position: "center",
              icon: response.data.icon,
              title: response.data.message,
              showConfirmButton: true,
            });
            this.clearValues();
          }
        })
        .cath((e) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "" + e,
            showConfirmButton: true,
          });
        });
    },
    clearValues() {
      this.$store.dispatch("cart/clearCart");
    },
    handleSubmit() {
      console.log("submit!");
    },
  },
  middleware: "authentication",
};
</script>

<template>
  <div class="container">
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-lg-12">
        <div class="card checkout-order-summary">
          <div class="card-body">
            <div class="p-3 bg-light mb-4">
              <h5 class="font-size-16 mb-0 text-uppercase">
                Order Summary
                <span
                  class="float-end ms-2 badge badge-pill bg-warning"
                  v-if="showdetails"
                  >#{{ orderNo }}</span
                >
                <a
                  class="link mb-2 d-inline float-end mr-4"
                  href="#"
                  @click="showdetails = true"
                  v-if="!showdetails"
                  >Show details<i class="fa fa-plus"></i
                ></a>
                <a
                  class="link mb-2 d-inline float-end mr-4"
                  href="#"
                  @click="showdetails = false"
                  v-if="showdetails"
                  >Hide details<i class="fa fa-minus"></i
                ></a>
              </h5>
            </div>
            <div class="table-responsive">
              <table class="table table-centered mb-0 table-nowrap">
                <thead>
                  <tr v-show="showdetails">
                    <th class="border-top-0" style="width: 110px" scope="col">Product</th>
                    <th class="border-top-0" scope="col">Product Desc</th>
                    <th class="border-top-0" scope="col">retail_price(KShs)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in cart.items" :key="item.id" v-show="showdetails">
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
                        new Intl.NumberFormat().format(item.item_total * item.quantity)
                      }}
                    </td>
                  </tr>
                  <tr v-show="showdetails">
                    <td colspan="2">
                      <h5 class="font-size-14 m-0">Sub Total :</h5>
                    </td>
                    <td>KShs.{{ cart.subtotal }}</td>
                  </tr>
                  <tr v-show="showdetails">
                    <td colspan="2">
                      <h5 class="font-size-14 m-0">Shipping Charge :</h5>
                    </td>
                    <td>KShs.{{ new Intl.NumberFormat().format(cart.shipping) }}</td>
                  </tr>
                  <tr v-show="showdetails">
                    <td colspan="2">
                      <h5 class="font-size-14 m-0">Tax :</h5>
                    </td>
                    <td>KShs.{{ new Intl.NumberFormat().format(cart.tax) }}</td>
                  </tr>
                  <tr class="overflow-hidden">
                    <td class="d-inline">
                      <h3 class="font-size-15 text-uppercase text-muted">
                        Total to pay
                        <span class="d-inline float-end mr-4">
                          KShs.{{ new Intl.NumberFormat().format(cart.total) }}</span
                        >
                      </h3>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-12">
        <div class="custom-accordion">
          <h5
            class="font-size-16 mb-1 text-center p-2 bg-light text-muted"
            v-if="prevPayments"
          >
            YOU WILL PAY WITH
          </h5>
          <div class="card" v-if="prevPayments">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-6">
                  <h5 class="text-uppercase d-inline">
                    <span>{{ hiddenPhone }}</span>
                  </h5>
                  <span class="d-inline float-right mt-0 pt-0 mb-2">
                    <img
                      :src="require('@/assets/img/shop/mpesa.png')"
                      width="90"
                      height="50"
                    />
                  </span>
                </div>
              </div>
              <v-divider></v-divider>
              <div class="row">
                <a class="link text-uppercase font-size-16 font-weight-bold text-center"
                  >use a different payment method</a
                >
              </div>
            </div>
          </div>
          <div class="card" v-if="paymentMethod === 'mpesa'">
            <div class="card-body m-auto">
              <button
                class="btn btn-primary font-size-16 p-2"
                v-b-modal.modal-confirmdetails
              >
                PAY NOW KES {{ new Intl.NumberFormat().format(cart.total) }}
              </button>
            </div>
          </div>
          <div class="card" v-else>
            <div class="card-body m-auto">
              <button class="btn btn-primary font-size-16 p-2" @click="placeOrder()">
                PLACE ORDER -> Total to be paid Ksh.{{
                  new Intl.NumberFormat().format(cart.total)
                }}
              </button>
            </div>
          </div>
        </div>

        <div class="row my-4">
          <p class="font-size-14">
            By tapping "PAY NOW" I aggree to Bengomall`s
            <a class="link" href="#">Payment Terms & Conditions</a>,<a
              class="link"
              href="#"
            >
              General Terms & Conditions</a
            >, and <a class="link" href="#">Privacy and Cockies Notice</a>
          </p>
          <v-divider height="5"></v-divider>
          <p class="font-size-14">
            <b>NOTE:</b>BengoPay will never ask for your Password,PIN,CVV or full card
            details over the phone or via email.
          </p>
          <div class="row">
            <p class="text-center font-size-16">
              Need help?<a href="#" class="link">Contact us</a>
            </p>
          </div>
          <div class="col text-center">
            <v-divider height="8"></v-divider>
            <router-link
              to="/ecommerce/products"
              class="btn btn-link text-muted text-uppercase font-size-18"
            >
              <i class="uil uil-arrow-left me-1"></i> back to bengomall
            </router-link>
          </div>
          <!-- end col -->
        </div>
        <!-- end row-->
      </div>
      <!--modals-->
      <b-modal title="Confirm Payment Details" size="lg" id="modal-confirmdetails">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <p class="text-muted">
              An M-Pesa stk push will be sent to your phone when you tap 'MAKE PAYMENT'
              button. Please confirm your pin on the pop-up screen to complete your order!
            </p>
            <label for="amount" class="mr-4">Amount:(KES)</label>
            <span class="d-inline float-right mt-0 pt-0 mb-2">
              <img :src="require('@/assets/img/shop/mpesa.png')" width="90" height="50" />
            </span>
            <input
              type="text"
              class="form-control"
              id="amount"
              v-model="cart.total"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="phone">Phone Number:</label>
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                id="phone"
                v-model="PhoneNumber"
                :disabled="!editablePhoneNumber"
              />
              <div class="input-group-append">
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  @click="editablePhoneNumber = true"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
          <button
            type="submit"
            class="btn btn-primary text-white mt-2 text-uppercase"
            @click="placeOrder()"
          >
            make payment
          </button>
        </form>
      </b-modal>
    </div>
    <!-- end row -->
  </div>
</template>
