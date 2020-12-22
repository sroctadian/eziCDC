<template>
    <form>
        <v-container>
            <v-subheader style="padding-left: 1px">Database setting</v-subheader>
            <v-divider></v-divider>
            <v-row>
                <v-col>
                    <v-text-field
                    v-model="dbserver_name"
                    :counter="50"
                    label="Server name"
                    required
                    v-on:change="$emit('update-configuration', {name: 'database.out.server.name', value: $event})"
                    ></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field
                    v-model="dbserver_dbname"
                    :counter="15"
                    label="Database name"
                    required
                    v-on:change="$emit('update-configuration', {name: 'database.dbname', value: $event})"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field
                    v-model="dbserver_hostname"
                    :counter="50"
                    label="Hostname"
                    required
                    v-on:change="$emit('update-configuration', {name: 'database.hostname', value: $event})"
                    ></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field
                    v-model="dbserver_port"
                    :counter="5"
                    type="number"
                    label="Port"
                    required
                    v-on:change="$emit('update-configuration', {name: 'database.port', value: $event})"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field
                    v-model="dbserver_username"
                    :counter="25"
                    label="Username"
                    required
                    v-on:change="$emit('update-configuration', {name: 'database.user', value: $event})"
                    ></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field
                    v-model="dbserver_password"
                    :counter="30"
                    type="password"
                    label="Password"
                    required
                    v-on:change="$emit('update-configuration', {name: 'database.password', value: $event})"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field
                    v-model="dbserver_whitelist"
                    :counter="500"
                    label="Whitelist"
                    required
                    v-on:change="$emit('update-configuration', {name: 'table.whitelist', value: $event})"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field
                    v-model="dbserver_blacklist"
                    :counter="500"
                    label="Blacklist"
                    required
                    v-on:change="$emit('update-configuration', {name: 'table.blacklist', value: $event})"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-subheader style="padding-left: 1px">Kafka setting</v-subheader>
            <v-divider></v-divider>
            <v-row>
                <v-col>
                    <v-text-field
                    v-model="kafka_server"
                    :counter="50"
                    label="Boostrap server"
                    required
                    v-on:change="$emit('update-configuration', {name: 'database.history.kafka.bootstrap.servers', value: $event})"
                    ></v-text-field>
                </v-col>
                <v-col>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field
                    v-model="kafka_topic"
                    :counter="50"
                    label="Topic history"
                    required
                    v-on:change="$emit('update-configuration', {name: 'database.history.kafka.topic', value: $event})"
                    ></v-text-field>
                </v-col>
                <v-col>
                </v-col>
            </v-row>
            <v-subheader style="padding-left: 1px">Additional setting</v-subheader>
            <v-divider></v-divider>
            <v-row>
                <v-col>
                    <v-text-field
                    v-model="max_tasks"
                    :counter="2"
                    type="number"
                    label="Maximum tasks"
                    value="1"
                    required
                    v-on:change="$emit('update-configuration', {name: 'tasks.max', value: $event})"
                    ></v-text-field>
                </v-col>
                <v-col>
                </v-col>
            </v-row>
        </v-container>
    </form>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'OracleConfigurationForm',
    props: {
        update: Boolean
    },
    mounted() {
        if (this.update) {
            this.dbserver_name = this.availableConnector.config["database.server.name"]
            this.dbserver_blacklist = this.availableConnector.config["table.blacklist"]
            this.dbserver_dbname = this.availableConnector.config["database.dbname"]
            this.dbserver_hostname = this.availableConnector.config["database.hostname"]
            this.dbserver_password = this.availableConnector.config["database.password"]
            this.dbserver_port = this.availableConnector.config["database.port"]
            this.dbserver_username = this.availableConnector.config["database.user"]
            this.dbserver_whitelist = this.availableConnector.config["table.whitelist"]
            this.kafka_server = this.availableConnector.config["database.history.kafka.bootstrap.servers"]
            this.kafka_topic = this.availableConnector.config["database.history.kafka.topic"]
            this.max_tasks = this.availableConnector.config["tasks.max"]
        }    
    },
    data: () => ({
        dbserver_name: "",
        dbserver_dbname: "",
        dbserver_hostname: "",
        dbserver_port: 1521,
        dbserver_username: "",
        dbserver_password: "",
        kafka_server: "",
        kafka_port: 9092,
        kafka_topic: "",
        max_tasks: 1,
        dbserver_whitelist: "",
        dbserver_blacklist: "",
    }),
    computed: {
        ...mapGetters(['availableConnector'])
    },
    methods: {
    },
}
</script>

<style>

</style>