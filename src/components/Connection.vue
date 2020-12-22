<template>
    <v-layout>
        <v-card width="100%">
            <v-card-title>Kafka connect REST API</v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="4">
                            <v-text-field
                            v-model="ipAddress"
                            label="Hostname"
                            outlined
                            dense
                            v-bind:readonly="readonly"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <v-text-field
                            v-model="port"
                            label="Port"
                            type="number"
                            outlined
                            dense
                            v-bind:readonly="readonly"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-btn
                            tile
                            color="success"
                            v-if="readonly == false"
                            @click="btnConnectClick()"
                            >
                                <v-icon left>mdi-content-save</v-icon>
                                Save
                            </v-btn>
                            <v-btn
                            tile
                            color="danger"
                            v-if="readonly"
                            @click="btnConnectClick()"
                            >
                                <v-icon left>mdi-lock-reset</v-icon>
                                Reset
                            </v-btn>
                            <v-btn
                            tile
                            color="primary"
                            v-if="readonly"
                            class="ml-2"
                            @click="refreshData"
                            >
                                <v-icon left>mdi-database-refresh</v-icon>
                                Refresh
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
    </v-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'ConnectionView',
    created: function () {
        this.ipAddress = this.getConnection.ipAddress
        this.port = this.getConnection.port
        this.readonly = this.getConnection.readonly
    },
    data: () => ({
        ipAddress: '0.0.0.0',
        port: 8083,
        readonly: false
    }),
    computed: {
        ...mapGetters([
            'getConnection'
        ]),
    },
    methods: {
        ...mapActions(['setConnection', 'resetConnection', 'getConnectorPlugins']),
        btnConnectClick() {
            if (this.readonly) {
                this.readonly = false
            } else {
                this.readonly = true    
            }
            this.setConnection({ipAddress: this.ipAddress, port: this.port, readonly: this.readonly})
            this.refreshData()
        },
        refreshData() {
            this.$api.getConnectors()
            this.$api.getConnectorPlugins()
        },
    }
}
</script>

<style scoped>
</style>