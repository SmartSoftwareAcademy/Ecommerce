<template>
  <div class="container overflow-auto">
    <v-card class="receipt-card" ref="receipt" id="receipt">
      <v-card-title class="receipt-title">BengoBox Commerce</v-card-title>
      <v-card-text class="receipt-text">
        <p>Receipt No: {{ receiptNo.toUpperCase() }}</p>
        <p>Time: {{ formatDate }}, {{ formatTime }}</p>
        <p>------------------------------------</p>
        <v-data-table
          :headers="headers"
          :items="items"
          item-key="id"
          hide-default-footer
          class="hide-per-page"
        >
          <template v-slot:[`item.title`]="{ item }" class="text-wrap overflow-auto">{{
            item.product_title
          }}</template>
          <template v-slot:[`item.retail_price`]="{ item }">{{ item.retail_price }}</template>
          <template v-slot:[`item.quantity`]="{ item }">{{ item.quantity }}</template>
        </v-data-table>
        <p>------------------------------------</p>
        <v-row>
          <v-col class="font-weight-bold"
            >Subtotal: {{ formatCurrency(subtotal * total) }}</v-col
          >
        </v-row>
        <v-row>
          <v-col class="font-weight-bold">VAT: {{ formatCurrency(tax * total) }}</v-col>
        </v-row>
        <v-row>
          <v-col class="font-weight-bold">Total: {{ formatCurrency(total) }}</v-col>
        </v-row>
        <p>------------------------------------</p>
        <v-row>
          <v-col class="font-weight-bold">Served By:{{ user }}</v-col>
          <v-row>
            <v-col class="font-weight-bold">Payment Method: {{ paymentMethod }}</v-col>
          </v-row>
        </v-row>
      </v-card-text>
    </v-card>
    <!-- <v-btn class="print-btn" @click="printReceipt">Print Receipt</v-btn> -->
  </div>
</template>

<script>
//import jsPDF from "jspdf";

export default {
  name: "Receipt",
  props: {
    items: Array,
    headers: Array,
    total: Number,
    paymentMethod: String,
    receiptNo: String,
  },
  data() {
    return {
      subtotal: 0.84,
      tax: 0.16,
      user: JSON.parse(localStorage.user).name,
    };
  },
  computed: {
    formatDate() {
      const date = new Date();
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    formatTime() {
      const date = new Date();
      return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    },
  },
  mounted() {
    // Listen for the custom-action event from the parent component
    this.$parent.$on("printReceipt", this.handlePrint);
  },
  beforeUnmount() {
    // Cleanup the event listener when the component is unmounted
    this.$parent.$off("printReceipt", this.handlePrint);
  },
  methods: {
    formatCurrency(value) {
      return `Kshs.${value.toFixed(2)}`;
    },
    handlePrint() {
      const printWindow = window.open("", "_blank", "width=800,height=600");
      printWindow.document.write("<html><head><title>Receipt</title></head><body>");
      const printContents = document.getElementById("receipt").innerHTML;
      printWindow.document.write(printContents);
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
    },
  },
};
</script>
<style>
.hide-per-page .v-data-footer__actions {
  display: none;
}

.receipt {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.receipt-card {
  max-width: 300px;
}

.receipt-title {
  text-align: center;
}

.receipt-text {
  padding: 16px;
}

.receipt-items {
  margin-bottom: 4px;
}

.print-btn {
  margin-top: 16px;
}
</style>
