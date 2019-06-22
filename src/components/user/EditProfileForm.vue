<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-tooltip bottom>
          <v-icon small class="mt-2" v-on="on" slot="activator">edit</v-icon>
          <span>Edit Profile</span>
        </v-tooltip>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Edit Profile</span>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field label="Name" :rules="nameRules" v-model="name"></v-text-field>
            <v-text-field label="Email" :rules="emailRules" v-model="email"></v-text-field>
            <v-text-field label="Age" type="number" v-model="age"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="saveUser">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    dialog: false,
    name: "",
    email: "",
    age: 0,
    nameRules: [v => !!v || "Name is required"],
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ]
  }),
  props: ["user"],
  created() {
    this.name = this.$props.user.name;
    this.email = this.$props.user.email;
    this.age = this.$props.user.age;
  },
  methods: {
    ...mapActions(["updateUser"]),
    async saveUser() {
      let user = {
        name: this.name,
        email: this.email,
        age: this.age
      };
      await this.updateUser(user);
      this.dialog = false;
    }
  }
};
</script>

<style>
</style>
