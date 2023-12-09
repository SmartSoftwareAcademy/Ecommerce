<script>
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import axios from "@/Axiosconfig";

export default {
  components: { PageHeader },
  page: {
    title: "Profile",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  data() {
    return {
      title: "Profile",
      items: [
        {
          text: "Contacts",
        },
        {
          text: "Profile",
          active: true,
        },
      ],
      profile: [],
      address_headers: [
        { text: "Address Label", value: "address_label", sortable: false },
        { text: "Phone", value: "phone", sortable: false },
        { text: "Region", value: "region__region", sortable: false },
        { text: "City", value: "city__pickup_location", sortable: false },
        { text: "Actions", value: "action", sortable: false },
      ],
      addresses: [],
      search: "",
      myorders: [],
      currentPage: 1,
      perPage: 3,
      limit: 3,
      offset: 0,
      totalProducts: 0,
    };
  },
  created() {},
  mounted() {
    this.profile = this.$route.params.user || JSON.parse(sessionStorage.user);
    this.addresses = JSON.parse(sessionStorage.addresses).address;
    this.myOrders();
  },
  methods: {
    edit(item) {
      // Implement your edit item functionality here
      console.log(`Editing item ${item.name}`);
    },
    myOrders() {
      axios
        .get(`orders/?limit=${this.limit}&offset=${this.offset}`)
        .then((response) => {
          this.myorders = response.data["results"];
          this.totalProducts = response.data["count"];
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handlePageChange(newPage) {
      this.currentPage = newPage;
      this.limit = this.perPage;
      this.offset = (this.currentPage - 1) * this.perPage;
      this.myOrders();
    },
  },
};
</script>

<template>
  <div class="container p-4">
    <PageHeader :title="title" :items="items" />
    <div class="row mb-4">
      <div class="col-xl-4">
        <div class="card h-100">
          <div class="card-body">
            <div class="text-center">
              <b-dropdown
                class="float-end"
                variant="white"
                right
                menu-class="dropdown-menu-end"
                toggle-class="font-size-16 text-body p-0"
              >
                <template v-slot:button-content>
                  <i class="uil uil-ellipsis-v"></i>
                </template>
                <a class="dropdown-item" href="#">Edit</a>
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Remove</a>
              </b-dropdown>
              <div class="clearfix"></div>
              <div class="mb-4">
                <img
                  v-if="profile.pic"
                  :src="profile.pic"
                  alt
                  class="avatar-lg rounded-circle img-thumbnail"
                />
                <div class="avatar-lg mx-auto mb-4" v-if="!profile.pic">
                  <div class="avatar-title bg-soft-primary rounded-circle text-primary">
                    <i class="mdi mdi-account-circle display-4 m-0 text-primary"></i>
                  </div>
                </div>
              </div>
              <h5 class="mt-3 mb-1">{{ this.profile.name }}</h5>
              <h6 class="mb-1 rounded-1 border-2 bg-light text-uppercase p-1">
                {{ profile.roles[0] }} profile
              </h6>
              <div class="mt-4">
                <router-link type="button" class="btn btn-light btn-sm">
                  <i class="uil uil-envelope-alt me-2"></i> Message
                </router-link>
              </div>
            </div>

            <hr class="my-4" />

            <div class="text-muted">
              <h5 class="font-size-16">About</h5>
              <div class="table-responsive mt-4 mb-0">
                <div>
                  <p class="mb-1">Name :</p>
                  <h5 class="font-size-16">
                    {{ this.profile.name }}
                  </h5>
                </div>
                <div class="mt-4">
                  <p class="mb-1">Mobile :</p>
                  <h5 class="font-size-16">{{ this.profile.phone }}</h5>
                </div>
                <div class="mt-4">
                  <p class="mb-1">E-mail :</p>
                  <h5 class="font-size-16">{{ this.profile.email }}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-8">
        <div class="card mb-0">
          <b-tabs content-class="p-4" justified class="nav-tabs-custom">
            <b-tab active>
              <template v-slot:title>
                <i class="uil uil-postcard font-size-20"></i>
                <span class="d-none d-sm-block">ADDRESS BOOK</span>
              </template>
              <div>
                <h5 class="font-size-16 mb-4">MY ADDRESSES</h5>
                <div class="table-responsive">
                  <v-data-table
                    :headers="address_headers"
                    :items="addresses"
                    :search="search"
                  >
                    <template v-slot:item.action="{ item }">
                      <router-link
                        :to="{
                          name: 'Addressbook',
                          params: {
                            address: item,
                            selectmode: false,
                            editmode: true,
                            modaltitle: 'Edit shpping address',
                          },
                        }"
                        class="uil uil-pen"
                      >
                      </router-link>
                    </template>
                  </v-data-table>
                  <div class="row">
                    <div class="form-group">
                      <router-link
                        :to="{
                          name: 'Addressbook',
                          params: { selectmode: false, editmode: false },
                        }"
                        class="btn btn-warning mb-2 float-end mr-4 mt-2 ui uil-plus text-white font-weight-bold"
                      >
                        ADD NEW ADDRESS
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </b-tab>
            <b-tab>
              <template v-slot:title>
                <i class="uil uil-clipboard-notes font-size-20"></i>
                <span class="d-none d-sm-block">ORDERS</span>
              </template>
              <div>
                <h5 class="font-size-16 mb-4">Order History</h5>
                <ul class="activity-feed mb-0 ps-2">
                  <li class="feed-item" v-for="order in myorders" :key="order.id">
                    <div class="feed-item-list row">
                      <div class="col-sm-6">
                        <p class="text-muted">Order Details</p>
                        <p class="text-muted mb-1">
                          {{ new Date(order.created_at).toDateString() }}
                        </p>
                        <h5 class="font-size-16">
                          Order ID: <strong>{{ order.order_id }}</strong>
                        </h5>
                        <p>
                          Order Amount: KES <strong>{{ order.order_amount }}</strong>
                        </p>
                      </div>
                      <div class="col-sm-6">
                        <p class="text-muted">Order Items</p>
                        <ul class="activity-feed">
                          <li
                            class="feed-item"
                            v-for="item in order.orderitems"
                            :key="item.id"
                          >
                            {{ item.stock.product.title }}&nbsp;<span
                              v-if="item.stock.size"
                              >{{ item.stock.size.size }}&nbsp;{{
                                item.stock.size.unit.unit_symbol
                              }}</span
                            >
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="row mb-2">
                <v-pagination
                  v-if="totalProducts > 1"
                  v-model="currentPage"
                  :total-visible="3"
                  :prev-text="'Previous'"
                  :next-text="'Next'"
                  :length="Math.ceil(totalProducts / perPage)"
                  @input="handlePageChange(currentPage)"
                ></v-pagination>
              </div>
            </b-tab>
            <b-tab>
              <template v-slot:title>
                <i class="uil uil-envelope-alt font-size-20"></i>
                <span class="d-none d-sm-block">INBOX</span>
              </template>
              <div>
                <div data-simplebar style="max-height: 430px">
                  <div class="media border-bottom py-4">
                    <img
                      class="me-2 rounded-circle avatar-xs"
                      src="@/assets/images/users/avatar-3.jpg"
                      alt
                    />
                    <div class="media-body">
                      <h5 class="font-size-15 mt-0 mb-1">
                        Marion Walker
                        <small class="text-muted float-end">1 hr ago</small>
                      </h5>
                      <p class="text-muted">
                        If several languages coalesce, the grammar of the resulting .
                      </p>

                      <a
                        href="javascript: void(0);"
                        class="text-muted font-13 d-inline-block"
                      >
                        <i class="mdi mdi-reply"></i> Reply
                      </a>

                      <div class="media mt-4">
                        <img
                          class="me-2 rounded-circle avatar-xs"
                          src="@/assets/images/users/avatar-4.jpg"
                          alt
                        />
                        <div class="media-body">
                          <h5 class="font-size-15 mt-0 mb-1">
                            Shanon Marvin
                            <small class="text-muted float-end">1 hr ago</small>
                          </h5>
                          <p class="text-muted">
                            It will be as simple as in fact, it will be Occidental. To it
                            will seem like simplified .
                          </p>

                          <a
                            href="javascript: void(0);"
                            class="text-muted font-13 d-inline-block"
                          >
                            <i class="mdi mdi-reply"></i> Reply
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="media border-bottom py-4">
                    <img
                      class="me-2 rounded-circle avatar-xs"
                      src="@/assets/images/users/avatar-5.jpg"
                      alt
                    />
                    <div class="media-body">
                      <h5 class="font-size-15 mt-0 mb-1">
                        Janice Morgan
                        <small class="text-muted float-end">2 hrs ago</small>
                      </h5>
                      <p class="text-muted">
                        To achieve this, it would be necessary to have uniform
                        pronunciation.
                      </p>

                      <a
                        href="javascript: void(0);"
                        class="text-muted font-13 d-inline-block"
                      >
                        <i class="mdi mdi-reply"></i> Reply
                      </a>
                    </div>
                  </div>

                  <div class="media border-bottom py-4">
                    <img
                      class="me-2 rounded-circle avatar-xs"
                      src="@/assets/images/users/avatar-7.jpg"
                      alt
                    />
                    <div class="media-body">
                      <h5 class="font-size-15 mt-0 mb-1">
                        Patrick Petty
                        <small class="text-muted float-end">3 hrs ago</small>
                      </h5>
                      <p class="text-muted">
                        Sed ut perspiciatis unde omnis iste natus error sit
                      </p>

                      <a
                        href="javascript: void(0);"
                        class="text-muted font-13 d-inline-block"
                      >
                        <i class="mdi mdi-reply"></i> Reply
                      </a>
                    </div>
                  </div>
                </div>

                <div class="border rounded mt-4">
                  <form action="#">
                    <div class="px-2 py-1 bg-light">
                      <div class="btn-group" role="group">
                        <button
                          type="button"
                          class="btn btn-sm btn-link text-dark text-decoration-none"
                        >
                          <i class="uil uil-link"></i>
                        </button>
                        <button
                          type="button"
                          class="btn btn-sm btn-link text-dark text-decoration-none"
                        >
                          <i class="uil uil-smile"></i>
                        </button>
                        <button
                          type="button"
                          class="btn btn-sm btn-link text-dark text-decoration-none"
                        >
                          <i class="uil uil-at"></i>
                        </button>
                      </div>
                    </div>
                    <textarea
                      rows="3"
                      class="form-control border-0 resize-none"
                      placeholder="Your Message..."
                    ></textarea>
                  </form>
                </div>
                <!-- end .border-->
              </div>
            </b-tab>
          </b-tabs>
          <!-- Nav tabs -->
          <!-- Tab content -->
        </div>
      </div>
    </div>
    <!-- end row -->
  </div>
</template>
