<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import axios from "@/Axiosconfig.js";
import Swal from "sweetalert2";
import Receipt from './printReceipt.vue';

export default {
    page: {
        title: "Sales List",
        meta: [
            {
                name: "description",
                content: appConfig.description,
            },
        ],
    },
    components: { Layout, PageHeader, Receipt },
    data() {
        return {
            title: "Sales List",
            items: [
                {
                    text: "Sales",
                },
                {
                    text: "Sales List",
                    active: true,
                },
            ],
            saleslist: [
            ],
            totalRows: 1,
            currentPage: 1,
            perPage: 10,
            pageOptions: [10, 25, 50, 100],
            filter: null,
            filterOn: [],
            sortBy: "age",
            sortDesc: false,
            total: 0,
            salesitems: [],
            paymentMethod: "",
            receiptHeaders: [
                { text: 'Title', value: 'title', sortable: true },
                { text: 'Price', value: 'price', sortable: true },
                { text: 'Quantity', value: 'quantity', sortable: true },
            ],
            paycode: "",
            fields: [
                {
                    key: "check",
                    label: "#",
                },
                {
                    key: "code",
                    label: "Sale ID",
                    sortable: true,
                },
                {
                    key: "date",
                    label: "Transaction Date",
                    sortable: true,
                },
                {
                    key: "product_title",
                    label: "Product Name",
                    sortable: true,
                },
                {
                    key: "qty",
                    sortable: true,
                },
                {
                    key: "price",
                    sortable: true,
                },
                {
                    key: "total",
                    sortable: true,
                },
                {
                    key: "status",
                    sortable: true,
                },
                {
                    key: "paymethod",
                    label: "Payment Method",
                    sortable: true,
                },
                {
                    key: "status",
                    label: "Status",
                    sortable: true,
                },
                {
                    key: "download",
                    label: "Print Receipt",
                },
                "action",
            ],
        };
    },
    computed: {
        /**
         * Total no. of records
         */
        rows() {
            return this.saleslist.length;
        },
    },
    mounted() {
        // Set the initial number of items
        this.totalRows = this.items.length;
        this.updatearrays()
    },
    methods: {
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
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
                .get(`salesList`)
                .then((response) => {
                    // JSON responses are automatically parsed.
                    this.saleslist = response.data;
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
        deleterec(index, id, code) {
            Swal.fire({
                title: "Are you sure, you want to delete sale #" + code + "?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#000000",
                cancelButtonColor: "#f46a6a",
                confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                if (result.value) {
                    axios
                        .delete('sales/' + id + '/')
                        .then(() => {
                            this.saleslist.splice(index, 1);
                            Swal.fire("Deleted!", code + " has been deleted.", "success");
                        })
                        .catch((e) => {
                            Swal.fire({
                                position: "center",
                                icon: 'error',
                                title: 'Error!',
                                html: e,
                                showConfirmButton: false,
                                timer: 1500,
                            })
                        });
                }
            });
        },
        openDialog(index, id) {
            Swal.fire({
                title: 'Enter transaction code?',
                input: 'text',
                inputPlaceholder: 'Enter transaction code here',
                showCancelButton: true,
                confirmButtonText: 'Complete Sale',
                cancelButtonText: 'Cancel',
                inputValidator: (value) => {
                    // Perform any validation on the user input
                    if (!value) {
                        return 'Please enter transaction code to continue!'
                    } else if (value == 'NULL') {
                        return `Transaction code cannot be ${value}!`
                    } else if (value.length < 5) {
                        return `Transaction code ${value} is too short!`
                    }
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    this.completetr(index, id, result.value);
                }
            });
        },
        async completetr(index, id, code) {
            await axios
                .post('completesales/' + id + '/' + code + '/')
                .then((res) => {
                    Swal.fire(res.data.title, res.data.msg, res.data.icon).then(() => {
                        this.saleslist[index].sales_details.status = 'completed';
                        this.saleslist[index].sales_details.code = code;
                    });
                })
                .catch((e) => {
                    Swal.fire({
                        position: "center",
                        icon: 'error',
                        title: 'Error!',
                        html: e,
                        showConfirmButton: false,
                        timer: 1500,
                    })
                });
        },
        printReceipt(item, total, paymentMethod, paycode) {
            this.total = total;
            item = { "product": { "title": item.product_title }, "quantity": item.qty, "price": item.price }
            this.salesitems.push(item);
            this.paycode = paycode;
            this.paymentMethod = paymentMethod;
            console.log(item)
        },
    },
    middleware: "authentication",
};
</script>

<template>
    <Layout>
        <PageHeader :title="title" :items="items" />

        <div class="row">
            <div class="col-md-4">
                <div>
                    <button type="button" class="btn btn-success mb-3">
                        <i class="mdi mdi-plus me-1"></i> Add Sale
                    </button>
                </div>
            </div>
            <div class="col-md-8">
                <div class="float-end">
                    <div class="form-inline mb-3">
                        <div class="input-daterange input-group" data-provide="datepicker" data-date-format="dd M, yyyy"
                            data-date-autoclose="true">
                            <input type="text" class="form-control text-left" placeholder="From" name="From" />
                            <input type="text" class="form-control text-left" placeholder="To" name="To" />
                            <div class="input-group-append">
                                <button type="button" class="btn btn-primary">
                                    <i class="mdi mdi-filter-variant"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12 col-md-6">
                <div id="tickets-table_length" class="dataTables_length">
                    <label class="d-inline-flex align-items-center fw-normal">
                        Show&nbsp;
                        <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;entries
                    </label>
                </div>
            </div>
            <!-- Search -->
            <div class="col-sm-12 col-md-6">
                <div id="tickets-table_filter" class="dataTables_filter text-md-end">
                    <label class="d-inline-flex align-items-center fw-normal">
                        Search:
                        <b-form-input v-model="filter" type="search"
                            class="form-control form-control-sm ms-2"></b-form-input>
                    </label>
                </div>
            </div>
            <!-- End search -->
        </div>
        <!-- Table -->
        <div class="table-responsive mb-0">
            <b-table table-class="table table-centered datatable table-card-list" thead-tr-class="bg-transparent"
                :items="saleslist" :fields="fields" responsive="sm" :per-page="perPage" :current-page="currentPage"
                :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn"
                @filtered="onFiltered">
                <template v-slot:cell(check)="data">
                    <div class="custom-control custom-checkbox text-center">
                        <input type="checkbox" class="custom-control-input" :id="`contacusercheck${data.item.id}`" />
                        <label class="custom-control-label" :for="`contacusercheck${data.item.id}`"></label>
                    </div>
                </template>
                <template v-slot:cell(id)="data">
                    <a href="javascript: void(0);" class="text-dark fw-bold">
                        {{ data.item.id }}
                    </a>
                </template>
                <template v-slot:cell(code)="data">
                    <a href="javascript: void(0);" class="text-dark fw-bold">
                        {{ data.item.sales_details.code }}
                    </a>
                </template>

                <template v-slot:cell(status)="data">
                    <div class="badge rounded-pill bg-soft-success font-size-12"
                        :class="{ 'bg-soft-warning': data.item.sales_details.status === 'pending' }">
                        {{ data.item.sales_details.status }}
                    </div>
                </template>

                <template v-slot:cell(date)="data">
                    <a href="#" class="text-body">{{ data.item.sales_details.date.split("T")[0] }}</a>
                </template>
                <template v-slot:cell(grand_total)="data">
                    <a href="#" class="text-body">{{ data.item.sales_details.grand_total }}</a>
                </template>
                <template v-slot:cell(paymethod)="data">
                    <a href="#" class="text-body">{{ data.item.sales_details.paymethod }}</a>
                </template>
                <template v-slot:cell(download)="data">
                    <div>
                        <button class="btn btn-light btn-sm w-xs" v-b-modal.modal-receipt @click="printReceipt(
                            data.item,
                            data.item.total,
                            data.item.sales_details.paymethod,
                            data.item.sales_details.code
                        )">
                            <i class="uil uil-file ms-2 text-primary"></i>
                        </button>
                    </div>
                </template>
                <template v-slot:cell(action)="data">
                    <ul class="list-inline mb-0">
                        <li class="list-inline-item" v-if="data.item.sales_details.status == 'pending'">
                            <a href="javascript:void(0);" class="px-2 text-primary" v-b-tooltip.hover title="complete"
                                @click="openDialog(data.index, data.item.sales_details.id)">complete
                            </a>
                        </li>
                        <li class="list-inline-item" v-if="data.item.sales_details.status == 'completed'">
                            <a href="javascript:void(0);" class="px-2 text-danger" v-b-tooltip.hover title="Delete"
                                @click="deleterec(data.index, data.item.sales_details.id, data.item.sales_details.code)">
                                <i class="uil uil-trash-alt font-size-18"></i>
                            </a>
                        </li>
                    </ul>
                </template>
            </b-table>
        </div>
        <div class="row">
            <div class="col">
                <div class="dataTables_paginate paging_simple_numbers float-end">
                    <ul class="pagination pagination-rounded">
                        <!-- pagination -->
                        <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage"></b-pagination>
                    </ul>
                </div>
            </div>
        </div>
        <!--modals-->
        <b-modal id="modal-receipt" ref="modal" title="Print Receipt" size="lg" class="">
            <Receipt :items="salesitems" :headers="receiptHeaders" :total="total" :paymentMethod="paymentMethod"
                :receiptNo="paycode" />
        </b-modal>
    </Layout>
</template>
