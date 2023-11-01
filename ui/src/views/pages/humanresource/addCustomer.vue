<script>
// import vue2Dropzone from "vue2-dropzone";
// import "vue2-dropzone/dist/vue2Dropzone.min.css";
import "vue-multiselect/dist/vue-multiselect.min.css";
import Multiselect from "vue-multiselect";
import addAddress from '@/views/pages/humanresource/parts/Addressbook';
import Swal from "sweetalert2";
import axios from "@/Axiosconfig.js";

const newheaders = axios.defaults.headers;
newheaders["Content-Type"] = "multipart/form-data";
axios.defaults.headers = newheaders;
export default {
    props: {
        orderData: Array,
        name: String,
        address: Array,
        modaltitle: String,
        editmode: Boolean,
        id: Number,
        myindex: Number,
    },
    components: {
        // vueDropzone: vue2Dropzone,
        Multiselect,
        addAddress,
    },
    data() {
        return {
            dropzoneOptions: {
                url: window.$http + "/customer/images/",
                autoProcessQueue: false,
                uploadMultiple: true,
                maxFilesize: 2, // maximum size of each file in MB
                acceptedFiles: "image/*", // restrict to image files only
                addRemoveLinks: true, // show remove button on uploaded files
                dictDefaultMessage: 'Drop Category display image here or click to upload',
                maxFiles: 10,
                headers: window.$headers,
            },
            title: "Add Customer",
            items: [
                {
                    text: "USER: Admin",
                },
                {
                    text: "Add Customer",
                    active: true,
                },
            ],
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
        };
    },
    mounted() {
        this.updatearray();
    },
    methods: {
        updatearray() {
            axios
                .get("addresses")
                .then((res) => {
                    this.addresses = res.data['results']
                })
                .catch((e) => {
                    this.errors.push(e);
                });
        },
        addRec() {
            if (this.name.trim() == "") {
                Swal.fire("Please enter Customer Name!");
                return;
            }
            var data = new FormData();
            this.address.forEach((address) => {
                data.append('customers', address.id);
            });
            data.append('name', this.name);
            var orderid = this.orderData.length + 1;
            this.orderData.push({
                id: orderid,
                name: this.name,
                addresses: this.address,
            });
            axios
                .post("customers/", data)
                .then(() => {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your work has been saved. Customer " + this.name + " Added",
                        showConfirmButton: false,
                        timer: 3000,
                    }).then((result) => {
                        result;
                        this.clearvalues();
                    });
                })
                .catch((e) => {
                    this.errors.push(e);
                });
        },
        handleSubmit() {
            console.log("Error on submit");
        },
        editRec() {
            if (this.name.trim() == "") {
                Swal.fire("Please enter Supplier Name");
                return;
            }
            var data = new FormData();
            this.address.forEach((addr) => {
                data.append('addresses', addr.id);
            });
            data.append('user', this.user.id);
            data.append('id', this.id);
            axios
                .put("customers/" + this.id + "/", data)
                .then(() => {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your work has been saved. Customer " + this.user,
                        showConfirmButton: false,
                        timer: 1500,
                    }).then((result) => {
                        result;
                        this.orderData[this.myindex].user = this.user;
                        this.orderData[this.myindex].addresses = this.address;
                    });
                })
                .catch((e) => {
                    this.errors.push(e);
                });

        },
    },
};
</script>

<template>
    <div class="container-fluid p-4 m-4">
        <form @submit.prevent="handleSubmit">
            <div class="row  align-items-center justify-content-center">
                <div class="col-sm-6">
                    <div class="input-group">
                        <div class="input-group-text col-sm-4">Name:</div>
                        <input class="form-control" type="text" placeholder="Enter Supplier Name" v-model="name" />
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="mb-3">
                        <label for="suppliername">Address<button class="badge badge-pill bg-primary"
                                v-b-modal.modal-address><i class="fa fa-plus"></i> Add New</button></label>
                        <multiselect v-model="address" :options="addresses" :option-label="address => address.city"
                            placeholder="Search an address" label="city" track-by="id" :multiple="true" :editable="true">
                        </multiselect>
                    </div>
                </div>
            </div>
        </form>
        <div class="row">
            <div class="col-sm-10"></div>
            <div class="col-sm-2">
                <b-button v-show="!editmode" variant="success" @click="addRec()">Add Supplier</b-button>
                <b-button v-show="editmode" variant="success" @click="editRec()">Edit Supplier</b-button>
            </div>
        </div>
        <!--modals-->
        <div class="card">
            <b-modal :title="modaltitle" size="lg" id="modal-address">
                <addAddress @getuserAddress="updatearray()" :editmode="false" :selectmode="false" :modaltitle="''" :id="0"
                    :selectedCity="null" :selectedTown="selectedTown" :zip_code="zip_code" :first_name="first_name"
                    :last_name="last_name" :phone_number="phone_number" :other_phone="other_phone"
                    :delivery_address="delivery_address" :default_address="default_address" />
            </b-modal>
        </div>
    </div>
</template>