<script>
import countTo from "vue-count-to";
import Swal from "sweetalert2";
import axios from "@/Axiosconfig";
export default {
  components: {
    countTo,
  },
  data() {
    return {
      series: [
        {
          data: [25, 66, 41, 89, 63, 25, 44, 20, 36, 40, 54],
        },
      ],
      chartOptions: {
        fill: {
          colors: ["#5b73e8"],
        },
        chart: {
          type: "bar",
          sparkline: {
            enabled: true,
          },
        },
        plotOptions: {
          bar: {
            columnWidth: "50%",
          },
        },
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        xaxis: {
          crosshairs: {
            width: 1,
          },
        },
        tooltip: {
          fixed: {
            enabled: false,
          },
          x: {
            show: false,
          },
          y: {
            title: {
              formatter: function () {
                return "";
              },
            },
          },
          marker: {
            show: false,
          },
        },
      },
      growthChartOptions: {
        fill: {
          colors: ["#f1b44c"],
        },
        chart: {
          type: "bar",
          sparkline: {
            enabled: true,
          },
        },
        plotOptions: {
          bar: {
            columnWidth: "50%",
          },
        },
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        xaxis: {
          crosshairs: {
            width: 1,
          },
        },
        tooltip: {
          fixed: {
            enabled: false,
          },
          x: {
            show: false,
          },
          y: {
            title: {
              formatter: function () {
                return "";
              },
            },
          },
          marker: {
            show: false,
          },
        },
      },
      orderseries: [70],
      orderRadial: {
        fill: {
          colors: ["#34c38f"],
        },
        chart: {
          sparkline: {
            enabled: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 0,
              size: "60%",
            },
            track: {
              margin: 0,
            },
            dataLabels: {
              show: false,
            },
          },
        },
      },
      customerseries: [55],
      customerRadial: {
        fill: {
          colors: ["#5b73e8"],
        },
        chart: {
          sparkline: {
            enabled: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 0,
              size: "60%",
            },
            track: {
              margin: 0,
            },
            dataLabels: {
              show: false,
            },
          },
        },
      },
      income: 0,
      ration: 0,
      sales_count: 0,
      orders: 1,
      customers: 1,
      growth_rate: 1.0,
      order_changes: [0, 0],
      customer_changes: [0, 0],
    };
  },
  created() {
    this.updateChart();
  },
  mounted() {
    this.updateChart();
  },
  methods: {
    updateChart() {
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
        .get(`sales-analytics`)
        .then((response) => {
          // JSON responses are automatically parsed.
          response.data.forEach((item) => {
            this.series = [
              {
                data: item.data,
              },
            ];
            this.income = item.sales_amount;
            this.ratio = item.conversion_ratio;
            this.sales_count = item.sales_count;
            this.orders = item.orders;
            this.customers = item.customers;
            this.customerseries = [item.customers];
            this.orderseries = [item.orders];
            this.growth_rate = item.growth_rate;
            this.customer_changes = item.customer_series;
            this.order_changes = item.order_series;
          });
          this.chartOptions.labels = this.labelValues;
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
  },
};
</script>

<template>
  <div class="row">
    <div class="col-md-6 col-xl-3">
      <div class="card">
        <div class="card-body">
          <div class="float-end mt-2">
            <apexchart
              class="apex-charts"
              dir="ltr"
              width="70"
              height="40"
              :options="chartOptions"
              :series="series"
            ></apexchart>
          </div>
          <div>
            <h4 class="mb-1 mt-1">
              KShs.
              <span data-plugin="counterup">
                <countTo :startVal="100" :endVal="income" :duration="2000"></countTo>
              </span>
            </h4>
            <p class="text-muted mb-0">Total Profit</p>
          </div>
          <p class="text-muted mt-3 mb-0">
            <span class="text-success me-1">
              <i class="mdi mdi-arrow-up-bold me-1"></i>{{ growth_rate * 100 }}%
            </span>
            since last week
          </p>
        </div>
      </div>
    </div>
    <div class="col-md-6 col-xl-3">
      <div class="card">
        <div class="card-body">
          <div class="float-end mt-2">
            <apexchart
              class="apex-charts"
              type="radialBar"
              dir="ltr"
              width="45"
              height="45"
              :options="orderRadial"
              :series="orderseries"
            ></apexchart>
          </div>
          <div>
            <h4 class="mb-1 mt-1">
              <span data-plugin="counterup">
                <countTo :startVal="100" :endVal="orders" :duration="2000"></countTo>
              </span>
            </h4>
            <p class="text-muted mb-0">Products</p>
          </div>
          <p class="text-muted mt-3 mb-0">
            <span
              class="text-danger me-1"
              :class="{
                'text-success':
                  Number(order_changes[orders - 1]) >= Number(order_changes[orders - 2]),
              }"
            >
              <i
                class="mdi mdi-arrow-down-bold me-1"
                :class="{
                  'mdi mdi-arrow-up-bold':
                    Number(order_changes[orders - 1]) >=
                    Number(order_changes[orders - 2]),
                }"
              ></i
              >{{
                ((Number(order_changes[orders - 1]) / Number(orders)) * 100).toFixed(2)
              }}%
            </span>
            since last week
          </p>
        </div>
      </div>
    </div>
    <div class="col-md-6 col-xl-3">
      <div class="card">
        <div class="card-body">
          <div class="float-end mt-2">
            <apexchart
              class="apex-charts"
              type="radialBar"
              dir="ltr"
              width="45"
              height="45"
              :options="customerRadial"
              :series="customerseries"
            ></apexchart>
          </div>
          <div>
            <h4 class="mb-1 mt-1">
              <span data-plugin="counterup">
                <countTo :startVal="1000" :endVal="customers" :duration="2000"></countTo>
              </span>
            </h4>
            <p class="text-muted mb-0">System Users</p>
          </div>
          <p class="text-muted mt-3 mb-0">
            <span
              class="text-danger me-1"
              :class="{
                'text-success':
                  Number(customer_changes[customers - 1]) >=
                  Number(customer_changes[customers - 2]),
              }"
            >
              <i
                class="mdi mdi-arrow-down-bold me-1"
                :class="{
                  'mdi mdi-arrow-up-bold':
                    Number(customer_changes[customers - 1]) >=
                    Number(customer_changes[customers - 2]),
                }"
              ></i
              >{{
                (
                  (Number(customer_changes[customers - 1]) / Number(customers)) *
                  100
                ).toFixed(2)
              }}%
            </span>
            since last week
          </p>
        </div>
      </div>
    </div>
    <div class="col-md-6 col-xl-3">
      <div class="card">
        <div class="card-body">
          <div class="float-end mt-2">
            <apexchart
              class="apex-charts"
              dir="ltr"
              width="70"
              height="40"
              :options="growthChartOptions"
              :series="series"
            ></apexchart>
          </div>
          <div>
            <h4 class="mb-1 mt-1">
              +
              <span data-plugin="counterup">{{ growth_rate * 100 }}</span
              >%
            </h4>
            <p class="text-muted mb-0">Stock Turn Over</p>
          </div>
          <p class="text-muted mt-3 mb-0">
            <span class="text-success me-1">
              <i class="mdi mdi-arrow-up-bold me-1"></i>{{ growth_rate * 100 }}%
            </span>
            since last week
          </p>
        </div>
      </div>
    </div>
    <!-- end col-->
    <div class="col-md-6 col-xl-3">
      <div class="card">
        <div class="card-body">
          <div class="float-end mt-2">
            <apexchart
              class="apex-charts"
              dir="ltr"
              width="70"
              height="40"
              :options="chartOptions"
              :series="series"
            ></apexchart>
          </div>
          <div>
            <h4 class="mb-1 mt-1">
              KShs.
              <span data-plugin="counterup">
                <countTo :startVal="100" :endVal="income" :duration="2000"></countTo>
              </span>
            </h4>
            <p class="text-muted mb-0">Total Revenue</p>
          </div>
          <p class="text-muted mt-3 mb-0">
            <span class="text-success me-1">
              <i class="mdi mdi-arrow-up-bold me-1"></i>{{ growth_rate * 100 }}%
            </span>
            since last week
          </p>
        </div>
      </div>
    </div>
    <div class="col-md-6 col-xl-3">
      <div class="card">
        <div class="card-body">
          <div class="float-end mt-2">
            <apexchart
              class="apex-charts"
              type="radialBar"
              dir="ltr"
              width="45"
              height="45"
              :options="orderRadial"
              :series="orderseries"
            ></apexchart>
          </div>
          <div>
            <h4 class="mb-1 mt-1">
              <span data-plugin="counterup">
                <countTo :startVal="100" :endVal="orders" :duration="2000"></countTo>
              </span>
            </h4>
            <p class="text-muted mb-0">Orders</p>
          </div>
          <p class="text-muted mt-3 mb-0">
            <span
              class="text-danger me-1"
              :class="{
                'text-success':
                  Number(order_changes[orders - 1]) >= Number(order_changes[orders - 2]),
              }"
            >
              <i
                class="mdi mdi-arrow-down-bold me-1"
                :class="{
                  'mdi mdi-arrow-up-bold':
                    Number(order_changes[orders - 1]) >=
                    Number(order_changes[orders - 2]),
                }"
              ></i
              >{{
                ((Number(order_changes[orders - 1]) / Number(orders)) * 100).toFixed(2)
              }}%
            </span>
            since last week
          </p>
        </div>
      </div>
    </div>
    <div class="col-md-6 col-xl-3">
      <div class="card">
        <div class="card-body">
          <div class="float-end mt-2">
            <apexchart
              class="apex-charts"
              type="radialBar"
              dir="ltr"
              width="45"
              height="45"
              :options="customerRadial"
              :series="customerseries"
            ></apexchart>
          </div>
          <div>
            <h4 class="mb-1 mt-1">
              <span data-plugin="counterup">
                <countTo :startVal="1000" :endVal="customers" :duration="2000"></countTo>
              </span>
            </h4>
            <p class="text-muted mb-0">Customers</p>
          </div>
          <p class="text-muted mt-3 mb-0">
            <span
              class="text-danger me-1"
              :class="{
                'text-success':
                  Number(customer_changes[customers - 1]) >=
                  Number(customer_changes[customers - 2]),
              }"
            >
              <i
                class="mdi mdi-arrow-down-bold me-1"
                :class="{
                  'mdi mdi-arrow-up-bold':
                    Number(customer_changes[customers - 1]) >=
                    Number(customer_changes[customers - 2]),
                }"
              ></i
              >{{
                (
                  (Number(customer_changes[customers - 1]) / Number(customers)) *
                  100
                ).toFixed(2)
              }}%
            </span>
            since last week
          </p>
        </div>
      </div>
    </div>
    <div class="col-md-6 col-xl-3">
      <div class="card">
        <div class="card-body">
          <div class="float-end mt-2">
            <apexchart
              class="apex-charts"
              dir="ltr"
              width="70"
              height="40"
              :options="growthChartOptions"
              :series="series"
            ></apexchart>
          </div>
          <div>
            <h4 class="mb-1 mt-1">
              +
              <span data-plugin="counterup">{{ growth_rate * 100 }}</span
              >%
            </h4>
            <p class="text-muted mb-0">Growth</p>
          </div>
          <p class="text-muted mt-3 mb-0">
            <span class="text-success me-1">
              <i class="mdi mdi-arrow-up-bold me-1"></i>{{ growth_rate * 100 }}%
            </span>
            since last week
          </p>
        </div>
      </div>
    </div>
    <!-- end col-->
  </div>
  <!-- end row-->
</template>
