<template>
    <v-layout>
      <v-card width="100%">
        <v-card-title>eziCDC<span class="ml-2" style="font-size: 10px;position: relative;top: 4px;">Version 0.1.0</span></v-card-title>
        <v-card-text>
          <div v-html="content"></div>
        </v-card-text>
      </v-card>
    </v-layout>
</template>

<script>
export default {
  data() {
    return {
      content: "<p>Just a simple tool for creating debezium connector through kafka-connect REST API. <br/>Note :<ul><li>kafka-connect REST API working  with distributed mode</li><li>make sure you have debezium installed or configured.</li></ul></p><br />Powered by Vuetify + Electron"
    }
  }
}
</script>

<style>

</style>