import store from '@/state/store'
import Layout from "../views/layouts/Layout";
import PageNotFound from '../views/pages/404/PageNotFound.vue';
import resetTimer from '@/helpers/bengoboxAuth/userActivity';

export default [{
  path: '/login',
  name: 'login',
  component: () => import('../views/pages/account/login'),
  meta: {
    beforeResolve(routeTo, routeFrom, next) {
      // If the user is already logged in
      if (store.getters['auth/loggedIn']) {
        // Redirect to the home page instead
        resetTimer();
        next({
          name: 'home'
        })
      } else {
        //alert(store.getters['auth/loggedIn'])
        // Continue to the login page
        next()
      }
    },
  },
},
{
  path: '/register',
  name: 'register',
  component: () => import('../views/pages/account/register'),
  meta: {
    beforeResolve(routeTo, routeFrom, next) {
      // If the user is already logged in
      if (store.getters['auth/loggedIn']) {
        next({
          name: 'home'
        })

      } else {
        // Continue to the login page
        next()
      }
    },
  },
},
{
  path: '/forgot-password',
  name: 'Forgot-password',
  component: () => import('../views/pages/account/forgot-password'),
  meta: {
    beforeResolve(routeTo, routeFrom, next) {
      // If the user is already logged in
      if (store.getters['auth/loggedIn']) {
        // Redirect to the home page instead
        next({
          name: 'home'
        })

      } else {
        // Continue to the login page
        next()
      }
    },
  },
},
{
  path: '/logout',
  name: 'logout',
  meta: {
    authRequired: true,
    beforeResolve(routeTo, routeFrom, next) {
      if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
        store.dispatch('auth/logOut')
      } else if (process.env.VUE_APP_DEFAULT_AUTH === "bengoboxAuth") {
        store.dispatch('authfack/logout')
      }
      const authRequiredOnPreviousRoute = routeFrom.matched.some(
        (route) => route.push('/login')
      )
      // Navigate back to previous page, or home as a fallback
      next(authRequiredOnPreviousRoute ? {
        name: 'login'
      } : {
        ...routeFrom
      })
    },
  },
},
{
  path: '*',
  name: 'notFound',
  component: PageNotFound
},
{
  path: "/",
  component: Layout,
  children: [
    {
      path: '/',
      name: 'home',
      meta: {
        authRequired: false,
      },
      component: () => import('../views/pages/dashboard/index')
    },
    {
      path: '/blog',
      name: 'Blog',
      meta: {
        authRequired: true,
      },
      component: () => import('../views/pages/blog/Blog')
    },
    {
      path: '/post',
      name: 'Post',
      meta: {
        authRequired: true,
      },
      component: () => import('../views/pages/blog/Post')
    },
    {
      path: '/ecommerce/products',
      name: 'Products',
      meta: {
        authRequired: false
      },
      component: () => import('../views/pages/ecommerce/products')
    },
    {
      path: '/ecommerce/product-detail/:id',
      name: 'Product Detail',
      meta: {
        authRequired: false
      },
      component: () => import('../views/pages/ecommerce/product-detail')
    },
    {
      path: '/ecommerce/favorites/favorites',
      name: 'Favorites',
      meta: {
        authRequired: true
      },
      component: () => import('../views/pages/ecommerce/favorites/favorites')
    },
    {
      path: '/ecommerce/cart',
      name: 'Cart',
      meta: {
        authRequired: true
      },
      component: () => import('../views/pages/ecommerce/cart')
    },
    {
      path: '/ecommerce/checkout',
      name: 'Checkout',
      meta: {
        authRequired: true
      },
      component: () => import('../views/pages/ecommerce/checkout')
    },
    {
      path: '/ecommerce/summery',
      name: 'Summary',
      meta: {
        authRequired: true
      },
      component: () => import('../views/pages/ecommerce/summery')
    },
    {
      path: '/humanresource/parts/Addressbook',
      name: 'Addressbook',
      meta: {
        authRequired: true
      },
      component: () => import('../views/pages/humanresource/parts/Addressbook'),
    },
    {
      path: '/contacts/addressbook',
      name: 'Addresses',
      meta: {
        authRequired: true
      },
      component: () => import('../views/pages/contacts/addresses'),
    },
    {
      path: '/ecommerce/pay',
      name: 'Pay',
      meta: {
        authRequired: true
      },
      component: () => import('../views/pages/ecommerce/pay'),
    },
    {
      path: '/contacts/profile/:user',
      name: 'Profile',
      meta: {
        authRequired: true
      },
      component: () => import('../views/pages/contacts/profile')
    },
  ],
},
{
  path: '/ecommerce/product/MainCategories',
  name: 'MainCategories',
  meta: {
    authRequired: true
  },
  component: () => import('../views/pages/ecommerce/product/MainCategories')
},
{
  path: '/ecommerce/product/Categories',
  name: 'Categories',
  meta: {
    authRequired: true
  },
  component: () => import('../views/pages/ecommerce/product/Categories')
},
{
  path: '/ecommerce/product/SubCategories',
  name: 'SubCategories',
  meta: {
    authRequired: true
  },
  component: () => import('../views/pages/ecommerce/product/SubCategories')
},
{
  path: '/ecommerce/manage_products',
  name: 'Manage Products',
  meta: {
    authRequired: true
  },
  component: () => import('../views/pages/ecommerce/manage_products')
},
{
  path: '/documents/orders',
  name: 'Orders',
  meta: {
    authRequired: true
  },
  component: () => import('../views/pages/documents/orders')
  },
  {
    path: '/ecommerce/mpesa/transactions',
    name: 'Transactions',
    meta: {
      authRequired: true
    },
    component: () => import('../views/pages/ecommerce/mpesa/transactions')
  },
{
  path: '/humanresource/Customers',
  name: 'Customers',
  meta: {
    authRequired: true
  },
  component: () => import('../views/pages/humanresource/Customers')
},
{
  path: '/humanresource/Suppliers',
  name: 'Suppliers',
  meta: {
    authRequired: true
  },
  component: () => import('../views/pages/humanresource/Suppliers')
},
{
  path: '/pos/index',
  name: 'POS',
  meta: {
    authRequired: true
  },
  component: () => import('../views/pages/pos/index')
},
{
  path: '/pos/sales',
  name: 'PosSales',
  meta: {
    authRequired: true
  },
  component: () => import('../views/pages/pos/sales')
},
{
  path: '/ecommerce/shops',
  name: 'Shops',
  meta: {
    authRequired: true
  },
  component: () => import('../views/pages/ecommerce/shops')
},
{
  path: '/ecommerce/add-product',
  name: 'Add Product',
  meta: {
    authRequired: true
  },
  component: () => import('../views/pages/ecommerce/add-product')
},
{
  path: '/email/inbox',
  name: 'Inbox',
  meta: {
    authRequired: true
  },
  component: () => import('../views/pages/email/inbox')
},
{
  path: '/email/reademail/:id',
  name: 'Read Email',
  meta: {
    authRequired: true
  },
  component: () => import('../views/pages/email/reademail')
},
{
  path: '/documents/detail',
  name: 'Invoice Detail',
  meta: {
    authRequired: true
  },
  component: () => import('../views/pages/documents/detail')
},
{
  path: '/documents/invoices',
  name: 'Invoice List',
  meta: {
    authRequired: true
  },
  component: () => import('../views/pages/documents/invoices')
},

{
  path: '/contacts/list',
  name: 'UserList',
  meta: {
    authRequired: true
  },
  component: () => import('../views/pages/contacts/list'),
},
{
  path: '/contacts/grid',
  name: 'UserGrid',
  meta: {
    authRequired: true
  },
  component: () => import('../views/pages/contacts/grid')
},
{
  path: '/Dashboard',
  name: 'dashboard',
  meta: {
    authRequired: true,
  },
  component: () => import('../views/pages/dashboard/Dashboard')
  },
  //Reports
  {
    path: '/report',
    name: 'report',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/reporting/report')
  },
]