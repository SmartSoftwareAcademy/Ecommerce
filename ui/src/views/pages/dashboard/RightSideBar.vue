<template>
    <div class="col-md-12 col-sm-12 col-xs-12 overflow-auto">
        <v-card outlined>
            <v-card-title class="btn btn-light" icon>
                <v-icon class="text-dark">mdi-widgets</v-icon> Categories<router-link :to="{ name: 'Categories', }"
                    class="badge badge-pill">Se
                    all></router-link>
            </v-card-title>
            <v-divider></v-divider>
            <template>
                <!-- <v-treeview :items="items" :open="[0]" :active="[5]" :selected-color="'#ffe'" activatable open-on-click
                    dense></v-treeview> -->
                <v-treeview :items="maincats" :open="open">
                    <template v-slot:prepend="{ item }">
                        <v-icon v-if="item.children" class="text-warning">mdi-folder</v-icon>
                        <v-icon v-else class="text-info">mdi-file</v-icon>
                    </template>
                    <template v-slot:label="{ item }">
                        <router-link v-if="item.link" :to="{ name: item.link }">{{ item.name }}</router-link>
                        <router-link :to="{ name: 'Products', params: { category: item, children: item.children } }"
                            v-else>{{ item.name }}</router-link>
                    </template>
                </v-treeview>
            </template>
            <v-divider></v-divider>
        </v-card>
        <div class="row">
            <!--modals-->
            <b-modal id="add-cat" :title="modattitle" size="lg">
                <addCategory />
            </b-modal>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
    components: {},
    data() {
        return {
            title: "Categories",
            breadcrumb: [
                {
                    text: "Categories",
                },
                {
                    text: "Categories",
                    active: true,
                },
            ],
            saleslist: [
            ],
            totalRows: 1,
            currentPage: 1,
            perPage: 10,
            pageOptions: [10, 25, 50, 100],
            filter: null,
            filterOn: [],
            sortBy: "age",
            sortDesc: false,
            total: 0,
            salesitems: [],
            paymentMethod: "",
            maincats: [
                // {
                //     id: 1,
                //     name: 'Baby Products',
                //     children: [
                //         { id: 5, name: 'Shirts' },
                //         { id: 6, name: 'Tops' },
                //         { id: 7, name: 'Tunics' },
                //         { id: 8, name: 'Bodysuit' },
                //     ],
                // }
            ],
        };
    },
    computed: {
    },
    mounted() {
        // Set the initial number of items
        this.updatearrays()
    },
    methods: {
        updatearrays() {
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
                .get(window.$http + `maincategories`)
                .then((response) => {
                    // JSON responses are automatically parsed.
                    var data = response.data['results'];
                    data.forEach((item, index) => {
                        this.maincats.push({
                            id: item.id,
                            name: item.name,
                        });
                        if (data[index].categories) {
                            var cats = data[index].categories;
                            this.maincats[index]['children'] = [];
                            cats.forEach((val, i) => {
                                this.maincats[index].children.push(
                                    {
                                        id: val.id,
                                        name: val.name,
                                    }
                                );
                                if (cats[i].Subcategories) {
                                    var subcats = cats[i].Subcategories;
                                    cats[i]['subchildren'] = [];
                                    subcats.forEach((val) => {
                                        cats[i].subchildren.push(
                                            {
                                                id: val.id,
                                                name: val.name,
                                            }
                                        );
                                    });
                                }
                            });
                        }
                    });
                    console.log(this.maincats);
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