<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs12 md6>
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>Profile</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="pt-3">
              <edit-profile-form class="justify-right" :user="this.getUser"></edit-profile-form>
            </v-toolbar-items>
          </v-toolbar>
          <v-img :src="this.getAvatar" aspect-ratio="2.75"></v-img>
          <v-card-title primary-title class="justify-center">
            <div>
              <h1 class="grey--text">Name: {{this.getUser.name}}</h1>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-3">
            <div class="text-md-center">
              <p class="grey--text">Email: {{this.getUser.email}}</p>
            </div>
            <div class="text-md-center">
              <p class="grey--text">Age: {{this.getUser.age}}</p>
            </div>
          </v-card-text>
          <v-card-actions class="justify-center"></v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import EditProfileForm from "./EditProfileForm";
export default {
  computed: {
    ...mapGetters(["getUser", "getAvatar"])
  },
  components: {
    EditProfileForm
  }
};
</script>

<style>
</style>
