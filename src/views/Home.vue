<template>
  <v-container>
    <v-row
      v-for="(item, index) in items"
      :key="index"
      class="mb-4"
    >
    <v-card width="100%">
      <v-card-title>{{ item.title }}</v-card-title>
      <v-card-text>
        <p v-html="item.content">
        </p>

        <v-card-actions v-if="item.extended">
          <v-btn color="orange lighten-2" text>Explore</v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="showXtra(index)">
            <v-icon>{{ item.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-expand-transition v-if="item.extended">
          <div v-show="item.show">
            <v-divider></v-divider>
            <v-card-text>
              <v-timeline align-top dense>
                <v-timeline-item
                  v-for="message in item.
                  extras"
                  :key="message.title"
                  small
                >
                  <div>
                    <div class="font-weight-normal">
                      <strong>{{ message.title }}</strong>
                    </div>
                    <div v-html="message.message"></div>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </div>
        </v-expand-transition>
        
      </v-card-text>
    </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    items: [
      {
        title: 'What is it ?'
        , content: 'Debezium is a set of distributed services to capture changes in your databases so that your applications can see those changes and respond to them. Debezium records all row-level changes within each database table in a change event stream, and applications simply read these streams to see the change events in the same order in which they occurred.'
        , show: false
      },
      {
        title: 'Debezium Connector for Oracle'
        , content: 'Debezium’s Oracle Connector can monitor and record all of the row-level changes in the databases on an Oracle server. Most notably, the connector does not yet support changes to the structure of captured tables (e.g. ALTER TABLE…​) after the initial snapshot has been completed (see DBZ-718). It is supported though to capture tables newly added while the connector is running (provided the new table’s name matches the connector’s filter configuration).'
        , show: false
        , extended: true
        , extras: [
          {
            title: 'Overview'
            , color: ''
            , message: 'Debezium ingests change events from Oracle using the XStream API or directly by LogMiner. In order to use the XStream API, you need to have a license for the GoldenGate product (though it is not required that GoldenGate itself is installed).'
          },
          {
            title: 'Enable archive log mode'
            , color: ''
            , message: 'oracle_sid=oraclcdb dbz_oracle sqlplus /nolog<br />connect sys/top_secret as sysdba<br />alter system set db_recovery_file_dest_size = 10g;<br />alter system set db_recovery_file_dest = "/opt/oracle/oradta/recovery_area" scope=spfile;<br />shutdown immediate;<br />startup mount;<br />alter database archivelog;<br />alter database open;<br />'
          },
          {
            title: 'Enable supplemental logging'
            , color: ''
            , message: 'alter table [database name].[table name] add supplemental log data (all) columns;'
          },
          {
            title: 'Creating Users for the connector'
            , color: ''
            , message: 'create role logminer_role;<br />grant create session to logminer_role;<br />grant  execute_catalog_role,select any transaction ,select any dictionary to logminer_role;<br />grant  logminer_role to [username];<br />alter user [username] quota unlimited on [tablespace name];<br />grant create any table to [username];'
          },
          {
            title: 'Creating kafka topic'
            , color: ''
            , message: 'kafka-topics.sh --create --zookeeper [zookeeper host]:[zookeeper port] --topic [topic name]'
          },
          {
            title: 'Yeah!!!! Ready to create your connector.'
            , color: ''
            , message: ''
          },
        ], 
      },
{
        title: 'Debezium Connector for MySQL'
        , content: 'MySQL has a binary log (binlog) that records all operations in the order in which they are committed to the database. This includes changes to table schemas and the data within tables. MySQL uses the binlog for replication and recovery.The Debezium MySQL connector reads the binlog and produces change events for row-level INSERT, UPDATE, and DELETE operations and records the change events in a Kafka topic. <br />Client applications read those Kafka topics. As MySQL is typically set up to purge binlogs after a specified period of time, the MySQL connector performs an initial consistent snapshot of each of your databases. The MySQL connector reads the binlog from the point at which the snapshot was made.'
        , show: false
        , extended: true
        , extras: [
          {
            title: 'Overview'
            , color: ''
            , message: 'MySQL includes in the binlog the row-level changes to the data and the DDL statements that are applied to the database. As the connector reads the binlog and comes across these DDL statements, it parses them and updates an in-memory representation of each table’s schema. The connector uses this schema representation to identify the structure of the tables at the time of each insert, update, or delete and to produce the appropriate change event. In a separate database history Kafka topic, the connector also records all DDL statements along with the position in the binlog where each DDL statement appeared.<br />When the connector restarts after having crashed or been stopped gracefully, the connector starts reading the binlog from a specific position, that is, from a specific point in time. The connector rebuilds the table structures that existed at this point in time by reading the database history Kafka topic and parsing all DDL statements up to the point in the binlog where the connector is starting.'
          },
          {
            title: 'Create uesr'
            , color: ''
            , message: "CREATE USER 'user'@'localhost' IDENTIFIED BY 'password';"
          },
          {
            title: 'Grant privileges to user'
            , color: ''
            , message: "GRANT SELECT, RELOAD, SHOW DATABASES, REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'user' IDENTIFIED BY 'password';"
          },
          {
            title: 'Enabling the MySQL binlog for Debezium'
            , color: ''
            , message: "server-id         = 223344 <br />log_bin           = mysql-bin binlog_format     = ROW <br />binlog_row_image  = FULL <br />expire_logs_days  = 10 "
          },
          {
            title: 'Enabling MySQL Global Transaction Identifiers for Debezium'
            , color: ''
            , message: "SET gtid_mode=ON;<br />enforce_gtid_consistency=ON;<br />"
          },
          {
            title: 'Enabling query log events for Debezium'
            , color: ''
            , message: "SET binlog_rows_query_log_events=ON"
          },
          {
            title: 'Creating kafka topic'
            , color: ''
            , message: 'kafka-topics.sh --create --zookeeper [zookeeper host]:[zookeeper port] --topic [topic name]'
          },
          {
            title: 'Yeah!!!! Ready to create your connector.'
            , color: ''
            , message: ''
          },
        ], 
      },
    ],
  }),
  methods: {
    showXtra(index) {
      this.items[index].show = !this.items[index].show
    },
  }
}
</script>
