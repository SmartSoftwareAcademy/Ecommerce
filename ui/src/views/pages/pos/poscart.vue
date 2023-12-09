<template>
  <div class="conatiner">
    <v-card class="border border-solid border-2 rounded-1 border-warning">
      <v-card-title>Point Of Sale</v-card-title>
      <div class="row m-2 p-2">
        <div class="col-lg-4">
          <!-- <div id="interactive" class="viewport"><button @click="beepOnScan()">play</button></div> -->
          <div class="mb-3">
            <input
              class="form-control mr-sm-2 d-inline-block"
              type="search"
              placeholder="Search product by title,sku,serial,id,category.."
              aria-label="Search"
              v-model="searchText"
              @input="applyFilter()"
            />
          </div>
        </div>
        <div class="col-lg-2">
          <div class="mb-3">
            <button
              class="btn btn-outline-warning my-2 my-sm-0 d-inline-block"
              type="button"
              @click="applyFilter()"
            >
              <i class="fa fa-sync"></i>Refresh
            </button>
          </div>
        </div>
        <div class="col-sm-2 float-end">
          <span class="p-2 rounded-1 bg-danger d-inline-block"></span>
          <span class="d-inline-block text-danger p-2">Stock alert!!</span>
        </div>
      </div>
      <div class="row m-2 overflow-scroll border border-2 border-light rounded">
        <div class="col-sm-2 p-2" v-for="item in filteredProducts" :key="item.id">
          <a @click="addToCart(item)" class="bg-light" href="#">
            <figure>
              <img
                :src="item.product.images[0].image"
                :width="200"
                :height="150"
                alt="Product Image"
              />
              <figcaption>
                <span
                  class="badge badge-pill bg-secondary text-wrap"
                  :class="{
                    'bg-danger': Number(item.stock_level) < Number(item.reorder_level),
                  }"
                  >{{ getFirstTwoWords(item.product.title) }} sku:{{ item.sku }}
                  <span class="badge badge-pill bg-warning" v-if="item.size !== null"
                    >{{ item.size.size }}&nbsp;{{ item.size.unit.unit_symbol }}</span
                  >&nbsp;
                  <h5 class="badge badge-pill bg-warning">QTY:{{ item.stock_level }}</h5>
                </span>
              </figcaption>
            </figure>
          </a>
        </div>
        <div class="row mb-1">
          <v-pagination
            v-if="totalProducts > 1"
            v-model="currentPage"
            :total-visible="8"
            :prev-text="'Previous'"
            :next-text="'Next'"
            :length="Math.ceil(totalProducts / perPage)"
            @input="handlePageChange(currentPage)"
            class="bg-warning text-dark rounded-1"
          ></v-pagination>
        </div>
      </div>
      <v-card>
        <v-card-title>Tray</v-card-title>
        <v-card-text>
          <v-data-table :headers="headers" :items="cart" item-key="id">
            <template v-slot:[`item.image`]="{ item }"
              ><img :src="item.product.images[0].image" :height="30"
            /></template>
            <template v-slot:[`item.title`]="{ item }">{{ item.product.title }}</template>
            <template v-slot:[`item.retail_price`]="{ item }">{{
              item.retail_price
            }}</template>
            <template v-slot:[`item.quantity`]="{ item }">
              <v-text-field v-model="item.quantity" type="number" min="1" class="w-25" />
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn @click="removeFromCart(item.index)" icon
                ><v-icon>mdi-delete</v-icon></v-btn
              >
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
          <div class="float-end bg-light rounded-1 p-2">
            <h3>
              Total: KES <strong>{{ total.toFixed(2) }}</strong>
            </h3>
            <h4 v-if="amountPaid > 0">
              Change: KES <strong>{{ change.toFixed(2) }}</strong>
            </h4>
          </div>
          <div v-if="paymentMethod === 'cash'">
            <h3 class="d-inline">Tendered Amount:</h3>
            <v-text-field
              v-model.number="amountPaid"
              :placeholder="amountPaid"
              class="d-inline-block form-input m-2"
            ></v-text-field>
            <v-radio-group v-model="paymentMethod">
              <v-radio value="cash" label="Cash">Cash</v-radio>
              <v-radio value="mpesa" label="M-Pesa">M-Pesa</v-radio>
            </v-radio-group>
          </div>
          <v-btn
            class="btn btn-warning"
            outlined
            v-if="paymentMethod === 'cash'"
            @click="confirmPayment('completed')"
            >Complete Transaction</v-btn
          >
          <v-btn
            v-b-modal.modal-mpesa
            class="btn btn-primary"
            v-if="paymentMethod === 'mpesa'"
            >Confirm Payment</v-btn
          >
        </v-card-text>
      </v-card>
    </v-card>
    <!--modal mpesa payment-->
    <b-modal title="Confirm Payment Details" size="lg" id="modal-confirmdetails">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <p class="text-muted">
            An M-Pesa stk push will be sent to your phone when you tap 'MAKE PAYMENT'
            button. Please confirm your pin on the pop-up screen to complete your order!
          </p>
          <label for="amount" class="mr-4">Amount To Be Paid:(KES)</label>
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
    <b-modal id="modal-mpesa" ref="modal" title="Confirm Payment" size="lg">
      <form ref="form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <p class="text-muted">
            An M-Pesa stk push will be sent to your phone when you tap 'MAKE PAYMENT'
            button. Please confirm your pin on the pop-up screen to complete your order!
          </p>
          <label for="amount" class="mr-4">Amount:(KES)</label>
          <span class="d-inline float-right mt-0 pt-0 mb-2">
            <img :src="require('@/assets/img/shop/mpesa.png')" width="90" height="50" />
          </span>
          <span class="form-control" id="amount">{{ total.toFixed(2) }}</span>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <b-form-group
              label="Amount"
              label-for="amountpaid"
              invalid-feedback="Amount paid is required"
            >
              <b-form-input id="amountpaid" v-model="PhoneNumber" required></b-form-input>
            </b-form-group>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <b-button typ="submit" @click="confirmPayment('pending')" variant="success"
              >Request Payment
            </b-button>
          </div>
          <div class="col-lg-6">
            <b-button typ="submit" @click="confirmPayment('pending')" variant="warning"
              >Save as Pending
            </b-button>
          </div>
        </div>
      </form>
    </b-modal>
    <Receipt
      :items="cart"
      :headers="receiptHeaders"
      :total="Number(total.toFixed(2))"
      :paymentMethod="paymentMethod"
      :receiptNo="paycode"
      @printReceipt="submitsale"
      v-show="false"
    />
  </div>
</template>
<script>
//import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import Receipt from "./printReceipt.vue";
import axios from "@/Axiosconfig.js";
import Swal from "sweetalert2";

export default {
  name: "PosCart",
  data() {
    return {
      headers: [
        { text: "Image", value: "image", sortable: true },
        { text: "Title", value: "title", sortable: true },
        { text: "Price", value: "retail_price", sortable: true },
        { text: "Quantity", value: "quantity", sortable: true },
        { text: "Actions", value: "actions", sortable: true },
      ],
      receiptHeaders: [
        { text: "Title", value: "title", sortable: true },
        { text: "Price", value: "retail_price", sortable: true },
        { text: "Quantity", value: "quantity", sortable: true },
      ],
      currentPage: 1,
      perPage: 12,
      limit: 12,
      offset: 0,
      filter: "",
      products: [],
      filteredProducts: [],
      totalProducts: 0,
      searchText: "",
      quantity: 1,
      cart: [],
      paymentMethod: "cash",
      amountPaid: 0,
      transactionCompleted: false,
      paycode: "NULL",
      trstatus: "pending",
      editablePhoneNumber: false,
      PhoneNumber: "0743793901",
      beepsound: require("@/assets/audio/beep.mp3"),
    };
  },
  components: {
    //Multiselect,
    Receipt,
  },
  computed: {
    total() {
      return this.cart.reduce((acc, item) => acc + item.retail_price * item.quantity, 0);
    },
    change() {
      return this.amountPaid - this.total;
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
    this.updatearrays();
  },

  methods: {
    getFirstTwoWords(str) {
      // Split the sentence into an array of words
      const words = str.split(" ");
      // Take the first two words
      const firstTwoWords = words.slice(0, 3).join(" ");
      return firstTwoWords;
    },
    formatProductLabel(product) {
      return product.product.title;
    },
    generateTrCode(n) {
      const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let result = "";
      for (let i = 0; i < n; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    },
    updatearrays() {
      // Swal.fire({
      //   title: "Please Wait !",
      //   html: "Loading data...", // add html attribute if you want or remove
      //   allowOutsideClick: false,
      //   showConfirmButton: false,
      //   willOpen: () => {
      //     Swal.showLoading();
      //   },
      // });
      axios
        .get(`pos_stock/?filter=${this.filter}&limit=${this.limit}&offset=${this.offset}`)
        .then((response) => {
          // JSON responses are automatically parsed.
          this.products = response.data["results"];
          this.totalProducts = response.data["count"];
          this.filteredProducts = this.products;
          // Swal.close();
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
    applyFilter() {
      var searchTextLower = this.searchText.toLowerCase();
      this.filter = searchTextLower;
      this.updatearrays();
      this.filteredProducts = this.products;
      //.filter((item) => {
      //   return (
      //     item.serial.toLowerCase().includes(searchTextLower) ||
      //     item.product.title.includes(searchTextLower) ||
      //     item.sku.toLowerCase().includes(searchTextLower) ||
      //     item.product.maincategory.name.toLowerCase().includes(searchTextLower)
      //   );
      // });
    },
    handlePageChange(newPage) {
      this.currentPage = newPage;
      this.limit = this.perPage;
      this.offset = (this.currentPage - 1) * this.perPage;
      this.updatearrays();
    },
    addToCart(item) {
      const product = item.product;
      const quantity = this.quantity;
      var retail_price = product.retail_price;
      if (item.size !== null) {
        retail_price = item.size.retail_price;
      }
      this.cart.push({
        sku: item.sku,
        product,
        quantity,
        retail_price,
      });
    },
    removeFromCart(index) {
      this.cart.splice(index, 1);
    },
    submitsale(data) {
      axios
        .post("salesadd/", data)
        .then((res) => {
          var orderId = this.generateTrCode(10);
          if (orderId == null) {
            Swal.fire(
              "Payment Code validation error!",
              "Invalid payment code!",
              "warning"
            ); // invalid phone number
            return;
          }
          if (this.paymentMethod === "mpesa") {
            //validate phone number
            if (
              /^(2547|2541)\d{8}$/.test(this.formattedPhoneNumber) &&
              this.formattedPhoneNumber.length === 12
            ) {
              //valid pass
            } else {
              Swal.fire("Phone validation error!", "Invalid phone number!", "warning"); // invalid phone number
              return;
            }
            Swal.fire({
              title: "Please Wait...!\nThis may take upto 1 min!",
              html: "Payment processing...", // add html attribute if you want or remove
              timer: 60000, // set timer to 45 seconds
              allowOutsideClick: false,
              showConfirmButton: false,
              willOpen: () => {
                Swal.showLoading();
              },
            });
            //send stk push
            axios
              .post("stkpush/", {
                orderId: orderId,
                phone: this.formattedPhoneNumber,
                total: this.total.toFixed(2),
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
                    orderId: orderId,
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
                    if (!res.data.toString().includes("cancel")) {
                      this.$emit("printReceipt");
                    }
                    this.clearValues();
                  });
              });
          }
          this.$emit("printReceipt");
          Swal.fire({
            position: "center",
            icon: res.data.icon,
            title: res.data.title,
            html: res.data.msg,
            showConfirmButton: false,
            timer: 1500,
          });
          this.clearValues();
        })
        .cath((e) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "" + e,
            showConfirmButton: true,
            timer: 3000,
          });
        });
    },
    confirmPayment(status) {
      var formdata = new FormData();
      this.paycode = this.generateTrCode(10);
      this.cart.forEach((item) => {
        let retail_price = item.retail_price;
        formdata.append("sku", item.sku);
        formdata.append("retail_price", retail_price);
        formdata.append("qty", item.quantity);
        formdata.append("total", (item.quantity * item.retail_price).toFixed(2));
      });
      if (this.paymentMethod == "cash") {
        if (Number(this.amountPaid) >= Number(this.total)) {
          this.transactionCompleted = true;
          this.trstatus = status;
          //this.$emit("printReceipt");
        } else {
          alert(
            "Amount paid:" +
              this.amountPaid +
              " is less than Total:" +
              this.total.toFixed(2)
          );
          return;
        }
      } else if (this.paymentMethod == "mpesa") {
        this.trstatus = status;
        this.$bvModal.hide("modal-mpesa");
      }
      formdata.append("tax_amount", 0.16 * this.total.toFixed(2));
      formdata.append("tax", 0.16);
      formdata.append("change_amount", this.change.toFixed(2));
      formdata.append("tendered_amount", this.amountPaid);
      formdata.append("sub_total", 0.84 * this.total.toFixed(2));
      formdata.append("grand_total", this.total.toFixed(2));
      if (this.paycode == null) {
        Swal.fire("Payment Code validation error!", "Invalid payment code!", "warning"); // invalid phone number
        return;
      }
      formdata.append("paycode", this.paycode.toUpperCase());
      formdata.append("status", this.trstatus);
      formdata.append("paymethod", this.paymentMethod);
      formdata.append("attendant", JSON.parse(sessionStorage.user).id);
      this.submitsale(formdata);
    },
    handleSubmit() {},
    clearValues() {
      this.transactionCompleted = false;
      this.cart = [];
      this.amountPaid = 0;
      this.change = 0;
      this.paymentMethod = "cash";
    },
  },
};
</script>
<style scoped>
.viewport {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
</style>
