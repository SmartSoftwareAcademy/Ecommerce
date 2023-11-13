export const menuItems = [
    {
        id: 1,
        label: "SITE",
        isTitle: true
    },
    {
        id: 2,
        label: "Home",
        icon: "uil-home-alt",
        badge: {
            variant: "primary",
            text: "GO"
        },
        link: "/"
    },
    {
        id: 3,
        label: "menuitems.apps.text",
        isTitle: true
    },
    {
        id: 4,
        label: "Point Of Sale",
        icon: "uil-dollar-sign",
        subItems: [
            {
                id: 6,
                label: "POS",
                link: "/pos/index",
                parentId: 4
            },
            {
                id: 6,
                label: "Sales",
                link: "/pos/sales",
                parentId: 4
            },
        ]
    },
    {
        id: 5,
        label: "menuitems.chat.text",
        icon: "uil-comments-alt",
        link: "/chat",
        badge: {
            variant: "warning",
            text: "menuitems.chat.badge"
        }
    },
    {
        id: 6,
        label: "Manage Products",
        icon: "uil-store",
        subItems: [
            {
                id: 6,
                label: "Manage Products",
                link: "/ecommerce/manage_products",
                parentId: 6
            },
            {
                id: 7,
                label: "Add Product",
                link: "/ecommerce/add-product",
                parentId: 6
            },
            {
                id: 8,
                label: "Main Categories",
                link: "/ecommerce/product/MainCategories",
                parentId: 6
            },
            {
                id: 8,
                label: "Categories",
                link: "/ecommerce/product/Categories",
                parentId: 6
            },
            {
                id: 9,
                label: "Sub Categories",
                link: "/ecommerce/product/SubCategories",
                parentId: 6
            },
            {
                id: 11,
                label: "Manage Cart",
                link: "/ecommerce/cart",
                parentId: 6
            },
            {
                id: 13,
                label: "Manage Branches",
                link: "/ecommerce/shops",
                parentId: 6
            },
        ]
    },
    {
        id: 15,
        label: "Inbox",
        icon: "uil-envelope",
        subItems: [
            {
                id: 16,
                label: "menuitems.email.list.inbox",
                link: "/email/inbox",
                parentId: 15
            }
        ]
    },
    {
        id: 18,
        label: "Documents",
        icon: "uil-invoice",
        subItems: [
            {
                id: 19,
                label: "Invoices",
                link: "/documents/invoices",
                parentId: 18
            },
            {
                id: 9,
                label: "menuitems.ecommerce.list.orders",
                link: "/documents/orders",
                parentId: 18
            },
            {
                id: 10,
                label: "Transactions",
                link: "/ecommerce/mpesa/transactions",
                parentId: 18
            },
        ]
    },
    {
        id: 20,
        label: "HR",
        icon: "uil-invoice",
        subItems: [
            {
                id: 10,
                label: "menuitems.ecommerce.list.customers",
                link: "/humanresource/Customers",
                parentId: 6
            },
            {
                id: 11,
                label: "Suppliers",
                link: "/humanresource/Suppliers",
                parentId: 6
            },
            {
                id: 12,
                label: "Employees",
                link: "/contacts/list",
                parentId: 21
            }
        ]
    },
    {
        id: 25,
        label: "EXTRA",
        isTitle: true
    },
    {
        id: 31,
        label: "More",
        icon: "uil-apps",
        subItems: [
            {
                id: 35,
                label: "menuitems.utility.list.comingsoon",
                link: "/utility/comingsoon",
                parentId: 31
            },
            {
                id: 36,
                label: "menuitems.utility.list.timeline",
                link: "/utility/timeline",
                parentId: 31
            },
            {
                id: 37,
                label: "menuitems.utility.list.faqs",
                link: "/utility/faqs",
                parentId: 31
            },
            {
                id: 38,
                label: "menuitems.utility.list.pricing",
                link: "/utility/pricing",
                parentId: 31
            }
        ]
    },
];

