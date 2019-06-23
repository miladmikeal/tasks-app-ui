<template>
  <nav>
    <v-toolbar app>
      <v-toolbar-side-icon @click="drawer = !drawer" class="grey--text"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Task</span>
        <span>Manager</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title v-if="getToken" class="text-uppercase grey--text">
        <!-- <span class="font-weight-light">Welcome</span> -->
        <span>Welcome, {{getUser.name}}</span>
      </v-toolbar-title>
      <v-btn v-if="getToken" @click="logout()" flat color="grey">
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" app class="primary">
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img src="/avatar.png">
          </v-avatar>
          <p class="white--text text-md-center subheading mt-1">{{getUser.name}}</p>
        </v-flex>
      </v-layout>
      <v-list>
        <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-tile-action>
            <v-icon class="white--text">{{link.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{link.text}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      drawer: false,
      links: [
        { icon: "person", text: "Profile", route: "/profile" },
        { icon: "dashboard", text: "Dashboard", route: "/dashboard" }
      ]
    };
  },
  computed: {
    ...mapGetters(["getToken", "getUser"])
  },
  methods: {
    ...mapActions(["signOut"]),
    async logout() {
      await this.signOut();
      await this.$router.push("/");
    }
  }
};
</script>

<style>
</style>
