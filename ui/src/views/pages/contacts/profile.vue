<script>
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

/**
 * Profile component
 */
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
            items: [{
                text: "Contacts",
            },
            {
                text: "Profile",
                active: true,
            },
            ],
            profile: [],
            address_headers: [
                { text: 'First Name', value: 'first_name', sortable: false },
                { text: 'Last Name', value: 'last_name', sortable: false },
                { text: 'Delivery Address', value: 'delivery_address', sortable: false },
                { text: 'Region', value: 'region', sortable: false },
                { text: 'City', value: 'city', sortable: false },
                { text: 'Actions', value: 'action', sortable: false },
            ],
            addresses: [],
            search: '',
        };
    },
    created() {

    },
    mounted() {
        this.profile = this.$route.params.user;
        this.addresses = JSON.parse(localStorage.addresses).address;
    },
    methods: {
        edit(item) {
            // Implement your edit item functionality here
            console.log(`Editing item ${item.name}`);
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
                            <b-dropdown class="float-end" variant="white" right menu-class="dropdown-menu-end"
                                toggle-class="font-size-16 text-body p-0">
                                <template v-slot:button-content>
                                    <i class="uil uil-ellipsis-v"></i>
                                </template>
                                <a class="dropdown-item" href="#">Edit</a>
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Remove</a>
                            </b-dropdown>
                            <div class="clearfix"></div>
                            <div class="mb-4">
                                <img v-if="profile.image" :src="profile.image" alt
                                    class="avatar-lg rounded-circle img-thumbnail" />
                                <div class="avatar-lg mx-auto mb-4" v-if="!profile.image">
                                    <div class="avatar-title bg-soft-primary rounded-circle text-primary">
                                        <i class="mdi mdi-account-circle display-4 m-0 text-primary"></i>
                                    </div>
                                </div>
                            </div>
                            <h5 class="mt-3 mb-1">{{ this.profile.first_name }} {{ this.profile.last_name }}</h5>
                            <p class="text-muted">{{ this.profile.groups__name }}</p>

                            <div class="mt-4">
                                <router-link type="button" class="btn btn-light btn-sm">
                                    <i class="uil uil-envelope-alt me-2"></i> Message
                                </router-link>
                            </div>
                        </div>

                        <hr class="my-4" />

                        <div class="text-muted">
                            <h5 class="font-size-16">About</h5>
                            <p>Hi I'm {{ this.profile.username }},has been the industry's standard dummy text To an English
                                person, it will seem
                                like simplified English, as a skeptical Cambridge.</p>
                            <div class="table-responsive mt-4 mb-0">
                                <div>
                                    <p class="mb-1">Name :</p>
                                    <h5 class="font-size-16">{{ this.profile.first_name }} {{ this.profile.last_name }}</h5>
                                </div>
                                <div class="mt-4">
                                    <p class="mb-1">Mobile :</p>
                                    <h5 class="font-size-16">{{ this.profile.phone }}</h5>
                                </div>
                                <div class="mt-4">
                                    <p class="mb-1">E-mail :</p>
                                    <h5 class="font-size-16">{{ this.profile.email }}</h5>
                                </div>
                                <div class="mt-4">
                                    <p class="mb-1">Organisation :</p>
                                    <h5 class="font-size-16">{{ this.profile.organisation }}</h5>
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
                                    <v-data-table :headers="address_headers" :items="addresses" :search="search">
                                        <template v-slot:item.action="{ item }">
                                            <router-link
                                                :to="{ name: 'Addressbook', params: { address: item, selectmode: true, editmode: true, modaltitle: 'Edit shpping address' } }"
                                                class="uil uil-pen">
                                            </router-link>
                                        </template>
                                    </v-data-table>
                                    <div class="row">
                                        <div class="form-group">
                                            <router-link
                                                :to="{ name: 'Addressbook', params: { selectmode: false, editmode: false } }"
                                                class="btn btn-warning mb-2 float-end mr-4 mt-2 ui uil-plus text-white font-weight-bold">
                                                ADD NEW
                                                ADDRESS
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
                                <h5 class="font-size-16 mb-4">Experience</h5>

                                <ul class="activity-feed mb-0 ps-2">
                                    <li class="feed-item">
                                        <div class="feed-item-list">
                                            <p class="text-muted mb-1">2019 - 2020</p>
                                            <h5 class="font-size-16">UI/UX Designer</h5>
                                            <p>Abc Company</p>
                                            <p class="text-muted">To achieve this, it would be necessary to have uniform
                                                grammar, pronunciation and more common words. If several languages
                                                coalesce, the grammar of the resulting language is more simple and
                                                regular than that of the individual</p>
                                        </div>
                                    </li>
                                    <li class="feed-item">
                                        <div class="feed-item-list">
                                            <p class="text-muted mb-1">2017 - 2019</p>
                                            <h5 class="font-size-16">Graphic Designer</h5>
                                            <p>xyz Company</p>
                                            <p class="text-muted">It will be as simple as occidental in fact, it will be
                                                Occidental. To an English person, it will seem like simplified English,
                                                as a skeptical Cambridge friend of mine told me what Occidental</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </b-tab>
                        <b-tab>
                            <template v-slot:title>
                                <i class="uil uil-envelope-alt font-size-20"></i>
                                <span class="d-none d-sm-block">INBOX</span>
                            </template>
                            <div>
                                <div data-simplebar style="max-height: 430px;">
                                    <div class="media border-bottom py-4">
                                        <img class="me-2 rounded-circle avatar-xs" src="@/assets/images/users/avatar-3.jpg"
                                            alt />
                                        <div class="media-body">
                                            <h5 class="font-size-15 mt-0 mb-1">
                                                Marion Walker
                                                <small class="text-muted float-end">1 hr ago</small>
                                            </h5>
                                            <p class="text-muted">If several languages coalesce, the grammar of the
                                                resulting .</p>

                                            <a href="javascript: void(0);" class="text-muted font-13 d-inline-block">
                                                <i class="mdi mdi-reply"></i> Reply
                                            </a>

                                            <div class="media mt-4">
                                                <img class="me-2 rounded-circle avatar-xs"
                                                    src="@/assets/images/users/avatar-4.jpg" alt />
                                                <div class="media-body">
                                                    <h5 class="font-size-15 mt-0 mb-1">
                                                        Shanon Marvin
                                                        <small class="text-muted float-end">1 hr ago</small>
                                                    </h5>
                                                    <p class="text-muted">It will be as simple as in fact, it will be
                                                        Occidental. To it will seem like simplified .</p>

                                                    <a href="javascript: void(0);"
                                                        class="text-muted font-13 d-inline-block">
                                                        <i class="mdi mdi-reply"></i> Reply
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="media border-bottom py-4">
                                        <img class="me-2 rounded-circle avatar-xs" src="@/assets/images/users/avatar-5.jpg"
                                            alt />
                                        <div class="media-body">
                                            <h5 class="font-size-15 mt-0 mb-1">
                                                Janice Morgan
                                                <small class="text-muted float-end">2 hrs ago</small>
                                            </h5>
                                            <p class="text-muted">To achieve this, it would be necessary to have uniform
                                                pronunciation.</p>

                                            <a href="javascript: void(0);" class="text-muted font-13 d-inline-block">
                                                <i class="mdi mdi-reply"></i> Reply
                                            </a>
                                        </div>
                                    </div>

                                    <div class="media border-bottom py-4">
                                        <img class="me-2 rounded-circle avatar-xs" src="@/assets/images/users/avatar-7.jpg"
                                            alt />
                                        <div class="media-body">
                                            <h5 class="font-size-15 mt-0 mb-1">
                                                Patrick Petty
                                                <small class="text-muted float-end">3 hrs ago</small>
                                            </h5>
                                            <p class="text-muted">Sed ut perspiciatis unde omnis iste natus error sit</p>

                                            <a href="javascript: void(0);" class="text-muted font-13 d-inline-block">
                                                <i class="mdi mdi-reply"></i> Reply
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div class="border rounded mt-4">
                                    <form action="#">
                                        <div class="px-2 py-1 bg-light">
                                            <div class="btn-group" role="group">
                                                <button type="button"
                                                    class="btn btn-sm btn-link text-dark text-decoration-none">
                                                    <i class="uil uil-link"></i>
                                                </button>
                                                <button type="button"
                                                    class="btn btn-sm btn-link text-dark text-decoration-none">
                                                    <i class="uil uil-smile"></i>
                                                </button>
                                                <button type="button"
                                                    class="btn btn-sm btn-link text-dark text-decoration-none">
                                                    <i class="uil uil-at"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <textarea rows="3" class="form-control border-0 resize-none"
                                            placeholder="Your Message..."></textarea>
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
