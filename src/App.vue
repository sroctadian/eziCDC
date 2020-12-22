<template>
  <v-app>
    <v-app-bar       
      permanent
      dark
      color="#363636"
      app>
        <v-icon class="mr-2" @click.stop="mini = !mini">mdi-dots-horizontal</v-icon>
        <v-toolbar-title>{{ $route.name }}</v-toolbar-title>
      </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      dark
      app
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="./assets/eziCDC.png"></v-img>
        </v-list-item-avatar>
        <v-list-item-title><p><span>eziCDC<br/></span><span style="font-size: 8px;position: fixed;top: 30px;">connector creation now is ezi</span></p></v-list-item-title>
        <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.link"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container class="scroll-y" fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data: () => ({
    drawer: 'drawer',
    mini: false,
    items: [
      {
        icon: 'mdi-home',
        title: 'Home',
        link: '/' 
      },
      {
        icon: 'mdi-lan-connect',
        title: 'Connectors',
        link: '/connectors'
      },
      {
        icon: 'mdi-progress-question',
        title: 'About',
        link: '/about' 
      },
    ],
  }),
};
</script>
