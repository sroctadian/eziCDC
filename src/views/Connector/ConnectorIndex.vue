<template>
    <v-layout>
        <v-container>
            <v-row class="mb-4">
                <app-connection />
            </v-row>
            <v-row  class="mb-4">
                <app-connector-listview />
            </v-row>
            <v-row  class="mb-4">
                <app-connector-plugin-listview />
            </v-row>
        </v-container>
    </v-layout>
</template>

<script>
// import { mapGetters } from 'vuex';

import ConnectionView from '@/components/Connection.vue';
import ConnectorListView from '@/components/ListConnector.vue';
import ConnectorPluginListView from '@/components/ListConnectorPlugins.vue';

export default {
    components: {
        'app-connection': ConnectionView,
        'app-connector-listview': ConnectorListView,
        'app-connector-plugin-listview': ConnectorPluginListView,
    },
    data: () => ({
        // ipAddress: '0.0.0.0',
        // port: 8083,
        // readonly: false
    }),
    computed: {
        // ...mapGetters(['getConnection']),
    },
    methods: {
        // ...mapActions(['storeConnection', 'resetConnection']),
        // btnConnectClick() {
        // },
    }
}
</script>

<style scoped>
</style>