<template>
    <v-layout>
        <v-card width="100%">
            <v-card-title>Available plugins
            </v-card-title>
            <v-card-text>
                <v-data-table
                    :headers="headers"
                    :items="availablePlugins"
                    item-key="name"
                    class="elevation-1"
                    @click:row="selectRecord"
                ></v-data-table>
            </v-card-text>
        </v-card>
    </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'ConnectorPluginListView',
    components: {
    },
    data: () => ({
        items: [
            {
                "class": "com.ecer.kafka.connect.oracle.OracleSourceConnector",
                "type": "source",
                "version": "null"
            },
            {
                "class": "io.debezium.connector.oracle.OracleConnector",
                "type": "source",
                "version": "1.4.0-SNAPSHOT"
            },
        ],
        headers: [
            {
                text: 'Class name',
                align: 'start',
                sortable: true,
                value: 'class',
            },
            {
                text: 'Type',
                align: 'start',
                sortable: true,
                value: 'type',
            },
            {
                text: 'Version',
                align: 'start',
                sortable: false,
                value: 'version',
            },
        ],
    }),
    computed: {
        ...mapGetters(['availablePlugins'])
    },
    methods: {
        selectRecord(row) {
            console.log(row)
        },
    }
}
</script>

<style>

</style>