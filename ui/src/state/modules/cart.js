// store/modules/cart.js
export const state = {
    items: [],
    subtotal: 0,
    shipping: 0,
    tax: 0,
    updated: 0,
    total: 0,
    cart_items_count: 0,
};

export const mutations = {
    addItem(state, item) {
        const existingItem = state.items.find(i => i.product.id === item.product.id && i.color === item.color && i.size === item.size);
        if (existingItem) {
            state.tax += ((item.item_subtotal * existingItem.quantity) * item.tax)
            existingItem.quantity += item.quantity;
            state.subtotal += existingItem.item_subtotal;
            state.total += (existingItem.item_subtotal * existingItem.quantity) + state.tax;
        } else {
            state.items.push(item);
            state.tax += item.item_total * item.tax;
            state.subtotal += item.item_subtotal;
            state.total += item.item_total + state.tax;
            state.cart_items_count = state.items.length;
        }
        localStorage.setItem("cart_items_count", state.cart_items_count);
    },
    updateCartItem(state, { item, quantity }) {
        item.quantity = quantity;
        state.subtotal = state.items.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);
        state.shipping = 0; // replace with your own shipping calculation
        state.tax = state.subtotal * item.tax; // replace with your own tax calculation
        state.total = state.subtotal + state.shipping + state.tax;
    },
    setShippingCharge(state, charge) {
        if (state.updated == 0) {
            state.shipping = charge;
            state.total += state.shipping;
        } else {
            if (state.updated > 0 && state.shipping !== charge) {
                state.total -= state.shipping;
                state.shipping = charge;
                state.total += state.shipping;
            }
        }
        state.updated += 1;
    },
    removeItemFromCart(state, { index, item }) {
        if (index !== -1) {
            state.items = state.items.splice(index, 1);
            state.items = state.items.filter(item => item.product.id !== item.product.id);
            state.cart_items_count = state.items.length;
            state.subtotal = state.items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
            state.shipping = 0; // calculate shipping based on your own logic
            state.tax = state.subtotal * item.tax; // calculate tax based on your own logic
            state.total = state.subtotal + state.shipping;
        }
    },
    clearCart() {
        state.items = [];
        state.subtotal = 0;
        state.shipping = 0;
        state.tax = 0;
        state.updated = 0;
        state.total = 0;
        state.cart_items_count = 0;
    },
};

export const actions = {
    addProductToCart({ commit }, item) {
        commit('addItem', item);
    },
    updateCart({ commit }, { item, quantity }) {
        commit('updateCartItem', { item, quantity });
    },
    removeFromCart({ commit }, { index, item }) {
        commit('removeItemFromCart', { index, item })
    },
    setShippingCharge({ commit }, charge) {
        commit('setShippingCharge', charge);
    },
    clearCart({ commit }) {
        commit("clearCart");
    },
};

// export default {
//     namespaced: true,
//     state,
//     mutations,
//     actions
// };
