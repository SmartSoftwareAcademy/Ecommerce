<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import axios from "@/Axiosconfig.js";
import Swal from "sweetalert2";
import Receipt from "./printReceipt.vue";
import reportdet from "@/components/report/header";

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
  components: { Layout, PageHeader, Receipt, reportdet },
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
      headers: null,
      uniqueCars: null,
      showme: true,
      pl: "",
      saleslist: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 25,
      pageOptions: [1, 5, 10, 25, 50, 100, 500, 1000, 1500, 2000],
      filter: null,
      filterOn: [],
      sortBy: "age",
      sortDesc: false,
      total: 0,
      salesitems: [],
      paymentMethod: "",
      status: "",
      fromdate: "",
      todate: "",
      limit: 12,
      offset: 0,
      receiptHeaders: [
        { text: "Title", value: "title", sortable: true },
        { text: "retail_price", value: "retail_price", sortable: true },
        { text: "Quantity", value: "quantity", sortable: true },
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
          key: "sales_items.length",
          label: "Qty",
          sortable: true,
        },
        {
          key: "grand_total",
          label: "Total",
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
    this.updatearrays();
    this.totalRows = this.saleslist.length;
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
        .get(
          `salesList/?limit=${this.limit}&offset=${this.offset}&status=${this.status}&fromdate=${this.fromdate}&todate=${this.todate}`
        )
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
    handlePageChange(newPage) {
      this.currentPage = newPage;
      this.limit = this.perPage;
      this.offset = (this.currentPage - 1) * this.perPage;
      this.updatearrays();
    },
    printpdf(pl) {
      //console.log(this.tokenString);
      this.pl = pl;
      const data = this.saleslist.map((row) => ({
        ID: row.id,
        "Sale ID": row.code,
        "Transaction Date": row.date,
        QTY: row.sales_items.length,
        "Total(KES)": row.grand_total,
        "Payment Method": row.paymethod,
        status: row.status,
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
      const data = this.saleslist.map((row) => ({
        ID: row.id,
        "Sale ID": row.code,
        "Transaction Date": row.date,
        QTY: row.sales_items.length,
        "Total(KES)": row.grand_total,
        "Payment Method": row.paymethod,
        status: row.status,
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
            .delete("sales/" + id + "/")
            .then(() => {
              this.saleslist.splice(index, 1);
              Swal.fire("Deleted!", code + " has been deleted.", "success");
            })
            .catch((e) => {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Error!",
                html: e,
                showConfirmButton: false,
                timer: 1500,
              });
            });
        }
      });
    },
    openDialog(index, id) {
      Swal.fire({
        title: "Enter transaction code?",
        input: "text",
        inputPlaceholder: "Enter transaction code here",
        showCancelButton: true,
        confirmButtonText: "Complete Sale",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          // Perform any validation on the user input
          if (!value) {
            return "Please enter transaction code to continue!";
          } else if (value == "NULL") {
            return `Transaction code cannot be ${value}!`;
          } else if (value.length < 5) {
            return `Transaction code ${value} is too short!`;
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
        .post("completesales/" + id + "/" + code + "/")
        .then((res) => {
          this.$emit("printReceipt");
          Swal.fire(res.data.title, res.data.msg, res.data.icon).then(() => {
            this.saleslist[index].sales_details.status = "completed";
            this.saleslist[index].sales_details.code = code;
          });
        })
        .catch((e) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Error!",
            html: e,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
    viewReceipt(saleitem) {
      this.total = saleitem.grand_total;
      this.receiptNo = saleitem.code;
      this.paymentMethod = saleitem.paymethod;
      let items = [];
      saleitem.sales_items.forEach((i) => {
        items.push({
          product_title: i.product_title,
          retail_price: i.retail_price,
          quantity: i.qty,
        });
      });
      this.salesitems = items;
      this.$emit("printReceipt");
    },
  },
  middleware: "authentication",
};
</script>

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
              <i class="mdi mdi-plus me-1"></i> Raise Invoice
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
                <label for="transactionType">Status</label>
                <select v-model="status" class="form-control">
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
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
                <button type="button" class="btn btn-primary" @click="updatearrays()">
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
              @input="handlePageChange(currentPage)"
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
        :items="saleslist"
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
        <template v-slot:cell(id)="data">
          <a href="javascript: void(0);" class="text-dark fw-bold">
            {{ data.item.id }}
          </a>
        </template>

        <template v-slot:cell(status)="data">
          <div
            class="badge rounded-pill bg-soft-success font-size-12"
            :class="{ 'bg-soft-warning': data.item.status === 'pending' }"
          >
            {{ data.item.status }}
          </div>
        </template>
        <template v-slot:cell(date)="data">
          <a href="#" class="text-body">{{
            data.item.date.split("T")[0] +
            " " +
            data.item.date.split("T")[1].split(".")[0]
          }}</a>
        </template>
        <template v-slot:cell(download)="data">
          <div>
            <button
              class="btn btn-light btn-sm w-xs"
              v-b-modal.modal-receipt
              @click="viewReceipt(data.item), $emit('printReceipt')"
            >
              <i class="uil uil-file ms-2 text-primary"></i>
            </button>
          </div>
        </template>
        <template v-slot:cell(action)="data">
          <ul class="list-inline mb-0">
            <li class="list-inline-item" v-if="data.item.status == 'pending'">
              <a
                href="javascript:void(0);"
                class="px-2 text-primary"
                v-b-tooltip.hover
                title="complete"
                @click="openDialog(data.index, data.item.id)"
                >complete
              </a>
            </li>
            <li class="list-inline-item" v-if="data.item.status == 'completed'">
              <a
                href="javascript:void(0);"
                class="px-2 text-danger"
                v-b-tooltip.hover
                title="Delete"
                @click="deleterec(data.index, data.item.id, data.item.code)"
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
    </div>
    <!--modals-->
    <b-modal id="modal-receipt" ref="modal" title="Print Receipt" size="lg" class="">
      <Receipt
        :items="salesitems"
        :headers="receiptHeaders"
        :total="total"
        :paymentMethod="paymentMethod"
        :receiptNo="paycode"
        @printReceipt="viewReceipt"
      />
    </b-modal>
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
  </Layout>
</template>
