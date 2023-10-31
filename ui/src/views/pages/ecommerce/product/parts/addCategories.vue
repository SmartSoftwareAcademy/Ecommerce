<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import Swal from "sweetalert2";
import axios from "@/Axiosconfig.js";

const newheaders = axios.defaults.headers;
newheaders["Content-Type"] = "multipart/form-data";
axios.defaults.headers = newheaders;
export default {
    props: {
        orderData: Array,
        name: String,
        display_image: String,
        modaltitle: String,
        editmode: Boolean,
        id: Number,
        myindex: Number,
    },
    components: {
        vueDropzone: vue2Dropzone,
    },
    data() {
        return {
            dropzoneOptions: {
                url: window.$http + "/category/images/",
                autoProcessQueue: false,
                uploadMultiple: true,
                maxFilesize: 2, // maximum size of each file in MB
                acceptedFiles: "image/*", // restrict to image files only
                addRemoveLinks: true, // show remove button on uploaded files
                dictDefaultMessage: 'Drop Category display image here or click to upload',
                maxFiles: 10,
                headers: window.$headers,
            },
            title: "Add Categories",
            items: [
                {
                    text: "USER: Admin",
                },
                {
                    text: "Add Category",
                    active: true,
                },
            ],

        };
    },
    mounted() {
        alert(this.id)
    },
    methods: {
        handleSubmit() {
            console.log("Error on submit");
        },
        addRec() {
            if (this.name.trim() == "") {
                Swal.fire("Please enter Category Name!");
                return;
            }
            var data = new FormData();
            const files = this.$refs.myDropzone.getAcceptedFiles();
            files.forEach((file) => {
                data.append('display_image', file);
            });
            data.append('name', this.name);
            var orderid = this.orderData.length + 1;
            this.orderData.push({
                id: orderid,
                name: this.name,
                displayImage: this.displahyImage,
            });
            axios
                .post("categories/", data)
                .then((response) => {
                    console.log(response.data);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your work has been saved. Category " + this.name + " Added",
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
            if (this.name.trim() == "") {
                Swal.fire("Please enter Category Name");
                return;
            }
            var data = new FormData();
            const files = this.$refs.myDropzone.getAcceptedFiles();
            files.forEach((file) => {
                data.append('display_image', file);
            });
            data.append('name', this.name);
            data.append('id', this.id);
            axios
                .put("categories/" + this.id + "/", data)
                .then(() => {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your work has been saved. Category " + this.name,
                        showConfirmButton: false,
                        timer: 1500,
                    }).then((result) => {
                        result;
                        this.orderData[this.myindex].name = this.name;
                        this.orderData[this.display_image].name = this.display_image;
                    });
                })
                .catch((e) => {
                    this.errors.push(e);
                });

        },
    },
};
</script>

<template>
    <div class="container-fluid p-4 m-4">
        <form @submit.prevent="handleSubmit">
            <div class="row  align-items-center justify-content-center">
                <div class="col-sm-12">
                    <div class="input-group">
                        <div class="input-group-text col-sm-4">Name:</div>
                        <input class="form-control" type="text" placeholder="Enter Category Name" v-model="name" />
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="card">

                        <div class="p-2">
                            <div class="media align-items-center">
                                <div class="media-body overflow-hidden">
                                    <h5 class="font-size-16 mb-1">Display Image</h5>
                                </div>
                                <i class="mdi mdi-chevron-up accor-down-icon font-size-24"></i>
                            </div>
                        </div>

                        <div class="p-2 border-top">
                            <vue-dropzone ref="myDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
                        </div>

                    </div>
                </div>
            </div>
        </form>
        <div class="row">
            <div class="col-sm-10"></div>
            <div class="col-sm-2">
                <b-button v-show="!editmode" variant="dark" @click="addRec()">Add Category</b-button>
                <b-button v-show="editmode" variant="dark" @click="editRec()">Edit Category</b-button>
            </div>
        </div>
    </div>
</template>