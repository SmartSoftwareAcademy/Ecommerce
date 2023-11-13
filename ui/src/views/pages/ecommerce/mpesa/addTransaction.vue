<template>
  <div class="container">
    <!-- Transaction Form -->
    <form @submit.prevent="addTransaction">
      <div class="form-group">
        <label for="transactionType">Transaction Type</label>
        <select v-model="transactionType" class="form-control" required>
          <option value="withdrawal">Withdrawal</option>
          <option value="deposit">Deposit</option>
        </select>
      </div>
      <div class="form-group">
        <label for="transactionRef">Transaction Reference</label>
        <input v-model="transactionRef" type="text" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="clientName">Client Name</label>
        <input v-model="clientName" type="text" class="form-control" />
      </div>
      <div class="form-group">
        <label for="clientId">Client ID</label>
        <input v-model="clientId" type="text" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="amount">Amount</label>
        <input v-model="amount" type="number" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="date">Date</label>
        <input v-model="date" type="date" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-secondary mt-2">{{ modaltitle }}</button>
    </form>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import axios from "@/Axiosconfig";

const newheaders = axios.defaults.headers;
newheaders["Content-Type"] = "multipart/form-data";
axios.defaults.headers = newheaders;
export default {
  props: {
    transactions: Array,
    modaltitle: String,
    editmode: Boolean,
    id: Number,
    myindex: Number,
  },
  components: {},
  data() {
    return {
      transactionType: "deposit",
      transactionRef: "HX56474Y8",
      clientName: "Jane Doe",
      clientId: "6473738",
      amount: 1000,
      date: new Date("11-13-2023"),
    };
  },
  mounted() {},
  methods: {
    handleSubmit() {
      console.log("Error on submit");
    },
    addTransaction() {
      if (this.transactionType.trim() == "") {
        Swal.fire("Please enter Transaction Type!");
        return;
      }
      if (this.transactionRef.trim() == "") {
        Swal.fire("Please enter Transaction Ref!");
        return;
      }
      var data = {
        clientName: this.clientName,
        clientId: this.clientId,
        transactionType: this.transactionType,
        transactionRef: this.transactionRef,
        amount: this.amount,
        date: this.date,
      };
      var orderid = this.transactions.length + 1;
      this.transactions.push({
        id: orderid,
        clientName: this.clientName,
        clientId: this.clientId,
        transactionType: this.transactionType,
        transactionRef: this.transactionRef,
        amount: this.amount,
        date: this.date,
      });
      axios
        .post("transactions/", data)
        .then((response) => {
          console.log(response.data);
          Swal.fire({
            position: "center",
            icon: "success",
            title:
              "Your work has been saved. Transaction " + this.transactionRef + " Added",
            showConfirmButton: false,
            timer: 3000,
          }).then((result) => {
            result;
            this.clearvalues();
          });
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    editRec() {
      if (this.transactionType.trim() == "") {
        Swal.fire("Please enter Transaction Type!");
        return;
      }
      if (this.transactionRef.trim() == "") {
        Swal.fire("Please enter Transaction Ref!");
        return;
      }
      var data = {
        clientName: this.clientName,
        clientId: this.clientId,
        transactionType: this.transactionType,
        transactionRef: this.transactionRef,
        amount: this.amount,
        date: this.date,
      };
      axios
        .put("transactions/" + this.id + "/", data)
        .then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved. Transaction " + this.transactionRef,
            showConfirmButton: false,
            timer: 1500,
          }).then((result) => {
            result;
            this.transactions[this.myindex].clientName = this.clientName;
            this.transactions[this.myindex].transactionRef = this.transactionRef;
            this.transactions[this.myindex].transactionType = this.transactionType;
            this.transactions[this.myindex].clientId = this.clientId;
            this.transactions[this.myindex].amount = this.amount;
            this.transactions[this.myindex].date = this.date;
          });
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
};
</script>
