<template>
  <v-container class="mt-5">
    <v-layout row justify-center>
      <v-flex xs12 md6>
        <v-toolbar dark color="primary">
          <v-icon>exit_to_app</v-icon>
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <v-card class="pa-5">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
            <v-text-field
              :type="'password'"
              v-model="password"
              :rules="passwordRules"
              label="Password"
              required
            ></v-text-field>

            <v-layout row>
              <v-btn :disabled="!valid" color="success" @click="validate">Login</v-btn>
              <v-spacer></v-spacer>
              <span>
                <a href="/signup">Need an account?</a>
              </span>
            </v-layout>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import "../plugins/axios";
import { mapActions } from "vuex";
export default {
  data: () => ({
    valid: true,
    email: "",
    password: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    passwordRules: [v => !!v || "Password is required"],
    select: null
  }),
  methods: {
    ...mapActions(["setToken", "setUser"]),
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        let email = this.email;
        let password = this.password;
        axios
          .post("users/login", {
            email,
            password
          })
          .then(response => {
            this.setUser(response.data.user);
            this.setToken(response.data.token);
            this.$router.push("/dashboard");
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

<style>
</style>
