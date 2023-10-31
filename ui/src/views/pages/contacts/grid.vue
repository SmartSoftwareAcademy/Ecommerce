<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
// import addusers from "@/components/widgets/security/addusers";
// import reportdet from "@/components/report/header";
import Swal from "sweetalert2";
import axios from "../../../Axiosconfig";
/**
 * User grid component
 */
export default {
  page: {
    title: "User Grid",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: { Layout, PageHeader },
  data() {
    return {
      title: "User Grid",
      items: [
        {
          text: "Contacts",
        },
        {
          text: "User Grid",
          active: true,
        },
      ],
      gridList: [

      ],
    };
  },
  created() {
    this.fetchusers();
  },
  methods: {
    fetchusers() {
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
        .get(`listusers`)
        .then((response) => {
          // JSON responses are automatically parsed.
          this.gridList = response.data;
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
  middleware: "authentication",
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <div class="row">
      <div class="col-xl-3 col-sm-6" v-for="(item, index) in gridList" :key="index">
        <div class="card text-center">
          <div class="card-body">
            <b-dropdown class="float-end" variant="white" menu-class="dropdown-menu-end" right
              toggle-class="font-size-16 text-body p-0">
              <template v-slot:button-content>
                <i class="uil uil-ellipsis-h"></i>
              </template>
              <a class="dropdown-item" href="#">Edit</a>
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Remove</a>
            </b-dropdown>
            <div class="clearfix"></div>
            <div class="mb-4">
              <img v-if="item.image" :src="item.image" alt class="avatar-lg rounded-circle img-thumbnail" />
              <div class="avatar-lg mx-auto mb-4" v-if="!item.image">
                <div class="avatar-title bg-soft-primary rounded-circle text-primary">
                  <i class="mdi mdi-account-circle display-4 m-0 text-primary"></i>
                </div>
              </div>
            </div>
            <h5 class="font-size-16 mb-1">
              <a href="#" class="text-dark">{{ item.username }}</a>
            </h5>
            <p class="text-muted mb-2" v-if="item.groups__name">{{ item.groups__name }}</p>
            <p class="text-muted mb-2" v-else>Visitor</p>
          </div>

          <div class="btn-group" role="group">
            <router-link :to="{ name: 'Profile', params: { user: item } }" type="button"
              class="btn btn-outline-light text-truncate">
              <i class="uil uil-user me-1"></i> Profile
            </router-link>
            <button type="button" class="btn btn-outline-light text-truncate">
              <i class="uil uil-envelope-alt me-1"></i> Message
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- end row -->

    <div class="row mt-3">
      <div class="col-xl-12">
        <div class="text-center my-3">
          <a href="javascript:void(0);" class="text-primary">
            <i class="mdi mdi-loading mdi-spin font-size-20 align-middle me-2"></i>
            Load more
          </a>
        </div>
      </div>
    </div>
    <!-- end row -->
  </Layout>
</template>
