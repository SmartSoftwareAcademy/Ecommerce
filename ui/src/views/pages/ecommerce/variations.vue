<template>
  <v-container justify="space-around">
    <v-col cols="auto">
      <v-dialog transition="dialog-bottom-transition" max-width="600">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="warning" v-bind="attrs" v-on="on">Variations</v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar color="warning" dark>Select a variation</v-toolbar>
            <v-card-text>
              <div class="text-h2 pa-12">Variations</div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="dialog.value = false">View Cart</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-container>
</template>
<script>
export default {
  props: {
    products: Array,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
