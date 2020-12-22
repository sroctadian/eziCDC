import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const ui = {
  namespaced: true,
  state: { 
    dialog: {
      connectorForm: false,
    },
    error: {
      show: false,
      message: ""
    }
  },
  mutations: {
    storeConnectorFormVisible: (state) => {
      state.dialog.connectorForm = true
    },
    storeConnectorFormInvisible: (state) => {
      state.dialog.connectorForm = false
    },
    storeError: (state, payload) => {
      state.error = payload
    },
  },
  actions: {
    setConnectorFormVisible: ({ commit }) => { 
      commit('storeConnectorFormVisible')
    },
    setConnectorFormInvisible: ({ commit }) => { 
      commit('storeConnectorFormInvisible')
    },
    setError: ({ commit }, payload) => { 
      commit('storeError', payload)
    },
    resetError: ({ commit }) => {
      commit('storeError', {
        show: false,
        message: ""
      })
    },
  },
  getters: {
    isConnectorFormVisible: state => {
      return state.dialog.connectorForm;
    },
    isError: state => {
      return state.error;
    },
  }
}


export default new Vuex.Store({
  state: {
    connection: {
      ipAddress: '0.0.0.0',
      port: 8083,
      readonly: false
    },
    apiPath: {
      getConnectors: '/connectors',
      getConnectorPlugins: '/connector-plugins'
    },
    connectorTemplates: {
      default: "io.debezium.connector.oracle.OracleConnector",
      "io.debezium.connector.oracle.OracleConnector": {
        name: "",
        config: {
          "connector.class": "",
          "tasks.max": 1,
          "database.server.name": "local",
          "database.hostname": "localhost",
          "database.port": 1521,
          "database.user": "",
          "database.password": "",
          "database.dbname": "",
          "database.pdb.name": "",
          "database.out.server.name": "",
          "database.history.kafka.bootstrap.servers": "localhost",
          "database.history.kafka.topic": 9092,
          "table.include.list": "",
          "table.exclude.list": "",
        }
      },
      "io.debezium.connector.mysql.MySqlConnector": {
        name: "",
        config: {
          "connector.class": "io.debezium.connector.mysql.MySqlConnector",
          "tasks.max": "1",
          "database.hostname": "mysql",
          "database.port": "3306",
          "database.user": "debezium",
          "database.password": "dbz",
          "database.server.id": "184054",
          "database.server.name": "dbserver1",
          "database.include.list": "inventory",
          "database.exclude.list": "",
          "table.include.list": "",
          "table.exclude.list": "",
          "database.history.kafka.bootstrap.servers": "kafka:9092",
          "database.history.kafka.topic": "schema-changes.inventory",
        }
      }
    },
    connector: {
      name: "",
      config: {
        "connector.class": "",
        "tasks.max": 1,
        "database.server.name": "local",
        "database.hostname": "localhost",
        "database.port": 1521,
        "database.user": "",
        "database.password": "",
        "database.dbname": "",
        "database.pdb.name": "",
        "database.out.server.name": "",
        "database.history.kafka.bootstrap.servers": "localhost",
        "database.history.kafka.topic": 9092,
        "table.whitelist": "",
        "table.blacklist": "",
      }
    },
    connectors: [
    ],
    connectorPlugins: [
    ],
  },
  getters: {
    getConnection: state => {
      return state.connection
    },
    availableConnectors: state => {
      return state.connectors
    },
    availableConnector: state => {
      return state.connector
    },
    availablePlugins: state => {
      return state.connectorPlugins
    },
    buildUrlBase: state => {
      let connection = state.connection
      let baseUrl = "http://" + connection.ipAddress + ":" + connection.port
      return baseUrl
    },
  },
  mutations: {
    storeConnection: (state, payload) => {
      state.connection = payload;
    },
    storeConnectorPlugins: (state, payload) => {
      state.connectorPlugins = payload;
    },
    storeConnectors: (state, payload) => {
      state.connectors = payload;
    },
    storeConnector: (state, payload) => {
      state.connector = payload;
    },
    resetConnector: (state) => { 
      state.connector = state.connectorTemplates[state.connectorTemplates.default]
    },
    storeConfigName: (state, payload) => {
      state.connector.name = payload;
    },
    storeConfig: (state, payload) => {
      state.connector.config[payload.name] = payload.value;
    },
    changeConnector: (state, payload) => {
      state.connector = state.connectorTemplates[payload.value]
    },
  },
  actions: {
    setConnection: ({ commit }, payload) => {
      commit('storeConnection', payload);
    },
    resetConnection: ({ commit }, payload) => {
      commit('storeConnection', payload)
    },
    setConfig: ({ commit }, payload) => {
      commit('storeConfig', payload);
    },
    setConfigName: ({ commit }, payload) => {
      commit('storeConfigName', payload);
    },
    resetConnector: ({ commit }) => {
      commit('resetConnector')
    },
    setConnectorPlugins: ({ commit }, payload) => {
      commit('storeConnectorPlugins', payload)
    },
    changeConnector: ({ commit }, payload) => {
      commit('changeConnector', payload)
    },
  },
  modules: {
    ui: ui
  }
})
