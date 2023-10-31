// store/modules/favorites.js
export const state = {
    items: [],
    favorites_items_count: 0,
};

export const mutations = {
    addItem(state, item) {
        const existingItem = state.items.filter(i => i.product.id === item.product.id);
        console.log(existingItem)
        if (existingItem.length==0) {
            state.items.push(item);
            state.favorites_items_count = state.items.length;
            localStorage.setItem("favorites_items_count", state.favorites_items_count);
        }
        console.log(state.items)
        console.log(state.items.length)
    },
    removeItemFromfavorites(state, { index }) {
        if (index !== -1) {
            state.items = state.items.splice(index, 1);
            state.items = state.items.filter(item => item.product.id !== item.product.id);
            state.favorites_items_count = state.items.length;
        }
    },
    clearFavorites() {
        state.items = [];
        state.favorites_items_count = 0;
    },
};

export const actions = {
    addProductTofavorites({ commit }, item) {
        commit('addItem', item);
    },
    removeFromfavorites({ commit }, { index, item }) {
        commit('removeItemFromfavorites', { index, item })
    },
    clearFavorites({ commit }) {
        commit("clearFavorites");
    },
};

// export default {
//     namespaced: true,
//     state,
//     mutations,
//     actions
// };
