
export const state = {
    addresses: [],
    delivery_addresses: [],
    defaultaddress: null,
    delivery_address: null,
};

export const mutations = {
    addAddresses(state, addresses) {
        state.addresses = addresses;
    },
    addDefaultAddresses(state, address) {
        state.defaultaddress = address;
    },
    addDeliveryAddresses(state, delivery_addresses) {
        state.delivery_addresses = delivery_addresses;
    },
    addDeliveryAddress(state, address) {
        state.delivery_address = address;
    },

};

export const actions = {
    addAddresses({ commit }, addresses) {
        commit('addAddresses', addresses);
    },
    addDefaultAddresses({ commit }, address) {
        commit('addDefaultAddresses', address);
    },
    addDeliveryAddresses({ commit }, delivery_addresses) {
        commit('addDeliveryAddresses', delivery_addresses);
    },
    addDeliveryAddress({ commit }, address) {
        commit('addDeliveryAddress', address);
    },
};