<template>
  <v-app id="inspire" class="pb-0 mb-0">
    <v-toolbar color="dark fixed" class="pb-0 mb-0" height="60px" dark>
      <v-app-bar-nav-icon @click="menuOpen = !menuOpen"></v-app-bar-nav-icon>
      <!--      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />-->
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down pl-10 ml-4"
      />
      <v-spacer />
      <div class="text-center" v-if="loggedIn">
        <v-menu
          v-model="menuOpen"
          :close-on-content-click="false"
          offset-y
          class="mt-2 pt-2"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              value=""
              @click.stop="toggleProfile = !toggleProfile"
              v-on="on"
              outlined
            >
              <v-icon class="text-warning">mdi-lock-open</v-icon> Acount
            </v-btn>
          </template>
          <v-list class="mt-2">
            <v-list-item
              v-for="(item, i) in menu_items"
              :key="i"
              @click="toggleProfile = false"
            >
              <v-btn :to="{ name: item.link }">{{ item.title }}</v-btn>
            </v-list-item>
          </v-list>
          <div class="text-center bg-warning rounded p-1 border-2" v-if="adminstaff">
            <v-btn icon to="/dashboard">Admin </v-btn>
          </div>
        </v-menu>
      </div>
      <div class="text-wrap" v-else>
        <v-btn icon to="/login" outlined class="bg-light">
          <v-icon class="text-warning">mdi-lock</v-icon>
        </v-btn>
      </div>
      <v-btn icon>
        <v-badge content="2" value="2" color="red" overlap>
          <v-icon class="text-white-50">mdi-bell</v-icon>
        </v-badge>
      </v-btn>
      <v-btn @click="visitRoute('Favorites')" icon>
        <v-badge
          color="red"
          :content="fav_items_count || 0"
          :value="fav_items_count || 1"
          overlap
        >
          <v-icon class="text-warning">mdi-heart</v-icon>
        </v-badge>
      </v-btn>
      <v-btn @click="visitRoute('Cart')" icon>
        <v-badge
          :content="cart_items_count || 0"
          :value="cart_items_count || 1"
          color="red"
          overlap
        >
          <v-icon class="text-warning">mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-bottom-navigation>
        <v-btn value="Home" @click="visitRoute('home')">
          <v-icon class="text-warning">mdi-home</v-icon>
          HOME
        </v-btn>
        <v-menu v-model="menuOpen" :close-on-content-click="false" offset-y>
          <template v-slot:activator="{ on }">
            <v-btn value="PRODUCTS" @click.stop="menuOpen = !menuOpen" v-on="on">
              <v-icon class="text-warning">mdi-widgets</v-icon>
              PRODUCTS
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, i) in items" :key="i" @click="menuOpen = false">
              <router-link :to="{ name: 'Products' }">{{ item.title }}</router-link>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn value="Cart" @click="visitRoute('Shops')">
          <v-icon class="text-warning">mdi-store</v-icon>
          TOP SELLERS
        </v-btn>
        <v-btn value="Cart" @click="visitRoute('Blog')">
          <v-icon class="text-warning">mdi-book</v-icon>
          TRENDS
        </v-btn>
      </v-bottom-navigation>
    </v-content>
    <router-view />
    <v-footer :padless="true">
      <BottomNav />
      <v-card
        flat
        tile
        width="100%"
        class="secondary bg-gradient white--text text-center"
      >
        <v-card-text class="white--text">
          Copyright &copy; {{ new Date().getFullYear() }}. All Rights Reserved —
          <a href="https://www.bengohub.co.ke" target="_blank"
            ><strong>BengoBox Comerce</strong></a
          >
          Build .Grow .Excel
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>
<script>
import { mapState } from "vuex";
import BottomNav from "../../components/BottomNav.vue";
//import store from '@/state/store';
export default {
  data() {
    return {
      menuOpen: false,
      toggleProfile: false,
      //cart_items_count: 0,
      items: [{ title: "All Products" }],
      menu_items: [
        { title: "Profile", link: "Profile" },
        { title: "LogOut", link: "logout" },
      ],
      activeBtn: 1,
      loggedIn: false,
      adminstaff: false,
    };
  },
  components: {
    BottomNav,
  },
  computed: {
    ...mapState({
      cart_items_count: (state) => state.cart.cart_items_count,
      fav_items_count: (state) => state.favorites.favorites_items_count,
    }),
  },
  mounted() {
    //alert(sessionStorage.user)
    if (sessionStorage.user) {
      this.loggedIn = true;
    }
    if (sessionStorage.isadmin) {
      this.adminstaff = true;
      //this.$router.push({ name: "dashboard" });
    }
  },
  methods: {
    visitRoute(link) {
      this.$router.push({ name: link });
    },
  },
};
</script>
<style>
.v-toolbar {
  height: 100px;
  /* default height */
}
</style>
