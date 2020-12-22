<template>
    <div>
        <v-dialog
        v-model="isConnectorFormVisible"
        @keydown.esc="hideDialog()"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
        >
            <v-card
            tile>
                <v-toolbar
                flat
                dark
                permanent
                dense
                color="primary"
                >
                    <v-btn
                    icon
                    dark
                    @click="hideDialog()"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{ update ? 'Update' : 'Create' }} connector</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn
                        v-if="update"
                        color="danger"
                        dark
                        text
                        @click="deleteDialog = true"
                        ><v-icon class="mr-1">mdi-trash-can-outline</v-icon>Delete</v-btn>
                        <v-btn
                        dark
                        text
                        @click="submit()"
                        ><v-icon class="mr-1">mdi-cloud-upload-outline</v-icon>Deploy</v-btn>
                    </v-toolbar-items>
                </v-toolbar>

                <v-alert
                    v-model="isError.show"
                    border="left"
                    close-text="Close Alert"
                    outlined
                    type="warning"
                    dark
                    dismissible
                    >
                    {{ isError.message}}
                </v-alert>

                <v-card-text>
                    <v-card 
                        class="mt-4 mb-4"
                        width="100%"
                        full
                    >
                        <v-card-title>Connector information</v-card-title>
                        <v-card-text>
                            <form>
                                <v-container>
                                    <v-row>
                                        <v-text-field
                                        v-model="name"
                                        label="Name"
                                        required
                                        @change="updateConfigName"
                                        ></v-text-field>
                                    </v-row>
                                    <v-row>
                                        <v-select
                                        v-model="selected_item"
                                        :items="options"
                                        label="Class"
                                        required
                                        @change="changeConnectorTemplate({name: 'connector.class', value: options[selected_item].text})"
                                        ></v-select>
                                    </v-row>
                                </v-container>
                            </form>
                        </v-card-text>
                    </v-card>

                    <v-card>
                        <v-card-title>Connector configuration / <span style="font-size: 20px !important;padding-left: 5px;padding-top: 1px;font-style: italic;">{{ options[selected_item].text }}</span></v-card-title>
                        <v-jsoneditor 
                        v-model="availableConnector.config" 
                        :plus="false"
                        height="600px" 
                        >
                        </v-jsoneditor>
                    </v-card>

                    <!-- <v-card v-if="selected_item">
                        <v-card-title>
                            Connector configuration / <span style="font-size: 20px !important;padding-left: 5px;padding-top: 1px;font-style: italic;">{{ options[selected_item].text }}</span>
                        </v-card-title>
                        <v-card-text>
                            <app-form-oracleconfig :update="update"
                            v-if="selected_item==1" 
                            @update-configuration="buildConfiguration"
                            />
                            <app-form-mysqlconfig  :update="update"
                            v-if="selected_item==2" 
                            @update-configuration="buildConfiguration"
                            />
                        </v-card-text>
                    </v-card> -->
                </v-card-text> 
                <div style="flex: 1 1 auto;"></div>
            </v-card>
        </v-dialog>
        <app-progress-bar :show="progressBar" :data="progressBarData" />

        <!-- Delete modal !-->
        <v-dialog
        v-model="deleteDialog"
        persistent
        max-width="400"
        >
        <v-card>
            <v-card-title class="headline">
            Delete connection ?
            </v-card-title>
            <v-card-text>Connection name : <span style="font-size: 30px; bold">{{ availableConnector.name }}</span></v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="green darken-1"
                text
                @click="deleteDialog = false"
            >
                Cancel
            </v-btn>
            <v-btn
                color="warning"
                text
                @click="destroy()"
            >
                Yes
            </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

// import OracleConfigurationForm from '@/components/form/OracleConfigurationForm.vue';
// import MySQLConfigurationForm from '@/components/form/MySQLConfigurationForm.vue';
import CustomProgressbar from '@/components/dialog/ProgressBar.vue';


export default {
    name: 'ConnectorForm',
    props: {
        update: Boolean
    },
    components: {
        // 'app-form-oracleconfig': OracleConfigurationForm,
        // 'app-form-mysqlconfig': MySQLConfigurationForm,
        'app-progress-bar': CustomProgressbar,
    },
    updated() {
        if (this.update) {
            this.name = this.availableConnector.name
            this.options.forEach(element => {
                if (element.text == this.availableConnector.config['connection.class']) {
                    this.selected_item = element.value
                    return
                }
            });
        }
        this.buildConfiguration({name: 'connector.class', value: this.options[this.selected_item].text})
    },
    data: () => ({
        progressBar: false,
        progressBarData: {color: "primary", message: "Please wait"},
        deleteDialog: false,
        name: null,
        selected_item: 0,
        options: [
            {
                text: 'io.debezium.connector.oracle.OracleConnector',
                value: 0,
            },
            {
                text: 'io.debezium.connector.mysql.MySqlConnector',
                value: 1,
            },
        ],
    }),
    computed: {
        ...mapGetters('ui', ['isConnectorFormVisible', 'isError']),
        ...mapGetters(['availableConnector']),
    },
    methods: {
        ...mapActions('ui', ['setConnectorFormInvisible', 'resetError']),
        ...mapActions(['setConfig', 'setConfigName', 'changeConnector']),
        buildConfiguration(config) {
            this.setConfig(config)
        },
        changeConnectorTemplate(payload) {
            this.changeConnector(payload)
            console.log(payload)
        },
        hideDialog() {
            this.setConnectorFormInvisible()
            this.resetError()
            this.$api.getConnectors()
            this.name = ""
            this.selected_item = 0
        },
        updateConfigName() {
            this.setConfigName(this.name)
        },
        submit() {
            this.progressBar = true
            if (this.update) {
                this.$api.updateConnector()
                    .then( () => {
                        this.hideDialog()
                    })
            } else {
                this.$api.createConnector()
                    .then( () => {
                        this.hideDialog()
                    })
            }
            this.progressBar = false
        },
        destroy() {
            this.progressBar = true
            this.$api.deleteConnector()
                .then( () => {
                    this.hideDialog()
                })            
            this.deleteDialog = false
            this.progressBar = false
        }
    },
}
</script>

<style>

</style>