<template>
    <div class="conatiner">
        <v-card>
            <v-card-title>Point Of Sale</v-card-title>
            <div class="row m-2 p-2">
                <div class="col-lg-6">
                    <!-- <div id="interactive" class="viewport"><button @click="beepOnScan()">play</button></div> -->
                    <div class="mb-3">
                        <label class="control-label"></label>
                        <multiselect v-model="selectedProduct" :options="products" :option-label="product => product.title"
                            placeholder="Search a product" label="title" track-by="id" :multiple="false"></multiselect>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="mb-3">
                        <v-text-field label="Quantity" type="number" class="mt-2" v-model="quantity"></v-text-field>
                    </div>
                </div>
            </div>
            <div class="row mb-2 p-2">
                <div class="col-lg-6">
                    <v-btn @click="addToCart" class="btn btn-primary">Add to Tray</v-btn>

                </div>
            </div>
        </v-card>
        <v-card>
            <v-card-title>Tray</v-card-title>
            <v-card-text>
                <v-data-table :headers="headers" :items="cart" item-key="id">
                    <template v-slot:[`item.image`]="{ item }"><img :src="item.product.images[0].image"
                            :height="30" /></template>
                    <template v-slot:[`item.title`]="{ item }">{{ item.product.title }}</template>
                    <template v-slot:[`item.price`]="{ item }">{{ item.price }}</template>
                    <template v-slot:[`item.quantity`]="{ item }">{{ item.quantity }}</template>
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-btn @click="removeFromCart(item.index)" icon><v-icon>mdi-delete</v-icon></v-btn>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
        <v-card>
            <v-card-text>
                <v-divider></v-divider>
                <div>
                    <h3>Total: KES {{ total.toFixed(2) }}</h3>
                </div>
                <div v-if="paymentMethod === 'cash'">
                    <h3 class="d-inline">Tendered Amount:</h3>
                    <v-text-field v-model.number="amountPaid" class="my-2 d-inline"></v-text-field>
                    <div>
                        <h2>Change: KES {{ change.toFixed(2) }}</h2>
                    </div>
                </div>
                <v-radio-group v-model="paymentMethod">
                    <v-radio value="cash" label="Cash">Cash</v-radio>
                    <v-radio value="mpesa" label="M-Pesa">M-Pesa</v-radio>
                </v-radio-group>
                <v-btn class="btn btn-primary" v-if="paymentMethod === 'cash'" @click="confirmPayment('completed')">Complete
                    Transaction</v-btn>
                <v-btn v-b-modal.modal-mpesa class="btn btn-primary" v-if="paymentMethod === 'mpesa'">Confirm
                    Payment</v-btn>
            </v-card-text>
        </v-card>
        <!--modal mpesa payment-->
        <b-modal title="Confirm Payment Details" size="lg" id="modal-confirmdetails">
            <form @submit.prevent="handleSubmit">
                <div class="form-group">
                    <p class="text-muted">An M-Pesa stk push will be sent to your phone when you tap 'MAKE PAYMENT'
                        button. Please confirm your pin on the
                        pop-up screen to
                        complete your order!</p>
                    <label for="amount" class="mr-4">Amount To Be Paid:(KES)</label>
                    <span class="d-inline float-right mt-0 pt-0 mb-2">
                        <img :src="require('@/assets/img/shop/mpesa.png')" width="90" height="50" />
                    </span>
                    <input type="text" class="form-control" id="amount" v-model="cart.total" disabled>
                </div>
                <div class="form-group">
                    <label for="phone">Phone Number:</label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="phone" v-model="PhoneNumber"
                            :disabled="!editablePhoneNumber">
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary" type="button"
                                @click="editablePhoneNumber = true">Edit</button>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary text-white mt-2 text-uppercase" @click="placeOrder()">make
                    payment</button>
            </form>
        </b-modal>
        <b-modal id="modal-mpesa" ref="modal" title="Confirm Payment" size="lg">
            <form ref="form" @submit.prevent="handleSubmit">
                <div class="form-group">
                    <p class="text-muted">An M-Pesa stk push will be sent to your phone when you tap 'MAKE PAYMENT'
                        button. Please confirm your pin on the
                        pop-up screen to
                        complete your order!</p>
                    <label for="amount" class="mr-4">Amount:(KES)</label>
                    <span class="d-inline float-right mt-0 pt-0 mb-2">
                        <img :src="require('@/assets/img/shop/mpesa.png')" width="90" height="50" />
                    </span>
                    <span class="form-control" id="amount">{{ total.toFixed(2) }}</span>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <b-form-group label="Amount" label-for="amountpaid" invalid-feedback="Amount paid is required">
                            <b-form-input id="amountpaid" v-model="PhoneNumber" required></b-form-input>
                        </b-form-group>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6 ">
                        <b-button typ="submit" @click="confirmPayment('pending')" variant="success">Request Payment
                        </b-button>
                    </div>
                    <div class="col-lg-6">
                        <b-button typ="submit" @click="confirmPayment('pending')" variant="warning">Save as Pending
                        </b-button>
                    </div>
                </div>
            </form>
        </b-modal>
        <Receipt :items="cart" :headers="receiptHeaders" :total="Number(total.toFixed(2))" :paymentMethod="paymentMethod"
            :receiptNo="paycode" @printReceipt="submitsale" v-show="false" />
    </div>
</template>
<script>
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import Receipt from './printReceipt.vue';
import axios from "@/Axiosconfig.js";
import Swal from "sweetalert2";
import Quagga from 'quagga';

export default {
    name: 'PosCart',
    data() {
        return {
            headers: [
                { text: 'Image', value: 'image', sortable: true },
                { text: 'Title', value: 'title', sortable: true },
                { text: 'Price', value: 'price', sortable: true },
                { text: 'Quantity', value: 'quantity', sortable: true },
                { text: 'Actions', value: 'actions', sortable: true }
            ],
            receiptHeaders: [
                { text: 'Title', value: 'title', sortable: true },
                { text: 'Price', value: 'price', sortable: true },
                { text: 'Quantity', value: 'quantity', sortable: true },
            ],
            products: [],
            selectedProduct: null,
            quantity: 1,
            cart: [],
            paymentMethod: 'cash',
            amountPaid: 0,
            transactionCompleted: false,
            paycode: 'NULL',
            trstatus: 'pending',
            editablePhoneNumber: false,
            PhoneNumber: '0743793901',
            beepsound: require('@/assets/audio/beep.mp3'),
        }
    },
    components: {
        Multiselect,
        Receipt,
    },
    computed: {
        total() {
            return this.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        },
        change() {
            return this.amountPaid - this.total;
        },
        hiddenPhone() {
            // Replace the first 4 characters with x
            const hiddenChars = this.PhoneNumber.substr(0, 4).replace(/./g, 'x')
            // Return the hidden text with the last 4 digits
            return hiddenChars + '-' + this.PhoneNumber.substr(-4)
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
        // this.initializeQuagga();
        // Quagga.onDetected(this.handleBarcode);
    },
    beforeDestroy() {
        Quagga.offDetected(this.handleBarcode);
        Quagga.stop();
    },
    methods: {
        initializeQuagga() {
            Quagga.init(
                {
                    inputStream: {
                        name: 'Live',
                        type: 'LiveStream',
                        target: '#interactive',
                        constraints: {
                            width: { min: 250 },
                            height: { min: 150 },
                        },
                    },
                    decoder: {
                        readers: ['ean_reader'],
                    },
                },
                function (err) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log('Initialization finished. Ready to start');
                    Quagga.start();
                }
            );
        },
        beepOnScan() {
            const audio = new Audio(this.beepsound); // Replace with your sound file path
            audio.play();
        },
        handleBarcode(result) {
            const barcode = result.codeResult.code;
            // Process the scanned barcode, e.g., send it to an API, add the product to the tray, etc.
            console.log('Scanned barcode:', barcode);
            this.beepOnScan()
        },
        generateTrCode(n) {
            const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let result = '';
            for (let i = 0; i < n; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return result;
        },
        updatearrays() {
            Swal.fire({
                title: "Please Wait !",
                html: "Loading data...", // add html attribute if you want or remove
                allowOutsideClick: false,
                showConfirmButton: false,
                willOpen: () => {
                    Swal.showLoading();
                },
            });
            axios
                .get(`products`)
                .then((response) => {
                    // JSON responses are automatically parsed.
                    this.products = response.data['results'];
                    Swal.close();
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
        addToCart() {
            const product = this.selectedProduct;
            const quantity = this.quantity;
            const price = product.price;
            this.cart.push({ product, quantity, price });
            this.selectedProduct = null;
        },
        removeFromCart(index) {
            this.cart.splice(index, 1);
        },
        submitsale(data) {
            axios.post("salesadd/", data).then((res) => {
                var orderId = this.generateTrCode(10);
                if (orderId == null) {
                    Swal.fire("Payment Code validation error!", "Invalid payment code!", "warning"); // invalid phone number
                    return;
                }
                if (this.paymentMethod === 'mpesa') {
                    //validate phone number
                    if (/^(2547|2541)\d{8}$/.test(this.formattedPhoneNumber) &&
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
                    axios.post('stkpush/', {
                        orderId: orderId,
                        phone: this.formattedPhoneNumber,
                        total: this.total.toFixed(2),
                        reference: '5464747',
                        tr_description: 'Bengomall',
                    }).then((res) => {
                        console.log(res.data);
                        var pwd = res.data['password'];
                        var checkoutID = res.data['checkoutID'];
                        var timestamp = res.data['timestamp'];
                        axios.post('payment/confirm/', {
                            pwd: pwd,
                            timestamp: timestamp,
                            chekoutID: checkoutID,
                            orderId: orderId,
                        }).then((res) => {
                            Swal.close();
                            Swal.fire({
                                position: "center",
                                icon: 'success',
                                title: "Success!",
                                html: res.data.toString(),
                                showConfirmButton: false,
                                timer: 3000,
                            });
                            if (!res.data.toString().includes("cancel")) {
                                this.$emit('printReceipt');
                            }
                        });
                    });
                }
                Swal.fire({
                    position: "center",
                    icon: res.data.icon,
                    title: res.data.title,
                    html: res.data.msg,
                    showConfirmButton: false,
                    timer: 1500,
                });
                this.$emit('printReceipt');
            }).cath((e) => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "" + e,
                    showConfirmButton: true,
                    timer: 3000,
                });
            });
            this.clearValues();
        },
        confirmPayment(status) {
            var formdata = new FormData();
            this.paycode = this.generateTrCode(10);
            this.cart.forEach((item) => {
                console.log(item)
                formdata.append('sku', item.product.sku);
                formdata.append('price', item.product.price);
                formdata.append('qty', item.quantity);
                formdata.append('total', (item.quantity * item.product.price).toFixed(2));
            })
            if (this.paymentMethod == 'cash') {
                if (Number(this.amountPaid) >= Number(this.total)) {
                    this.transactionCompleted = true;
                    this.trstatus = status;
                    this.$emit('printReceipt');
                } else {
                    alert('Amount paid:' + this.amountPaid + ' is less than Total:' + this.total.toFixed(2))
                    return;
                }
            } else if (this.paymentMethod == 'mpesa') {
                this.trstatus = status;
                this.$bvModal.hide('modal-mpesa');
            }
            formdata.append('tax_amount', 0.16 * this.total.toFixed(2));
            formdata.append('tax', 0.16);
            formdata.append('change_amount', this.change.toFixed(2));
            formdata.append('tendered_amount', this.amountPaid);
            formdata.append('sub_total', 0.84 * this.total.toFixed(2));
            formdata.append('grand_total', this.total.toFixed(2));
            if (this.paycode == null) {
                Swal.fire("Payment Code validation error!", "Invalid payment code!", "warning"); // invalid phone number
                return;
            }
            formdata.append('paycode', this.paycode.toUpperCase());
            formdata.append('status', this.trstatus);
            formdata.append('paymethod', this.paymentMethod);
            formdata.append('attendant', JSON.parse(localStorage.user).id);
            this.submitsale(formdata);
        },
        handleSubmit() {

        },
        clearValues() {
            this.transactionCompleted = false;
            this.cart = [];
            this.change = 0
        }
    }
}
</script>
<style scoped>
.viewport {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
}
</style>