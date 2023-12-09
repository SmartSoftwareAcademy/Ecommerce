<template>
  <div class="container mb-16 pb-16 justify-space-between">
    <PageHeader :title="title" :items="items" />
    <div class="p-4 border-top">
      <form>
        <div>
          <div class="row">
            <div class="col-lg-4">
              <div class="form-group mb-4">
                <label for="address_label">Address Label</label>
                <input
                  type="email"
                  class="form-control"
                  v-model="address_label"
                  :disabled="selectmode"
                  id="address_label"
                  placeholder="Enter Adress Label"
                />
              </div>
            </div>
            <div class="col-lg-4">
              <div class="form-group mb-4">
                <label for="billing-phone">Mpesa Phone Number</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="phone"
                  :disabled="selectmode"
                  id="billing-phone"
                  placeholder="Enter Phone no."
                />
              </div>
            </div>
            <div class="col-lg-4">
              <div class="form-group mb-4">
                <label for="billing-phone">Other Phone Number</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="other_phone"
                  :disabled="selectmode"
                  id="billing-phone"
                  placeholder="Enter Other Phone no."
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-4">
              <div class="form-group mb-4 mb-lg-0">
                <v-autocomplete
                  v-model="selectedCity"
                  :items="cities"
                  :disabled="selectmode"
                  label="City/Region"
                  @input="getRegionTowns()"
                ></v-autocomplete>
              </div>
            </div>

            <div class="col-lg-4">
              <div class="form-group mb-4 mb-lg-0">
                <v-autocomplete
                  v-model="selectedTown"
                  :items="towns"
                  :disabled="selectmode"
                  label="Town"
                ></v-autocomplete>
              </div>
            </div>

            <div class="col-lg-4">
              <div class="form-group mb-0">
                <v-text-field
                  v-model="postal_code"
                  :disabled="selectmode"
                  label="Postal Code"
                  placeholder="567-40100"
                ></v-text-field>
              </div>
            </div>
            <div class="row">
              <div class="form-group mb-0">
                <v-checkbox
                  v-model="default_address"
                  class="m-auto"
                  label="Set as default shipping address"
                ></v-checkbox>
              </div>
            </div>
            <div class="row">
              <div class="form-group mb-0" v-if="!selectmode">
                <b-button
                  variant="warning"
                  class="m-auto"
                  label="Set as default shipping address"
                  v-if="!editmode"
                  @click="addAddress()"
                  >ADD ADDRESS</b-button
                >
                <b-button
                  variant="warning"
                  class="m-auto"
                  label="Set as default shipping address"
                  @click="editAddress()"
                  v-if="editmode"
                  >SAVE ADDRESS</b-button
                >
              </div>
              <div class="form-group mb-0" v-if="selectmode">
                <b-button
                  variant="warning"
                  class="m-auto"
                  label="Set as default shipping address"
                  @click="editAddress()"
                  >{{ modaltitle }}</b-button
                >
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { VAutocomplete } from "vuetify/lib";
import PageHeader from "@/components/page-header";
import axios from "@/Axiosconfig.js";
import Swal from "sweetalert2";

export default {
  name: "Addressbook",
  props: {
    editmode: Boolean,
    selectmode: Boolean,
    modaltitle: String,
    id: Number,
    selectedCity: String,
    selectedTown: String,
    postal_code: String,
    address_label: String,
    phone: String,
    other_phone: String,
    default_address: Boolean,
  },
  components: { PageHeader, VAutocomplete },
  data() {
    return {
      title: "Addressbook1",
      items: [
        {
          text: "Account",
        },
        {
          text: "Addressbook1",
          active: true,
        },
      ],
      towns: [],
      cities: [],
      addresses: [],
      addr: null,
    };
  },
  computed: {},
  mounted() {
    this.updatearray();
    if (this.$route.params.selectmode) {
      this.selectmode = this.$route.params.selectmode;
      this.editmode = this.$route.params.editmode;
    }
  },
  methods: {
    updatearray() {
      axios.get(`delivery_address`).then((response) => {
        this.addresses = response.data["results"];
        this.cities = this.addresses.map((e) => [e.region]);
      });
      if (this.$route.params.address) {
        this.addr = this.$route.params.address;
        this.id = this.addr.id;
        this.address_label = this.addr.address_label;
        this.phone = this.addr.phone;
        this.other_phone = this.addr.other_phone;
        this.selectedCity = this.addr.region__region;
        this.postal_code = this.addr.postal_code;
        this.default_address = this.addr.default_address;
        this.editmode = this.$route.params.editmode;
        this.modaltitle = this.$route.params.modaltitle;
      }
    },
    getRegionTowns() {
      axios
        .get(`pickup_stations/?region=${this.selectedCity}`)
        .then((res) => {
          this.towns = res.data["results"].map((e) => [e.pickup_location]);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    addAddress() {
      var data = {
        customer: JSON.parse(sessionStorage.user).id,
        region: this.selectedCity[0],
        city: this.selectedTown[0],
        address_label: this.address_label,
        other_phone: this.other_phone,
        phone: this.phone,
        postal_code: this.postal_code,
        default_address: this.default_address,
      };
      axios
        .post(`addresses/`, data)
        .then(() => {
          this.$store.dispatch("address/addDefaultAddresses", data);
          sessionStorage.setItem("default_address", JSON.stringify(data));
          axios.get(`pickup_stations/?region=` + this.selectedCity).then((response) => {
            this.$store.dispatch(
              "address/addDeliveryAddresses",
              response.data["results"]
            );
            sessionStorage.setItem(
              "delivery_addresses",
              JSON.stringify(response.data["results"])
            );
            Swal.fire({
              icon: "success",
              title: "Success!",
              html: "Address has been saved!",
              allowOutsideClick: false,
              showConfirmButton: false,
              timer: 2000,
            });
            this.$emit("getuserAddress");
          });
          this.$router.push({ name: "Checkout" });
        })
        .catch((e) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "" + e,
            showConfirmButton: true,
          });
        });
    },
    editAddress() {
      var data = {
        customer: JSON.parse(sessionStorage.user).id,
        id: this.id,
        region: this.selectedCity[0],
        city: this.selectedTown[0],
        address_label: this.address_label,
        other_phone: this.other_phone,
        phone: this.phone,
        postal_code: this.postal_code,
        default_address: this.default_address,
      };
      axios
        .put(`addresses/` + this.id + "/", data)
        .then(() => {
          this.$store.dispatch("address/addDefaultAddresses", data);
          sessionStorage.setItem("default_address", JSON.stringify(data));
          axios.get(`delivery_address?region=` + this.selectedCity).then((response) => {
            this.$store.dispatch(
              "address/addDeliveryAddresses",
              response.data["results"]
            );
            sessionStorage.setItem(
              "delivery_addresses",
              JSON.stringify(response.data["results"])
            );
            Swal.fire({
              icon: "success",
              title: "Success!",
              html: "Address has been saved!",
              allowOutsideClick: false,
              showConfirmButton: false,
              timer: 2000,
            });
            this.$emit("getuserAddress");
          });
          this.$router.push({ name: "Checkout" });
        })
        .catch((e) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "" + e,
            showConfirmButton: true,
          });
        });
    },
  },
  middleware: "authentication",
};
</script>
