<script>
import Swal from "sweetalert2";
import axios from "@/Axiosconfig";
export default {
    data() {
        return {
            orderData: [{
                profile: require("@/assets/images/users/avatar-4.jpg"),
                name: "Glenn Holden",
                location: "Nevada",
                status: "Cancel",
                price: "$250.00",
            },
            ],
            baseurl: "",
        };
    },
    mounted() {
        this.updatearray();
        this.baseurl = window.ref;
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
                .get(`top-buyers`)
                .then((response) => {
                    // JSON responses are automatically parsed.
                    this.orderData = response.data;
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
    <div class="col-xl-4">
        <div class="card">
            <div class="card-body">
                <div class="float-end">
                    <b-dropdown variant="white" toggle-class="p-0" menu-class="dropdown-menu-end">
                        <template v-slot:button-content>
                            <span class="text-muted">
                                All Buyers
                                <i class="mdi mdi-chevron-down ms-1"></i>
                            </span>
                        </template>
                        <b-dropdown-item href="#">Location</b-dropdown-item>
                        <b-dropdown-item href="#">Revenue</b-dropdown-item>
                        <b-dropdown-item href="#">Join Date</b-dropdown-item>
                    </b-dropdown>
                </div>
                <h4 class="card-title mb-4">Top Buyers</h4>

                <div data-simplebar style="max-height: 336px;">
                    <div class="table-responsive">
                        <table class="table table-borderless table-centered table-nowrap">
                            <tbody>
                                <tr v-for="(item, index) in orderData" :key="index">
                                    <td style="width: 20px;">
                                        <img :src="`${baseurl + `/media/` + item.customer__user__pic}`"
                                            class="avatar-xs rounded-circle" alt="..." />
                                    </td>
                                    <td>
                                        <h6 class="font-size-15 mb-1 fw-normal">{{ item.customer__user__first_name }}
                                            {{ item.customer__user__last_name }}</h6>
                                        <p class="text-muted font-size-13 mb-0">
                                            <i class="mdi mdi-map-marker"></i>
                                            {{ item.customer__addresses__region }}
                                        </p>
                                    </td>
                                    <td>
                                        <span class="badge font-size-12" :class="{
                                            'bg-soft-success': item.payment_status === 'paid',
                                            'bg-soft-warning': item.payment_status === 'pending'
                                        }">{{ item.payment_status }}</span>
                                    </td>
                                    <td class="text-muted fw-semibold text-end">
                                        <i class="icon-xs icon me-2 text-success" data-feather="trending-up"></i>
                                        Kshs.{{ item.total_spent }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- enbd table-responsive-->
                </div>
                <!-- data-sidebar-->
            </div>
            <!-- end card-body-->
        </div>
        <!-- end card-->
    </div>
    <!-- end col -->
</template>
