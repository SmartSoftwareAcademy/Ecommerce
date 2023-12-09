<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

import Stat from "@/components/widgets/stat";
import SalesAnalytics from "./sales-analytics";
import SellingProduct from "./selling-product";

export default {
  page: {
    title: "Dashboard",
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
    Stat,
    SalesAnalytics,
    SellingProduct,
  },
  data() {
    return {
      title: "Dashboard",
      items: [
        {
          text: "Minible",
        },
        {
          text: "Dashboard",
          active: true,
        },
      ],
    };
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <Stat />
    <div class="row">
      <SalesAnalytics />
      <div class="col-xl-4 col-md-6 col-sm-12">
        <!-- end card-->
        <SellingProduct />
      </div>
    </div>
  </Layout>
</template>
