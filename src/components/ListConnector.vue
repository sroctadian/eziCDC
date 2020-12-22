<template>
    <v-layout>
        <v-card width="100%">
            <v-card-title>Available connector
                <v-btn
                    absolute
                    right
                    color="success"
                    @click="showCreateDialog()"
                    v-if="getConnection.readonly"
                >Create connector</v-btn>
            </v-card-title>
            <v-card-text>
                <v-data-table
                    :headers="headers"
                    :items="availableConnectors"
                    item-key="name"
                    class="elevation-1"
                    @click:row="selectRecord"
                ></v-data-table>
            </v-card-text>
        </v-card>
        <app-dialog-connector-form :update="action.update"/>
    </v-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import ConnectorForm from '@/components/dialog/ConnectorForm.vue';

export default {
    name: 'ConnectorListView',
    components: {
        'app-dialog-connector-form': ConnectorForm,
    },
    data: () => ({
        desserts: [
            { name: 'Frozen Yogurt'},
            { name: 'Ice cream sandwich' },
        ],
        headers: [
            {
            text: 'Connector name',
            align: 'start',
            sortable: false,
            value: 'name',
            },
        ],
        dialog: false,
        action: {
            update: false
        },
    }),
    computed: {
        ...mapGetters(['availableConnectors', 'getConnection', 'availableConnector']),
    },
    methods: {
        ...mapActions('ui', ['setConnectorFormVisible']),
        selectRecord(row) {
            this.$api.getConnector(row.name)
            this.action.update = true
            this.setConnectorFormVisible()
        },
        showCreateDialog() {
            this.action.update = false
            this.setConnectorFormVisible()
        },
    }
}
</script>

<style>

</style>