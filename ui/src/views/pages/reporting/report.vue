<script
  type="text/javascript"
  src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.min.js"
></script>
<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

import jsPDF from "jspdf";

import DatePicker from "vue2-datepicker";
import Multiselect from "vue-multiselect";

import axios from "../../../Axiosconfig";
import Swal from "sweetalert2";
import reportdet from "@/components/report/header";
import moment from "moment";

export default {
  page: {
    title: "Reporting",
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
    DatePicker,
    Multiselect,
    reportdet,
  },
  data() {
    return {
      hour: "",
      //watch user logs
      viewReports: false,
      printedpdf: true,
      reportfor: "",
      genReportStarted: "",
      printReport: false,
      rpt: "",
      sendEmail: "",
      filter: "",
      headers: null,
      uniqueCars: null,
      showme: true,
      pl: "p",
      orderData: [],
      title: "Reporting",
      items: [
        {
          text: "USER: " + JSON.parse(sessionStorage.user).username,
        },
        {
          text: "Reporting",
          active: true,
        },
      ],
      exceldata: [],
      excelpdf: "",
      report: "Select report",
      show_upload_file: false,
      togglequaters: false,
      selected_report: false,
      qt1: "",
      qt2: "",
      qt3: "",
      qt4: "",
      qtryear: new Date().getFullYear(),
      from: null,
      to: null,
      //quater 1
      qt1from: "",
      //qt1from: "2020-10-01",
      qt1to: "",
      //quater 2
      qt2from: "",
      qt2to: "",
      //quater 3
      qt3from: "",
      qt3to: "",
      //quater 4
      qt4from: "",
      qt4to: "",
      showdata: false,
      autoClose: "",
      autoClose2: "",
      mail_checkbox: true,
      report: null,
      mod: "",
      picked: "",
      modules: [
        "All",
        "Analytics",
        "Inventory",
        "Orders",
        "Product Performance",
        "Refund and Return",
        "Sales",
        "Users",
      ],
      report: "",
      reports: [],
      toggleFilter: false,
      email: "",
      user: null,
      users: [],
    };
  },
  watch: {
    qtryear(value) {
      this.qtryear = value;
      this.from = this.qtryear + "-09-01";
      this.to = this.qtryear + "-10-01";
      //quater 1
      this.qt1from = this.qtryear - 1 + "-10-01";
      //qt1from: "2020-10-01",
      this.qt1to = this.qtryear + "-12-31";
      //quater 2
      this.qt2from = this.qtryear + "-01-01";
      this.qt2to = this.qtryear + "-03-31";
      //quater 3
      this.qt3from = this.qtryear + "-04-01";
      this.qt3to = this.qtryear + "-06-31";
      //quater 4
      this.qt4from = this.qtryear + "-07-01";
      this.qt4to = this.qtryear + "-09-30";
      console.log(this.qt1from);
    },
    viewReports(newValue) {
      var curentuser = JSON.parse(sessionStorage.user).email;
      var currentdate = new Date();
      const data = {
        datetime: currentdate,
        useremail: curentuser,
        application: window.navigator.userAgent,
        details: `Opened Reports page:${newValue}`,
        computer: window.sessionStorage.clientip,
      };
      axios
        .post("AuditLogs", data)
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    printReport() {
      var curentuser = JSON.parse(sessionStorage.user).email;
      var currentdate = new Date();
      const data = {
        datetime: currentdate,
        useremail: curentuser,
        application: window.navigator.userAgent,
        details: `Reporting:${this.genReportStarted}`,
        computer: window.sessionStorage.clientip,
      };
      axios
        .post("AuditLogs", data)
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created() {
    this.updateDates();
  },
  mounted() {
    this.getrptstate();
    this.email = JSON.parse(sessionStorage.user).email;
    this.totalRows = this.items.length;
    this.viewReports = true;
    this.updateDates();
  },
  methods: {
    updateDates() {
      this.from = this.qtryear + "-09-01";
      this.to = this.qtryear + "-10-01";
      //quater 1
      this.qt1from = this.qtryear - 1 + "-10-01";
      //qt1from: "2020-10-01",
      this.qt1to = this.qtryear + "-12-31";
      //quater 2
      this.qt2from = this.qtryear + "-01-01";
      this.qt2to = this.qtryear + "-03-31";
      //quater 3
      this.qt3from = this.qtryear + "-04-01";
      this.qt3to = this.qtryear + "-06-31";
      //quater 4
      this.qt4from = this.qtryear + "-07-01";
      this.qt4to = this.qtryear + "-09-30";
    },
    formatDate(dateString) {
      return moment(dateString).format("YYYY-MM-DD");
    },
    getrptstate() {
      //alert(this.report);
      this.showdata = false;
      this.showhour = false;
      this.showdate = false;
      //this.reports=[]
      this.reports = [];
      if (this.mod == "Analytics") {
        this.reports.push(
          "Daily Summary",
          "Weekly Summary",
          "Monthly Summary",
          "Yearly Summary",
          "Quaterly",
          "Custom"
        );
      }
      if (this.mod === "Inventory") {
        //"Inventory","Refund and Return","Product Performance",
        this.reports.push("Stock levels and turnover", "Products nearing stock-out");
      }
      if (this.mod == "Refund and Return") {
        this.reports.push("Return Rate", "Reason for returns");
      }
      if (this.mod == "Orders") {
        this.reports.push("Total Orders", "Average value of orders");
      }
      if (this.mod == "Users") {
        this.reports.push("Employees", "Customers", "Suppliers");
      }
      if (this.mod == "Product Performance") {
        this.reports.push("Views", "Clicks");
      }
      if (this.mod == "Sales") {
        this.reports.push("Total Sales", "Sales trends", "Best-selling products");
      }
      this.getdataStatus();
    },
    getdataStatus() {
      this.selected_report = false;
      this.togglequaters = false;
      this.toggleFilter = false;
      if (this.report == "Quaterly") {
        this.togglequaters = true;
        this.selected_report = true;
        this.toggleFilter = true;
      }
      if (this.report == "Custom") {
        this.selected_report = true;
        this.toggleFilter = true;
      }
    },
    genrpt(pl) {
      this.pl = pl;
      this.load = true;
      if (
        this.report == "Custom" ||
        this.report == "Daily Summary" ||
        this.report == "Weekly Summary" ||
        this.report == "Monthly Summary" ||
        this.report == "Yearly Summary"
      ) {
        this.getSummaryData();
      }
      if (this.excelpdf == "PDF") {
        this.$refs.uploadComponent.generatePDF("pdf");
      } else {
        this.$refs.uploadComponent.generatePDF("Excel");
      }
      this.$emit("myrecords", {
        records: this.records,
        uniqueCars: this.uniqueCars,
        headers: this.headers,
        title: this.mod + " " + this.report + " " + this.title,
        pl: this.pl,
      });
    },
    getSummaryData() {
      var fromdate = this.formatDate(this.from);
      var todate = this.formatDate(this.to);
      var report_type = "daily";
      if (this.report == "Daily Summary") {
        report_type = "daily";
        fromdate = "";
        todate = "";
      }
      if (this.report == "Weekly Summary") {
        report_type = "weekly";
        fromdate = "";
        todate = "";
      }
      if (this.report == "Monthly Summary") {
        report_type = "monthly";
        fromdate = "";
        todate = "";
      }
      if (this.report == "Yearly Summary") {
        report_type = "yearly";
        fromdate = "";
        todate = "";
      }
      var data = [];
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Please wait...",
        html: "Pulling data...",
        showConfirmButton: false,
        allowOutsideClick: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });
      axios
        .get(
          `sales/summary/?report_type=${report_type}&start_date=${fromdate}&todate=${todate}`
        )
        .then((response) => {
          // console.log(response.data.sales_summary);
          this.orderData = response.data.sales_summary;
          var sales_totals = response.data.total_sales;
          console.log(this.orderData);
          Swal.close();
          data = this.orderData.map((row) => ({
            Date: row.date_added__date,
            "Total Sales": row.sales_count,
            "Online Sales": row.online_customer_count,
            "Offline Sales": row.walk_in_customer_count,
            "Closed Sales": row.completed_count,
            "Pending Sales": row.pending_count,
            Mpesa: row.mpesa_count,
            Cash: row.cash_count,
            "Total(KES)": row.total,
          }));
          //last row
          const totalRow = {
            Date: `Total ${report_type} Sales`,
            "Total Sales": "",
            "Online Sales": "", // You can leave these fields empty for the total row
            "Offline Sales": "",
            "Closed Sales": "",
            "Pending Sales": "",
            Mpesa: "",
            Cash: "",
            "Total(KES)": sales_totals, // If you want to show the total here as well
          };
          // Add the total row to the data array
          data.push(totalRow);
          //get headers
          this.title = this.report;
          const headers = Object.keys(data[0]);
          const headersObject = headers.reduce((obj, header) => {
            obj[header] = header;
            return obj;
          }, {});
          console.log(headersObject);
          const cars = [];
          Object.entries(data).forEach((val) => {
            const [key] = val;
            console.log(key, val);
            cars.push(Object.values(data[key]));
          });
          const uniqueCars = Array.from(new Set(cars));
          this.headers = headersObject;
          this.uniqueCars = uniqueCars;
          this.records = data;
          this.title = this.report;
        })
        .catch((e) => {
          console.log(e);
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Error!",
            html: "" + e,
            showConfirmButton: true,
            timer: 3000,
          });
        });
    },
    handleSubmit() {
      console.log("Error on submit");
    },
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <div class="row">
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="handleSubmit">
            <div class="row">
              <div class="card col-md-2"></div>
              <div class="card col-md-8 changebg">
                <div class="card-body">
                  <div class="card">
                    <div class="card-body">
                      <div class="col-sm-12">
                        <div class="input-group">
                          <div class="input-group-text col-sm-2 mb-3">Module:</div>
                          <div class="col-sm-10">
                            <multiselect
                              @input="getrptstate()"
                              v-model="mod"
                              :options="modules"
                              placeholder="Select Report"
                            ></multiselect>
                          </div>
                        </div>
                      </div>

                      <div class="col-sm-12">
                        <div class="input-group">
                          <div class="input-group-text col-sm-2 mb-3">Report For:</div>
                          <div class="col-sm-10">
                            <multiselect
                              @input="getrptstate()"
                              v-model="report"
                              :options="reports"
                              placeholder="Select Report"
                            >
                            </multiselect>
                          </div>
                        </div>
                      </div>

                      <div class="col-sm-12">
                        <div class="input-group">
                          <div class="input-group-text col-sm-2">
                            <input
                              type="checkbox"
                              id="mail_checkbox"
                              v-model="mail_checkbox"
                              :checked="mail_checkbox"
                            />
                            <label for="checkbox"></label>
                            Send Mail:
                          </div>
                          <input
                            class="form-control"
                            type="text"
                            placeholder="Type in Your Email Address"
                            v-model="email"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--Download files-->
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="border-top">
                        <div class="row">
                          <div class="col-md-12">
                            <div class="card" v-if="toggleFilter">
                              <div class="card-body">
                                <div class="row d-flex flex-row">
                                  <div class="col-lg-12 col-md-6">
                                    <div class="row">
                                      <div class="d-flex flex-column">
                                        <div class="row">
                                          <div
                                            class="col-sm-12 col-md-12 d-flex flex-row"
                                            v-if="!togglequaters"
                                          >
                                            <div
                                              id="tickets-table-date-picker"
                                              class="m-2"
                                            >
                                              <label>
                                                From&nbsp;
                                                <date-picker
                                                  class="form-control"
                                                  v-model="from"
                                                  placeholder="2022-09-27"
                                                  type="date"
                                                ></date-picker>
                                              </label>
                                            </div>
                                            <div
                                              id="tickets-table-date-picker"
                                              class="m-2"
                                            >
                                              <label>
                                                To&nbsp;
                                                <date-picker
                                                  class="form-control"
                                                  v-model="to"
                                                  placeholder="2022-09-27"
                                                  type="date"
                                                ></date-picker>
                                              </label>
                                            </div>
                                          </div>
                                          <div
                                            id="tickets-table-date-picker"
                                            v-if="togglequaters"
                                          >
                                            <label>
                                              Slect Year&nbsp;
                                              <input
                                                class="form-control p-2"
                                                v-model="qtryear"
                                                @change="qtryear()"
                                                placeholder="Enter Report Year e.g 2022"
                                                type="number"
                                              />
                                            </label>
                                          </div>
                                          <div
                                            class="col-sm-6 col-md-6"
                                            v-if="togglequaters"
                                          >
                                            <div id="tickets-table-date-picker">
                                              <label class="d-inline-flex m-2">
                                                Quater 1(Oct to Dec) &nbsp;
                                                <b-form-checkbox
                                                  class="mr-2"
                                                  v-model="qt1"
                                                >
                                                </b-form-checkbox>
                                              </label>
                                            </div>
                                            <div
                                              id="tickets-table-date-picker"
                                              v-show="togglequaters"
                                            >
                                              <label class="d-inline-flex m-2">
                                                Quater 2(Jan to Mar) &nbsp;
                                                <b-form-checkbox
                                                  class="mr-n2"
                                                  v-model="qt2"
                                                >
                                                </b-form-checkbox>
                                              </label>
                                            </div>
                                          </div>
                                          <div
                                            class="col-sm-6 col-md-6"
                                            v-if="togglequaters"
                                          >
                                            <div id="tickets-table-date-picker">
                                              <label class="d-inline-flex m-2">
                                                Quater 3(Apr to Jun) &nbsp;
                                                <b-form-checkbox
                                                  class="mr-n2"
                                                  v-model="qt3"
                                                >
                                                </b-form-checkbox>
                                              </label>
                                            </div>
                                            <div
                                              id="tickets-table-date-picker"
                                              class="d-block"
                                              v-show="togglequaters"
                                            >
                                              <label class="d-inline-flex m-2">
                                                Quater 4(Jul to Sept) &nbsp;
                                                <b-form-checkbox
                                                  class="mr-n2"
                                                  v-model="qt4"
                                                >
                                                </b-form-checkbox>
                                              </label>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- ///buttons -->
                  <div class="row">
                    <div class="col-sm-8 text-right">{{ report }} {{ this.mod }}</div>
                    <div class="col-sm-3">
                      <b-button
                        pill
                        variant="outline-primary"
                        @click="[genrpt('l'), $bvModal.hide('modal-1')]"
                        v-b-modal.modal-Print
                        style="margin-right: 10px"
                      >
                        Generate Report</b-button
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <reportdet
      :title="report"
      :reportfor="report"
      :orderData="orderData"
      :pl="pl"
      :headers="headers"
      :uniqueCars="uniqueCars"
      :printedpdf="printedpdf"
      :rpt="rpt"
      :exceldata="exceldata"
      :concodance="concodance"
      v-show="false"
      ref="uploadComponent"
    ></reportdet>
    <b-modal id="modal-Print" :title="report" hide-footer size="bg" centered>
      <reportdet
        :title="report"
        :reportfor="report"
        :orderData="orderData"
        :pl="pl"
        :headers="headers"
        :uniqueCars="uniqueCars"
        :shome="showme"
        :printedpdf="printedpdf"
        :rpt="rpt"
        :v-show="showme"
        @sendEmail="sendEmail"
        :exceldata="exceldata"
        :mail_checkbox="mail_checkbox"
        :concodance="concodance"
      ></reportdet>
    </b-modal>
  </Layout>
</template>
<style scoped>
.changebg {
  background-color: rgb(240, 240, 240);
}
</style>
