<script>
import vue2Dropzone from "vue2-dropzone";

import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

import "vue2-dropzone/dist/vue2Dropzone.min.css";
import "vue-multiselect/dist/vue-multiselect.min.css";
import Multiselect from "vue-multiselect";
import axios from "@/Axiosconfig.js";
import Swal from "sweetalert2";

/**
 * Add-product component
 */
const newheaders = axios.defaults.headers;
newheaders["Content-Type"] = "multipart/form-data";
axios.defaults.headers = newheaders;
export default {
  page: {
    title: "Add Product",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: {
    vueDropzone: vue2Dropzone,
    Multiselect,
    Layout,
    PageHeader,
  },
  data() {
    return {
      title: "Add Product",
      items: [
        {
          text: "Ecommerce",
        },
        {
          text: "Add Product",
          active: true,
        },
      ],
      dropzoneOptions: {
        url: window.$http + "/product/images/",
        autoProcessQueue: false,
        uploadMultiple: true,
        maxFilesize: 2, // maximum size of each file in MB
        acceptedFiles: "image/*", // restrict to image files only
        addRemoveLinks: true, // show remove button on uploaded files
        params: {
          product_id: window.product_id, // replace with the actual product ID
        },
        dictDefaultMessage: 'Drop images here or click to upload',
        maxFiles: 10,
        headers: window.$headers,
      },
      maincat: "Other",
      maincats: [
        "Other",
      ],
      cat: "Other",
      cats: [
        "Other",
      ],
      subcat: "Other",
      subcats: [
        "Other",
      ],
      supplier: "Other",
      Suppliers: [
        "Other",
      ],
      model: "Other",
      sku: 'AC16777763KL',
      price: 0.0,
      discount_price: 0.0,
      product_title: "Lenovo Thinkpad",
      product_description: "Enter product description",
      images: [],
      status: 1,
      reorder_level: 6,
      stock_level: 6,
      weight: '500kg',
      dimensions: '1x1x1',
      availability: 'In Stock',
      availableoptions: ['In Stock', 'Out Of Stock', 'Pre-Order'],
      color: 'black',
      colors: ['black', 'green', 'silver', 'gray', 'maroon', 'white', 'gold', 'brown', 'beige', 'red', 'orange', 'yellow', 'blue', 'purple', 'pink', 'turquoise', 'magenta', 'lavender', 'coral', 'teal', 'navy'],
      size: 'M',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48'],
      previewImagesList: [],
      //variations
      material: "metal",
      product: [],
      stock: [],
      editmode: false,
      url_id:0,
    };
  },
  mounted() {
    if (this.$route.params.product) {
      this.product = this.$route.params.product;
      this.stock = this.$route.params.stock;
      console.log(this.product)
      console.log(this.stock)
      this.title = "Edit Product";
      this.items[1].text = this.product.title;
      this.sku = this.product.sku;
      this.editmode = true;
      this.maincat = this.product.maincategory;
      this.product_title = this.product.title;
      this.product_description = this.product.description;
      this.cat = this.product.categories.map((e) => { return e.name });
      this.subcat = this.product.subcategories.map((e) => {
        return e.name;
      });
      this.color = this.product.variations.filter((e) => e.title === 'color').map((e) => {
        return e.description;
      })
      this.size = this.product.variations.filter((e) => e.title === 'size').map((e) => {
        return e.description;
      })
      this.material = this.product.variations.filter((e) => e.title === 'material').map((e) => {
        return e.description;
      })
      this.model = this.product.model;
      this.price = this.product.price;
      this.discount_price = this.product.discount_price;
      this.stock_level = this.stock.stock_level;
      this.reorder_level = this.stock.reorder_level;
      this.weight = this.product.weight;
      this.dimensions = this.product.dimentions;
      this.availability = this.product.availability;
      this.supplier = this.stock.supplier;
    }
    this.updaarrays();
  },
  methods: {
    updaarrays() {
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
        .get(`categories`)
        .then((response) => {
          // JSON responses are automatically parsed.
          this.cats = response.data['results'];
          axios.get(`subcategories`)
            .then((response) => {
              response.data['results'].filter((e) => {
                this.subcats.push(e.name)
              });
            }).then(() => {
              axios.get(`suppliers`)
                .then((response) => {
                  this.Suppliers = response.data;
                  axios.get(`maincategories`)
                    .then((response) => {
                      this.maincats = response.data['results'];
                    })
                })
            })
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
    saveProduct() {
      var formData = new FormData();
      //variations
      if (this.material != null) {
        formData.append('material', this.material);
      }
      if (this.size != null) {
        formData.append('size', this.size);
      }
      if (this.color != null) {
        formData.append('color', this.color);
      }
      //images
      // get the files from the dropzone field
      const files = this.$refs.myDropzone.getAcceptedFiles();

      // create a new FormData object

      // add each file to the FormData object
      files.forEach((file) => {
        formData.append('images', file);
      });
      console.log(this.cat);
      var data = {
        sku: this.sku,
        model: this.model,
        title: this.product_title,
        description: this.product_description,
        price: this.price,
        discount_price: this.discount_price,
        status: this.status,
        stock_level: this.stock_level,
        reorder_level: this.reorder_level,
        weight: this.weight,
        dimensions: this.dimensions,
        availability: this.availability,
        maincategories: this.maincat.id,
        categories: this.cat,
        subcategories: this.subcat,
        vendor: JSON.parse(localStorage.user).id,
        supplier: this.supplier.id,
      }

      for (let key in data) {
        formData.append(key, data[key]);
      }
      var post_url = "add-product/"+this.url_id+"/";
      formData.append("id", 0);
      if (this.editmode) {
        post_url = "add-product/" + this.product.id + "/";
        formData.append("id", this.product.id);
      }
      axios.post(post_url, formData).then((res) => {
        if (files.length == 0) {
          Swal.fire("Please select at least one product image!");
          return;
        }
        Swal.fire({
          position: "center",
          icon: res.data.icon,
          title: res.data.status,
          html: res.data.msg,
          showConfirmButton: true,
          showCancelButton: true,
          timer: 3000,
        });
      }).catch((e) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error!",
          html: e,
          showConfirmButton: true,
          showCancelButton: true,
          timer: 5000,
        });
      })
    },
  },
  middleware: "authentication",
};
</script>
<style scoped>
.preview-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.preview-container img {
  max-width: 200px;
  max-height: 200px;
}
</style>
In the previewImages method of your component, retrieve the selected files from the file input using the $refs object. Loop through the files and create a FileReader object to read the contents of each file. When the file contents are loaded, add the resulting data URL to the previewImages array.

Bind the previewImages array to the preview area of your form using a v-for loop and an img tag.

With this implementation, the selected images will be previewed in the preview area as soon as they are selected by the user in the file input.






<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-lg-12">
        <div id="addproduct-accordion" class="custom-accordion">
          <div class="card">
            <a href="javascript: void(0);" class="text-dark" data-toggle="collapse" aria-expanded="true"
              aria-controls="addproduct-billinginfo-collapse" v-b-toggle.accordion-1>
              <div class="p-4">
                <div class="media align-items-center">
                  <div class="me-3">
                    <div class="avatar-xs">
                      <div class="avatar-title rounded-circle bg-soft-primary text-primary">
                        01
                      </div>
                    </div>
                  </div>
                  <div class="media-body overflow-hidden">
                    <h5 class="font-size-16 mb-1">Product Info</h5>
                    <p class="text-muted text-truncate mb-0">
                      Fill all information below
                    </p>
                  </div>
                  <i class="mdi mdi-chevron-up accor-down-icon font-size-24"></i>
                </div>
              </div>
            </a>

            <b-collapse data-parent="#addproduct-accordion" id="accordion-1" visible accordion="my-accordion">
              <div class="p-4 border-top">
                <form @submit.prevent="handleSubmit()">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="mb-3">
                        <label for="sku">Product SKU*:</label>
                        <input id="sku" name="sku" type="text" class="form-control" v-model="sku" :placeholder="sku" />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="mb-3">
                        <label for="product_title">Product Name*:</label>
                        <input id="product_title" name="product_title" type="text" class="form-control"
                          v-model="product_title" />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-3">
                      <div class="mb-3">
                        <label for="suppliername">supplier<button class="badge badge-pill bg-primary"
                            @click="addsupplier()"><i class="fa fa-plus"></i> Add New</button></label>
                        <multiselect v-model="supplier" :options="Suppliers" :option-label="supplier => supplier.name"
                          placeholder="Search a supplier" label="name" track-by="id" :multiple="false" :editable="true">
                        </multiselect>
                      </div>
                    </div>
                    <div class="col-lg-3">
                      <div class="mb-3">
                        <label class="control-label">Model</label>
                        <input id="model" name="model" type="text" class="form-control" v-model="model" />
                      </div>
                    </div>
                    <div class="col-lg-3">
                      <div class="mb-3">
                        <label for="price">Price*:</label>
                        <input id="price" name="price" type="number" class="form-control" v-model="price" required />
                      </div>
                    </div>
                    <div class="col-lg-3">
                      <div class="mb-3">
                        <label for="discount">Discount Price</label>
                        <input id="discount" name="discount" type="number" class="form-control"
                          v-model="discount_price" />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4">
                      <div class="mb-3">
                        <div class="mb-3">
                          <label class="control-label">Main Category <button class="badge badge-pill bg-primary"
                              @click="addCats()"><i class="fa fa-plus"></i> Add New</button></label>
                          <multiselect v-model="maincat" :options="maincats" :option-label="cat => cat.name"
                            placeholder="Search a category" label="name" track-by="id" :multiple="false"></multiselect>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="mb-3">
                        <div class="mb-3">
                          <label class="control-label">Categories <button class="badge badge-pill bg-primary"
                              @click="addCats()"><i class="fa fa-plus"></i> Add New</button></label>
                          <multiselect v-model="cat" :options="cats" :option-label="cat => cat.name"
                            placeholder="Search a category" label="name" track-by="id" :multiple="false"></multiselect>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="mb-3">
                        <label class="control-label">Sub Categories <button class="badge badge-pill bg-primary"
                            @click="addSubcats()"><i class="fa fa-plus"></i> Add New</button></label>
                        <multiselect v-model="subcat" :options="subcats" :multiple="true"></multiselect>
                      </div>
                    </div>
                  </div>

                  <div class="mb-3 mb-0">
                    <label for="product_description">Product Description*:</label>
                    <textarea class="form-control" id="product_description" rows="6" v-model="product_description"
                      required></textarea>
                  </div>
                </form>
              </div>
            </b-collapse>
          </div>

          <div class="card">
            <a href="javascript: void(0);" class="text-dark collapsed" v-b-toggle.accordion-3>
              <div class="p-4">
                <div class="media align-items-center">
                  <div class="me-3">
                    <div class="avatar-xs">
                      <div class="avatar-title rounded-circle bg-soft-primary text-primary">
                        02
                      </div>
                    </div>
                  </div>
                  <div class="media-body overflow-hidden">
                    <h5 class="font-size-16 mb-1">Meta Data</h5>
                    <p class="text-muted text-truncate mb-0">
                      Fill all that applies
                    </p>
                  </div>
                  <i class="mdi mdi-chevron-up accor-down-icon font-size-24"></i>
                </div>
              </div>
            </a>

            <b-collapse id="accordion-3" accordion="my-accordion" data-parent="#addproduct-accordion">
              <div class="p-4 border-top">
                <form>
                  <div class="row">
                    <div class="col-sm-3">
                      <div class="mb-3">
                        <label for="sku">Stock Level*:</label>
                        <input type="number" id="stock_level" v-model="stock_level" class="form-control"
                          placeholder="Available Units" required>
                      </div>
                    </div>
                    <div class="col-sm-3">
                      <div class="mb-3">
                        <label for="sku">Stock Reorder Level*:</label>
                        <input type="number" id="reorder_level" v-model="reorder_level" class="form-control"
                          placeholder="Reorder at what stock level">
                      </div>
                    </div>
                    <div class="col-sm-3">
                      <div class="mb-3">
                        <label for="weight">Product Weight|Mass|Volume:</label>
                        <input type="text" id="weight" v-model="weight" placeholder="500ml" class="form-control">
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-4">
                      <div class="mb-3 mb-0">
                        <label for="dimensions">Product Dimensions:</label>
                        <input type="text" id="dimensions" v-model="dimensions" placeholder="LxWxH(e.g 3x2x1)"
                          class="form-control" required>
                      </div>
                    </div>
                    <div class="col-sm-4">
                      <div class="mb-3">
                        <label for="availability">Product Availability*:</label>
                        <multiselect v-model="availability" :options="availableoptions" :multiple="false"></multiselect>
                      </div>
                    </div>
                  </div>

                </form>
              </div>
            </b-collapse>
          </div>

          <div class="card">
            <a href="javascript: void(0);" class="text-dark collapsed" v-b-toggle.accordion-4>
              <div class="p-4">
                <div class="media align-items-center">
                  <div class="me-3">
                    <div class="avatar-xs">
                      <div class="avatar-title rounded-circle bg-soft-primary text-primary">
                        03
                      </div>
                    </div>
                  </div>
                  <div class="media-body overflow-hidden">
                    <h5 class="font-size-16 mb-1">Variations</h5>
                    <p class="text-muted text-truncate mb-0">
                      Fill all that applies
                    </p>
                  </div>
                  <i class="mdi mdi-chevron-up accor-down-icon font-size-24"></i>
                </div>
              </div>
            </a>

            <b-collapse id="accordion-4" accordion="my-accordion" data-parent="#addproduct-accordion">
              <div class="p-4 border-top">
                <form>
                  <div class="row">
                    <div class="col-sm-3">
                      <div class="mb-3">
                        <label for="size">Product Sizes:</label>
                        <multiselect v-model="size" :options="sizes" :multiple="true"></multiselect>
                      </div>
                    </div>
                    <div class="col-sm-3">
                      <div class="mb-3">
                        <label for="color">Product Colors:</label>
                        <multiselect v-model="color" :options="colors" :multiple="true"></multiselect>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="mb-3 mb-0">
                        <label for="dimensions">Matrial:</label>
                        <input type="text" id="material" v-model="material" placeholder="Lether" class="form-control"
                          required>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </b-collapse>
          </div>

          <div class="card">
            <a href="javascript: void(0);" class="text-dark collapsed" data-toggle="collapse" aria-expanded="false"
              aria-controls="addproduct-img-collapse" v-b-toggle.accordion-2>
              <div class="p-4">
                <div class="media align-items-center">
                  <div class="me-3">
                    <div class="avatar-xs">
                      <div class="avatar-title rounded-circle bg-soft-primary text-primary">
                        04
                      </div>
                    </div>
                  </div>
                  <div class="media-body overflow-hidden">
                    <h5 class="font-size-16 mb-1">Product Image</h5>
                    <p class="text-muted text-truncate mb-0">
                      Select all product images
                    </p>
                  </div>
                  <i class="mdi mdi-chevron-up accor-down-icon font-size-24"></i>
                </div>
              </div>
            </a>

            <b-collapse id="accordion-2" accordion="my-accordion" data-parent="#addproduct-accordion">
              <div class="p-4 border-top">
                <vue-dropzone ref="myDropzone" id="dropzone" :options="dropzoneOptions">
                </vue-dropzone>
                <img v-for="image in product.images" :src="image.image" :key="image.id" alt="product image" />
              </div>
            </b-collapse>
          </div>


        </div>
      </div>
    </div>
    <v-modal>
    </v-modal>
    <div class="row mb-4">
      <div class="col text-end ms-1">
        <a href="/" class="btn btn-danger">
          <i class="uil uil-times me-1"></i> Cancel
        </a>
        <button href="#" class="btn btn-success ms-1" @click="saveProduct()">
          <i class="uil uil-file-alt me-1"></i> Save
        </button>
      </div>
      <!-- end col -->

    </div>
  </Layout>
</template>
