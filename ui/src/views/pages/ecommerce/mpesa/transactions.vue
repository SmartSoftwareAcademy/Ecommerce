<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row justify-content-between">
      <div class="col-sm-6">
        <div class="row justify-content-between">
          <div class="col-sm-2">
            <button
              type="button"
              class="btn btn-warning mb-3"
              v-b-modal.modal-Transaction
            >
              <i class="mdi mdi-plus me-1"></i> Record Transaction
            </button>
          </div>
          <div class="col-sm-2">
            <button
              class="btn btn-secondary waves-effect waves-light uil-export"
              @click="getrpt()"
            >
              Export to CSV
            </button>
          </div>
          <div class="col-sm-2">
            <button
              @click="printpdf('p')"
              v-b-modal.modal-Print
              class="btn btn-secondary waves-effect waves-light uil-file"
            >
              Print PDF
            </button>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="float-end">
          <div class="form-inline mb-3">
            <div
              class="input-daterange input-group"
              data-provide="datepicker"
              data-date-format="dd M, yyyy"
              data-date-autoclose="true"
            >
              <div class="form-group">
                <label for="transactionType">Transaction Type</label>
                <select v-model="transactionType" class="form-control">
                  <option value="withdrawal">Withdrawal</option>
                  <option value="deposit">Deposit</option>
                </select>
              </div>
              <input
                type="date"
                class="form-control text-left"
                placeholder="11/13/2023"
                name="From"
                v-model="fromdate"
              />
              <input
                type="date"
                class="form-control text-left"
                placeholder="11/13/2023"
                name="To"
                v-model="todate"
              />
              <div class="input-group-append">
                <button type="button" class="btn btn-primary" @click="updatearray()">
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
            <b-form-select
              v-model="perPage"
              size="sm"
              :options="pageOptions"
            ></b-form-select
            >&nbsp;entries
          </label>
        </div>
      </div>
      <!-- Search -->
      <div class="col-sm-12 col-md-6">
        <div id="tickets-table_filter" class="dataTables_filter text-md-end">
          <label class="d-inline-flex align-items-center fw-normal">
            Search:
            <b-form-input
              v-model="filter"
              type="search"
              class="form-control form-control-sm ms-2"
            ></b-form-input>
          </label>
        </div>
      </div>
      <!-- End search -->
    </div>
    <!-- Table -->
    <div class="table-responsive mb-0">
      <b-table
        table-class="table table-centered datatable table-card-list"
        thead-tr-class="bg-transparent"
        :items="transactions"
        :fields="fields"
        responsive="sm"
        :per-page="perPage"
        :current-page="currentPage"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :filter="filter"
        :filter-included-fields="filterOn"
        @filtered="onFiltered"
      >
        <template v-slot:cell(check)="data">
          <div class="custom-control custom-checkbox text-center">
            <input
              type="checkbox"
              class="custom-control-input"
              :id="`contacusercheck${data.item.id}`"
            />
            <label
              class="custom-control-label"
              :for="`contacusercheck${data.item.id}`"
            ></label>
          </div>
        </template>
        <template v-slot:cell:(invoice_id)="data">
          <router-link
            :to="{ name: 'Transaction Detail', params: { transaction: data.item } }"
          ></router-link>
        </template>
        <template v-slot:cell(id)="data">
          <a href="javascript: void(0);" class="text-dark fw-bold">
            {{ data.item.id }}
          </a>
        </template>

        <template v-slot:cell(created_at)="data">
          <a href="javascript: void(0);" class="text-dark fw-bold">
            {{ new Date(data.item.created_at).toDateString() }}
          </a>
        </template>

        <template v-slot:cell(status)="data">
          <div
            class="badge rounded-pill bg-soft-success font-size-12"
            :class="{ 'bg-soft-warning': data.item.status === 'Pending' }"
          >
            {{ data.item.status }}
          </div>
        </template>

        <template v-slot:cell(billing_name)="data">
          <a href="#" class="text-body"
            >{{ data.item.customer.user.first_name }}
            {{ data.item.customer.user.last_name }}</a
          >
        </template>
        <template v-slot:cell(download)>
          <div>
            <button class="btn btn-light btn-sm w-xs">
              Pdf
              <i class="uil uil-download-alt ms-2"></i>
            </button>
          </div>
        </template>
        <template v-slot:cell(action)>
          <ul class="list-inline mb-0">
            <li class="list-inline-item">
              <a
                href="javascript:void(0);"
                class="px-2 text-primary"
                v-b-tooltip.hover
                title="Edit"
              >
                <i class="uil uil-pen font-size-18"></i>
              </a>
            </li>
            <li class="list-inline-item">
              <a
                href="javascript:void(0);"
                class="px-2 text-danger"
                v-b-tooltip.hover
                title="Delete"
              >
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
            <b-pagination
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
            ></b-pagination>
          </ul>
        </div>
      </div>
      <!--modals-->
      <b-modal id="modal-Print" title="Print PDF" hide-footer size="bg" centered>
        <reportdet
          :title="title"
          :orderData="orderData"
          :pl="pl"
          :headers="headers"
          :uniqueCars="uniqueCars"
          :shome="showme"
          v-show="showme"
        ></reportdet>
      </b-modal>
      <b-modal id="modal-Transaction" :title="modaltitle" hide-footer size="xl" centered>
        <addTransaction
          :id="myid"
          :myindex="myindex"
          :editmode="editmode"
          :modaltitle="modaltitle"
          :transactions="transactions"
        >
        </addTransaction>
      </b-modal>
    </div>
    <!-- Daily Summary -->
    <div class="row bg-light mt-4">
      <div class="col-sm-6">
        <v-card>
          <v-card-title outlined class="bg-light">
            <h3 class="m-4">General Summary</h3>
          </v-card-title>
          <v-card-text>
            <p>Total Deposits: {{ totalDeposits }}</p>
            <p>Total Withdrawals: {{ totalWithdrawals }}</p>
          </v-card-text>
        </v-card>
      </div>
      <div class="col-sm-6">
        <v-card>
          <v-card-title outlined class="bg-light text-white-50">
            <h3 class="m-4">Daily Summary</h3>
            <h5 class="m-4 float-end">
              Date:{{ fromdate || new Date().toDateString() }}
            </h5>
          </v-card-title>
          <v-card-text>
            <p>Total Deposits: {{ daily_summary.deposits }}</p>
            <p>Total Withdrawals: {{ daily_summary.withdrawals }}</p>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </Layout>
</template>
<script>
import Layout from "@/views/layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import reportdet from "@/components/report/header";
import Swal from "sweetalert2";
import axios from "@/Axiosconfig";
import addTransaction from "./addTransaction";

export default {
  name: "transactions",
  page: {
    title: "Invoice List",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: {
    Layout,
    PageHeader,
    reportdet,
    addTransaction,
  },
  data() {
    return {
      items: [
        {
          text: "USER:" + JSON.parse(localStorage.user).name,
        },
        {
          text: "Transactions",
          active: true,
        },
      ],
      modaltitle: "Record New Transaction",
      transactionType: "deposit",
      transactionTypes: ["deposit", "withdrawal"],
      transactionRef: "",
      clientName: "",
      clientId: "",
      amount: 0,
      date: "",
      headers: null,
      uniqueCars: null,
      showme: true,
      pl: "",
      editmode: false,
      title: "Transaction List",
      transactions: [],
      myid: 0,
      myindex: 0,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [1, 10, 25, 50, 100],
      filter: null,
      filterOn: [],
      sortBy: "id",
      sortDesc: false,
      daily_summary: null,
      totalDeposits: 0,
      totalWithdrawals: 0,
      fromdate: "",
      todate: "",
      fields: [
        {
          key: "check",
          label: "#",
          sortable: true,
        },
        {
          key: "date",
        },
        {
          key: "transactionRef",
          sortable: true,
        },
        {
          key: "transactionType",
          sortable: true,
        },
        {
          key: "clientName",
          sortable: true,
        },
        {
          key: "clientId",
          sortable: true,
        },
        {
          key: "amount",
          sortable: true,
        },
        {
          key: "download",
          sortable: true,
        },

        "action",
      ],
    };
  },
  computed: {
    rows() {
      return this.transactions.length;
    },
  },
  mounted() {
    // Set the initial number of items
    this.updatearray();
    this.totalRows = this.transactions.length;
  },
  methods: {
    updatearray() {
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
        .get(
          `transactions/?type=${this.transactionType}&fromdate=${this.fromdate}&todate=${this.todate}`
        )
        .then((response) => {
          // JSON responses are automatically parsed.
          this.transactions = response.data["transactions"];
          this.totalDeposits = response.data["total_deposit"];
          this.totalWithdrawals = response.data["total_withdrawal"];
          this.daily_summary = response.data.daily_summary;
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
    printpdf(pl) {
      //console.log(this.tokenString);
      this.pl = pl;
      const data = this.transactions.map((row) => ({
        ID: row.id,
        Type: row.transactionType,
        Ref: row.transactionRef,
        "Amount(KES)": row.amount,
        "Client Name": row.clientName,
        "Client ID": row.clientId,
        "Transaction Date": row.date,
      }));

      //get headers
      const headers = Object.keys(data[0]);
      const cars = [];
      Object.entries(data).forEach((val) => {
        const [key, value] = val;
        console.log(key, value);
        cars.push(Object.values(data[key]));
      });

      const uniqueCars = Array.from(new Set(cars));
      this.headers = headers;
      this.uniqueCars = uniqueCars;
      //alert(headers);
    },

    getrpt() {
      //alert(new Date());
      const d = new Date();
      const year = d.getFullYear();
      const month = d.getMonth();
      const date = d.getDate();

      const hour = d.getHours();
      const min = d.getMinutes();
      const sec = d.getSeconds();
      const msec = d.getMilliseconds();
      const filename =
        year + "-" + month + "-" + date + "-" + hour + "-" + min + "-" + sec + "-" + msec;
      //alert(filename);
      const data = this.transactions.map((row) => ({
        ID: row.id,
        Type: row.transactionType,
        Ref: row.transactionRef,
        "Amount(KES)": row.amount,
        "Client Name": row.clientName,
        "Client ID": row.clientId,
        "Transaction Date": row.date,
      }));
      //alert("");
      const csvRows = [];
      //get headers
      const headers = Object.keys(data[0]);

      csvRows.push(headers.join(","));
      //alert(csvRows);
      //loop over the headers
      for (const row of data) {
        const values = headers.map((header) => {
          const escaped = ("" + row[header]).replace(/"/g, '\\"');
          // alert(escaped);
          return '"' + escaped + '"'; //'" + escaped + "';
        });
        csvRows.push(values.join(","));
      }
      //alert(csvData);
      const csvData = csvRows.join("\n");
      //alert(csvData);

      const blob = new Blob([csvData], { type: "textcsv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.setAttribute("hidden", "");
      a.setAttribute("href", url);
      a.setAttribute("download", this.title + filename + ".csv");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    /**
     * Search the table data with search input
     */
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    handleSubmit() {
      console.log("Error on submit");
    },
    deleterec(index, myid, invoiced_id) {
      this.myid = myid;
      this.invoiced_id = invoiced_id;
      Swal.fire({
        title: "Are you sure, you want to delete? " + invoiced_id,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#34c38f",
        cancelButtonColor: "#f46a6a",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          axios
            .delete(`invoices/` + myid + `/`)
            .then(() => {
              this.orderData.splice(index, 1);
              Swal.fire(
                invoiced_id + " Deleted!",
                "Your record has been deleted.",
                "success"
              );
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
        }
      });
    },
    clearvalues() {
      this.id = "";
      this.invoiced_id = "";
    },
    addTransaction: function () {
      this.transactions.push({
        type: this.transactionType,
        reference: this.transactionRef,
        name: this.name,
        amount: this.amount,
        date: this.date,
      });

      // Clear form fields
      this.transactionType = "deposit";
      this.transactionRef = "";
      this.name = "";
      this.amount = 0;
      this.date = "";
    },
  },
};
</script>
