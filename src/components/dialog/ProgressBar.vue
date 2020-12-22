<template>
  <div class="text-center">
    <v-dialog
      v-model="show"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        :color="data.color"
        dark
      >
        <v-card-text>
          {{ data.message }}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: "CustomProgressBar",
    props: {
        show: Boolean,
        data: Object
    },
    data () {
      return {
      }
    },
  }
</script>