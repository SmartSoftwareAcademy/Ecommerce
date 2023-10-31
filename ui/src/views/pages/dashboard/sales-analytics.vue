<script>
import countTo from "vue-count-to";
import Swal from "sweetalert2";
import axios from "@/Axiosconfig";
export default {
    components: {
        countTo
    },
    data() {
        return {
            series: [],
            chartOptions: {
                chart: {
                    height: 350,
                    type: 'line',
                },
                stroke: {
                    width: [0, 4]
                },
                title: {
                    text: 'Sales Sources'
                },
                dataLabels: {
                    enabled: true,
                    enabledOnSeries: [1]
                },
                labels: [],
                xaxis: {
                    type: 'datetime'
                },
                yaxis: [{
                    title: {
                        text: 'Sales Amount',
                    },

                }, {
                    opposite: true,
                    title: {
                        text: 'Aggregate'
                    }
                }]
            },
            selectedFilter: 'Monthly',
            income: 0,
            ration: 0,
            sales_count: 0,
        };
    },
    computed: {
        labelValues() {
            if (this.selectedFilter === 'Weekly') {
                const currentDate = new Date();
                const labels = [];
                for (let i = 0; i < 7; i++) {
                    const date = new Date(currentDate.getTime() - (i * 24 * 60 * 60 * 1000));
                    labels.unshift(`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`);
                }
                return labels;
            } else if (this.selectedFilter === 'Monthly') {
                const currentDate = new Date();
                const year = currentDate.getFullYear();
                const month = currentDate.getMonth();
                const daysInMonth = new Date(year, month + 1, 0).getDate();
                const labels = [];
                for (let i = 0; i < daysInMonth; i++) {
                    labels.push(`${month + 1}/${i + 1}/${year}`);
                }
                return labels;
            } else if (this.selectedFilter === 'Yearly') {
                var labels = [];
                const currentDate = new Date();
                const year = currentDate.getFullYear();
                labels = Array.from({ length: 12 }, (_, i) => `${i + 1}/01/${year}`);
                return labels;
            } else {
                return [];
            }
        }
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
                    response.data.forEach((item, index) => {
                        if (index === 0) {
                            this.series[0] = {
                                name: item.name,
                                type: 'column',
                                data: item.data,
                            };
                        }
                        if (index === 1) {
                            this.series[1] = {
                                name: item.name,
                                type: 'line',
                                data: item.data,
                            }
                        }
                        if (index === 2) {
                            this.series[2] = {
                                name: item.name,
                                type: 'column',
                                data: item.data,
                            };
                        }
                        this.income = item.sales_amount;
                        this.ratio = item.conversion_ratio;
                        this.sales_count = item.sales_count;
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
    <div class="col-xl-8">
        <div class="card">
            <div class="card-body">
                <div class="float-end">
                    <select v-model="selectedFilter" class="uil uil-filter text-dark bg-light" @change="updateChart()">
                        <option value="Yearly">Yearly</option>
                        <option value="Monthly" selected>Monthly</option>
                        <option value="Weekly">Weekly</option>
                    </select>
                </div>
                <h4 class="card-title mb-4">Sales Analytics</h4>

                <div class="mt-1">
                    <ul class="list-inline main-chart mb-0">
                        <li class="list-inline-item chart-border-left me-0 border-0">
                            <h3 class="text-primary">
                                KShs.
                                <span data-plugin="counterup">
                                    <countTo :startVal="1" :endVal="income" :duration="2000"></countTo>
                                </span>
                                <span class="text-muted d-inline-block font-size-15 ms-3">Income</span>
                            </h3>
                        </li>
                        <li class="list-inline-item chart-border-left me-0">
                            <h3>
                                <span data-plugin="counterup">
                                    <countTo :startVal="1" :endVal="sales_count" :duration="2000"></countTo>
                                </span>
                                <span class="text-muted d-inline-block font-size-15 ms-3">Sales</span>
                            </h3>
                        </li>
                        <li class="list-inline-item chart-border-left me-0">
                            <h3>
                                <span data-plugin="counterup">{{ ratio.toFixed(2) }}</span>%
                                <span class="text-muted d-inline-block font-size-15 ms-3">Conversation Ratio</span>
                            </h3>
                        </li>
                    </ul>
                </div>

                <div class="mt-3">
                    <apexchart type="line" ref="chart" class="apex-charts" dir="ltr" height="339" :options="chartOptions"
                        :series="series"></apexchart>
                </div>
            </div>
            <!-- end card-body-->
        </div>
        <!-- end card-->
    </div>
    <!-- end col-->
</template>
