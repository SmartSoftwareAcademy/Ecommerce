<script>
import Layout from "@/views/layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import reportdet from "@/components/report/header";
import Swal from "sweetalert2";
import axios from "@/Axiosconfig";

export default {
  name: "products",
  page: {
    title: "Products",
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
  },
  data() {
    return {
      name: "",
      display_image: "",
      headers: null,
      uniqueCars: null,
      showme: true,
      pl: "",
      editmode: false,
      title: "Products",
      items: [
        {
          text: "USER:" + JSON.parse(sessionStorage.user).username,
        },
        {
          text: "Products",
          active: true,
        },
      ],
      orderData: [],
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
      baseUrl: "http://localhost:8000/",
      fields: [
        {
          key: "id",
          label: "#",
          sortable: true,
        },
        {
          key: "images", // Update the key to access the image field
          sortable: true,
          label: "Image", // Add a label for the image column
        },
        {
          key: "sku", // Update the key to access the SKU from the product
          sortable: true,
          label: "SKU", // Add a label for the SKU column
        },
        {
          key: "product.title", // Update the key to access the product title
          sortable: true,
          label: "Product Title", // Add a label for the product title column
        },
        {
          key: "retail_price", // Update the key to access the product retail_price
          sortable: true,
          label: "retail_price", // Add a label for the retail_price column
        },
        {
          key: "discount_price", // Update the key to access the Discount  Price
          sortable: true,
          label: "Discount  Price", // Add a label for the Discount  Price column
        },
        {
          key: "stock_level",
          sortable: true,
          label: "Stock Level", // Add a label for the stock level column
        },
        "action",
      ],
    };
  },
  computed: {
    rows() {
      return this.orderData.length;
    },
    // Filtered data based on search input
    filteredOrderData() {
      if (this.filter) {
        return this.orderData.filter((item) => {
          const searchText = this.filter.toLowerCase();
          return (
            item.product.title.toLowerCase().includes(searchText) ||
            item.product.sku.toLowerCase().includes(searchText)
          );
        });
      }
      return this.orderData;
    },
  },
  mounted() {
    // Set the initial number of items
    this.updatearray();
    this.totalRows = this.orderData.length;
    this.baseUrl = axios.defaults.baseURL.replace("api/", "");
  },
  methods: {
    hasSizeVariations(item) {
      return item.size !== null && item.size.retail_price !== null;
    },
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
          `stock/?limit=${this.perPage}&offset=${(this.currentPage - 1) * this.perPage}`
        )
        .then((response) => {
          // JSON responses are automatically parsed.
          this.orderData = response.data["results"];

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
      const data = this.orderData.map((row) => ({
        Serial: row.serial,
        SKU: row.sku,
        "Product Name":
          row.product.title +
          " " +
          (row.size ? row.size.size || "" : "") +
          " " +
          (row.size ? row.size.unit.unit_symbol || "" : ""),
        "retail_price(KES)": row.product.retail_price || (row.size ? row.size.retail_price : ""),
        "Stock Level": row.stock_level,
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
      const data = this.orderData.map((row) => ({
        Serial: row.serial,
        SKU: row.sku,
        "Product Name":
          row.product.title +
          " " +
          (row.size ? row.size.size || "" : "") +
          " " +
          (row.size ? row.size.unit.unit_symbol || "" : ""),
        retail_price: row.product.retail_price || (row.size ? row.size.retail_price : ""),
        "Stock Level": row.stock_level,
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
    edit(index, id, display_image, name, subcats) {
      this.editmode = true;
      this.myid = id;
      this.myindex = index;
      this.display_image = display_image;
      this.name = name;
      this.subcats = subcats;
    },
    deleterec(index, myid, name, subcats) {
      this.myid = myid;
      this.name = name;
      this.subcats = subcats;
      Swal.fire({
        title: "Are you sure, you want to delete? " + this.name,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#34c38f",
        cancelButtonColor: "#f46a6a",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          axios
            .delete(`products/` + myid + `/`)
            .then(() => {
              this.orderData.splice(index, 1);
              Swal.fire(
                this.name + " Deleted!",
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
      this.name = "";
      this.subcats = [];
      this.editmode = false;
      this.modaltitle = "Add Product";
    },
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <div class="card">
      <div class="card-body">
        <form @submit.prevent="handleSubmit">
          <div class="card">
            <div class="card-body">
              <div class="row justify-content-between">
                <div class="col-sm-6">
                  <button
                    class="btn btn-success waves-effect waves-light uil-export"
                    @click="getrpt()"
                  >
                    Export to CSV
                  </button>
                </div>

                <div class="col-sm-2">
                  <button
                    @click="printpdf('p')"
                    v-b-modal.modal-Print
                    class="btn btn-success waves-effect waves-light mdi-file-pdf"
                  >
                    Print PDF
                  </button>
                </div>
                <div class="col-sm-2">
                  <router-link
                    :to="{ name: 'Add Product' }"
                    class="btn btn-success waves-effect waves-light uil-focus-add"
                    @click="clearvalues()"
                  >
                    Add Product
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <div class="card">
                <div class="card-body changebg">
                  <div class="row">
                    <div class="col-12">
                      <div>
                        <div class="float-end">
                          <form class="d-inline-flex mb-3"></form>
                        </div>
                      </div>
                      <div
                        class="table table-centered datatable dt-responsive nowrap table-card-list dataTable no-footer dtr-inline"
                      >
                        <div class="row">
                          <div class="col-sm-12 col-md-6">
                            <div id="tickets-table_length" class="dataTables_length">
                              <label class="d-inline-flex align-items-center fw-normal">
                                Show&nbsp;
                                <b-form-select
                                  v-model="perPage"
                                  size="sm"
                                  :options="pageOptions"
                                  @input="updatearray()"
                                ></b-form-select
                                >&nbsp;entries
                              </label>
                            </div>
                          </div>
                          <!-- Search -->
                          <div class="col-sm-12 col-md-6">
                            <div
                              id="tickets-table_filter"
                              class="dataTables_filter text-md-end"
                            >
                              <label class="d-inline-flex align-items-center fw-normal">
                                Search:
                                <b-form-input
                                  v-model="filter"
                                  type="search"
                                  placeholder="Search..."
                                  class="form-control form-control-sm ms-2"
                                ></b-form-input>
                              </label>
                            </div>
                          </div>
                          <!-- End search -->
                        </div>
                        <!-- Table -->

                        <b-table
                          table-class="table table-centered datatable table-card-list"
                          thead-tr-class="bg-transparent"
                          :items="filteredOrderData"
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
                          <template v-slot:cell(id)="data">
                            <a href="javascript: void(0);" class="text-dark fw-bold">
                              {{ data.item.id }}
                            </a>
                          </template>
                          <template v-slot:cell(images)="data">
                            <div class="m-auto">
                              <img
                                :src="baseUrl + data.item.product.images[0].image"
                                :height="30"
                              />
                            </div>
                          </template>

                          <template v-slot:cell(action)="data">
                            <ul class="list-inline mb-0">
                              <li class="list-inline-item">
                                <router-link
                                  :to="{
                                    name: 'Add Product',
                                    params: {
                                      item: data.item,
                                    },
                                  }"
                                  class="px-2 text-success"
                                  v-b-tooltip.hover
                                  title="Edit"
                                >
                                  <i class="uil uil-pen font-size-18"></i>
                                </router-link>
                              </li>
                              <li class="list-inline-item">
                                <a
                                  href="javascript:void(0);"
                                  class="px-2 text-danger"
                                  v-b-tooltip.hover
                                  title="Delete"
                                  @click="
                                    deleterec(data.index, data.item.id, data.item.title)
                                  "
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
                          <div
                            class="dataTables_paginate paging_simple_numbers float-end"
                          >
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
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

<style>
.changebg {
  background-color: #f7f6ebfb;
}
</style>
