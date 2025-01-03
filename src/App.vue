<template>
  <v-card>
    <v-layout>
      <v-app-bar>
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Design System</v-toolbar-title>

        <!-- <v-spacer></v-spacer>
        <template v-if="$vuetify.display.mdAndUp">
          <v-btn icon="mdi-magnify" variant="text"></v-btn>
          <v-btn icon="mdi-filter" variant="text"></v-btn>
        </template>
        <v-btn icon="mdi-dots-vertical" variant="text"></v-btn> -->
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'bottom' : undefined">

        <v-list>
          <v-list-item :to="navigationList.home.route" link :prepend-icon="navigationList.home.icon">
            <v-list-item-title>{{ navigationList.home.title }}</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-group v-for="(item, index) in navigationList.page" :key="index" :prepend-icon="item.icon" :value="item.title">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" :title="item.title"></v-list-item>
            </template>

            <v-list-item v-for="(child, childIndex) in item.children" :key="childIndex" :to="child.route" link>
              <v-list-item-title>{{ child.name }}</v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <router-view></router-view>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    navigationList: {
      home: {
        title: "Home",
        route: "/index",
        icon: "mdi-home",
        children: []
      },
      page: [
        {
          title: "Style",
          // route: "/bar",
          icon: "mdi-palette",
          children: [
            { name: "Colors", route: "/colors", },
            { name: "Fonts", route: "/fonts", }
          ]
        },
        {
          title: "Elements",
          // route: "/fizz",
          icon: "mdi-view-dashboard",
          children: [
            { name: "Button", route: "/button", },
            { name: "Input", route: "/input", },
            { name: "Select", route: "/select", },
            { name: "Checkbox", route: "/checkbox", },
          ]
        },
      ]
    },
  }),
};
</script>
