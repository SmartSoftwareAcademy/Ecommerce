<template>
  <div class="container mb-16 pb-16 justify-space-between">
    <PageHeader :title="title" :items="items" />
    <div class="p-4 border-top">
      <form>
        <div>
          <div class="row">
            <div class="col-lg-4">
              <div class="form-group mb-4">
                <label for="first_name">Address Label</label>
                <input
                  type="email"
                  class="form-control"
                  v-model="address_label"
                  :disabled="selectmode"
                  id="address_lable"
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
                  v-model="phone_number"
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
                  v-model="box"
                  :items="box"
                  :disabled="selectmode"
                  label="Address"
                  placeholder="567-40100"
                ></v-text-field>
              </div>
            </div>
            <div class="row">
              <div class="form-group mb-0">
                <v-checkbox
                  v-model="defualt_address"
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
    box: String,
    address_label: String,
    phone_number: String,
    other_phone: String,
    defualt_address: Boolean,
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
        this.phone_number = this.addr.phone;
        this.other_phone = this.addr.other_phone;
        this.selectedCity = this.addr.region;
        this.box = this.addr.box;
        this.defualt_address = this.addr.defualt_address;
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
        customer: JSON.parse(localStorage.user).id,
        region: this.selectedCity[0],
        city: this.selectedTown[0],
        address_label: this.address_label,
        other_phone: this.other_phone,
        phone: this.phone_number,
        box: this.box,
        defualt_address: this.defualt_address,
      };
      axios
        .post(`address/`, data)
        .then(() => {
          this.$store.dispatch("address/addDefaultAddresses", data);
          localStorage.setItem("default_address", JSON.stringify(data));
          axios.get(`pickup_stations/?region=` + this.selectedCity).then((response) => {
            this.$store.dispatch(
              "address/addDeliveryAddresses",
              response.data["results"]
            );
            localStorage.setItem(
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
        id: this.id,
        region: this.selectedCity,
        city: this.selectedTown,
        address_label: this.address_label,
        other_phone: this.other_phone,
        phone: this.phone,
        box: this.box,
        defualt_address: this.defualt_address,
      };
      axios
        .put(`addresses/` + this.id + "/", data)
        .then(() => {
          this.$store.dispatch("address/addDefaultAddresses", data);
          localStorage.setItem("default_address", JSON.stringify(data));
          axios.get(`delivery_address?region=` + this.selectedCity).then((response) => {
            this.$store.dispatch(
              "address/addDeliveryAddresses",
              response.data["results"]
            );
            localStorage.setItem(
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
