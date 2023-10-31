<template>
    <div class="container mb-16 pb-16 justify-space-between">
        <PageHeader :title="title" :items="items" />
        <div class="row" v-if="addresses">
            <h5 class="text-uppercase">Click to select</h5>
            <div class="col-lg-6 col-sm-6" v-for="addr in addresses" :key="addr.id">
                <div>
                    <label class="card-radio-label">
                        <input type="radio" name="pay-method" v-model="selectedAddress" :value="addr" :id="addr.id"
                            @click="selectrec(addr.id, addr.index, addr.region, addr.city, addr.zip_code, addr.first_name, addr.last_name, addr.phone, addr.other_phone, addr.delivery_address, addr.defualt_address)"
                            v-b-modal.modal-address class="card-radio-input" hidden />
                        <span class="card-radio text-wrap">
                            <i class="uil uil-postcard text-warning float-end h2"></i>
                            <h5 class="font-weight-bold">{{ addr.pickup_location }}</h5>
                            <v-divider></v-divider>
                            <h5 class="text-wrap">
                                {{ addr.first_name }} {{ addr.last_name }}
                            </h5>
                            <p>
                                <span>{{ addr.delivery_address }}</span><br>
                                <span>{{ addr.region }}</span><br>
                                <span>{{ addr.phone }}</span>
                            </p>
                        </span>
                        <div class="row">
                            <div class="form-group">
                                <button class="btn btn-warning text-white"
                                    @click="edit(addr.id, addr.index, addr.region, addr.city, addr.zip_code, addr.first_name, addr.last_name, addr.phone, addr.other_phone, addr.delivery_address, addr.defualt_address)"
                                    v-b-modal.modal-address><i class="fa fa-edit"></i></button>
                                <button class="btn btn-warning text-white" @click="deleterec(addr.id, addr.zip_code)"
                                    v-b-modal.modal-address><i class="fa fa-trash-alt"></i></button>
                            </div>
                        </div>
                    </label>
                </div>
            </div>
        </div>
        <div class="card">
            <b-modal :title="modaltitle" size="lg" id="modal-address">
                <addAddress @getuserAddress="getuserAddress()" :editmode="editmode" :selectmode="selectmode"
                    :modaltitle="modaltitle" :id="myid" :index="myindex" :selectedCity="selectedCity"
                    :selectedTown="selectedTown" :zip_code="zip_code" :first_name="first_name" :last_name="last_name"
                    :phone_number="phone_number" :other_phone="other_phone" :delivery_address="delivery_address"
                    :defualt_address="defualt_address" />
            </b-modal>
        </div>
    </div>
</template>
<script>
import PageHeader from "@/components/page-header";
import addAddress from '@/views/pages/humanresource/parts/Addressbook';
//import axios from '@/Axiosconfig.js';
//import Swal from "sweetalert2";

export default {
    name: 'Addressbook',
    props: {

    },
    components: { PageHeader, addAddress },
    data() {
        return {
            title: "Addressbook",
            items: [
                {
                    text: "Account",
                },
                {
                    text: "Addressbook",
                    active: true,
                },
            ],
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
            defualt_address: false,
            addresses: [],
            useraddr: null,
            user: null,
            orderNo: null,
            paymentMethod: null,
            selectedAddress: null,
        };
    },
    computed: {

    },
    mounted() {
        this.updatearray();
    },
    methods: {
        updatearray() {
            this.addresses = JSON.parse(localStorage.addresses).address;
        },
        selectrec(
            id,
            index,
            selectedCity,
            selectedTown,
            zip_code,
            first_name,
            last_name,
            phone_number,
            other_phone,
            delivery_address,
            defualt_address,
        ) {
            this.editmode = false;
            this.selectmode = true;
            this.modaltitle = "Select This Shipping address"
            this.myid = id;
            this.myindex = index;
            this.selectedCity = selectedCity;
            this.selectedTown = selectedTown;
            this.zip_code = zip_code;
            this.first_name = first_name;
            this.last_name = last_name;
            this.phone_number = phone_number;
            this.other_phone = other_phone;
            this.delivery_address = delivery_address;
            this.defualt_address = defualt_address;
        },
        edit(
            id,
            index,
            selectedCity,
            selectedTown,
            zip_code,
            first_name,
            last_name,
            phone_number,
            other_phone,
            delivery_address,
            defualt_address,
        ) {
            this.editmode = true;
            this.selectmode = false;
            this.modaltitle = "Edit Shipping address"
            this.myid = id;
            this.myindex = index;
            this.selectedCity = selectedCity;
            this.selectedTown = selectedTown;
            this.zip_code = zip_code;
            this.first_name = first_name;
            this.last_name = last_name;
            this.phone_number = phone_number;
            this.other_phone = other_phone;
            this.delivery_address = delivery_address;
            this.defualt_address = defualt_address;
        },
        deleterec(id, zip_code) {
            this.myid = id;
            this.zip_code = zip_code;
        },
    },
    middleware: "authentication",
};
</script>