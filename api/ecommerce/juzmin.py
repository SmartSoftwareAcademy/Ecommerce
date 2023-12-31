from datetime import datetime

JAZZMIN_SETTINGS = {
    # title of the window (Will default to current_admin_site.site_title if absent or None)
    "site_title": "E-Commerce Admin",

    # Title on the login screen (19 chars max) (defaults to current_admin_site.site_header if absent or None)
    "site_header": "E-Commerce Administration",

    # Title on the brand (19 chars max) (defaults to current_admin_site.site_header if absent or None)
    "site_brand": "Admin",

    # Logo to use for your site, must be present in static files, used for brand on top left
    "site_logo": "/logo/logo.png",

    # CSS classes that are applied to the logo above
    "site_logo_classes": "img-circle img-fluid",

    # Relative path to a favicon for your site, will default to site_logo if absent (ideally 32x32 px)
    "site_icon": "/logo/logo.png",

    # Welcome text on the login screen
    "welcome_sign": "Welcome to BengoBox Admin",

    # Copyright on the footer
    "copyright": f"Copyright © Bengomall @ {datetime.now().year}. All Rights reserved.",

    # The model admin to search from the search bar, search bar omitted if excluded
    "search_model": "authmanagement.MyUser",

    # Field name on user model that contains avatar ImageField/URLField/Charfield or a callable that receives the user
    "user_avatar": "/logo/logo.png",

    ############
    # Top Menu #
    ############

    # Links to put along the top menu
    "topmenu_links": [

        # Url that gets reversed (Permissions can be added)
        {"name": "Home",  "url": "/user/home", "permissions": ["auth.view_user"]},

        # external url that opens in a new window (Permissions can be added)
        {"name": "Support", "url": "https://bengohub.co.ke", "new_window": True},

        # model admin to link to (Permissions checked against model)
        {"model": "authmanagement.MyUser"},

        # App with dropdown menu to all its models pages (Permissions checked against models)
        {"app": "product"},
    ],

    #############
    # User Menu #
    #############

    # Additional links to include in the user menu on the top right ("app" url type is not allowed)
    #https://github.com/farridav/django-jazzmin/issues
    "usermenu_links": [
        {"name": "Support", "url": "https://bengohub.co.ke", "new_window": True},
        {"model": "authmanagement.MyUser"}
    ],

    #############
    # Side Menu #
    #############

    # Whether to display the side menu
    "show_sidebar": True,

    # Whether to aut expand the menu
    "navigation_expanded": True,

    # Hide these apps when generating side menu e.g (auth)
    "hide_apps": [],

    # Hide these models when generating side menu (e.g authman.CustomUser)
    "hide_models": [],

    # List of apps (and/or models) to base side menu ordering off of (does not need to contain all apps/models)
    "order_with_respect_to": ["account","auth.group"],

    # Custom links to append to app groups, keyed on app name
    "custom_links": {
        "books": [{
            "name": "Make Messages",
            "url": "make_messages",
            "icon": "fas fa-comments",
            "permissions": ["books.view_book"]
        }]
    },

    # Custom icons for side menu apps/models See https://fontawesome.com/icons?d=gallery&m=free&v=5.0.0,5.0.1,5.0.10,5.0.11,5.0.12,5.0.13,5.0.2,5.0.3,5.0.4,5.0.5,5.0.6,5.0.7,5.0.8,5.0.9,5.1.0,5.1.1,5.2.0,5.3.0,5.3.1,5.4.0,5.4.1,5.4.2,5.13.0,5.12.0,5.11.2,5.11.1,5.10.0,5.9.0,5.8.2,5.8.1,5.7.2,5.7.1,5.7.0,5.6.3,5.5.0,5.4.2
    # for the full list of 5.13.0 free icon classes
    "icons": {
        "auth": "fas fa-users-cog",
        "authmanagement.MyUser": "fas fa-user",
        "auth.Group": "fas fa-users",
        "authmanagement.admin": "fas fa-users",
        "human_resource.customer": "fas fa-users",
        "tenants.tenant": "fas fa-users",
        "tenants.tenant_kin": "fas fa-users",
        "tenants.tenant_business_details": "fas fa-building",
        "tenants.tenant_employment_details": "fas fa-briefcase",
        "landlords.agent": "fas fa-users",
        "landlords.propertyowner": "fas fa-users",
        "leases.lease": "fas fa-book",
        "payments.payment": "fas fa-dollar-sign",
        "property.property": "fas fa-tools",
    },
    # Icons that are used when one is not manually specified
    "default_icon_parents": "fas fa-chevron-circle-right",
    "default_icon_children": "fas fa-check-circle",

    #################
    # Related Modal #
    #################
    # Use modals instead of popups
    "related_modal_active": True,

    #############
    # UI Tweaks #
    #############
    # Relative paths to custom CSS/JS scripts (must be present in static files)
    "custom_css": None,
    "custom_js": None,
    # Whether to show the UI customizer on the sidebar
    "show_ui_builder": True,

    ###############
    # Change view #
    ###############
    # Render out the change view as a single form, or in tabs, current options are
    # - single
    # - horizontal_tabs (default)
    # - vertical_tabs
    # - collapsible
    # - carousel
    "changeform_format": "horizontal_tabs",
    # override change forms on a per modeladmin basis
    "changeform_format_overrides": {"authmanagement.MyUser": "collapsible", "auth.group": "vertical_tabs"},
    # Add a language dropdown into the admin
    #"language_chooser": True,
}
