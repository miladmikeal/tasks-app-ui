<template>
  <div>
    <v-toolbar dark color="primary">
      <v-icon>exit_to_app</v-icon>
      <v-toolbar-title>Sign Up</v-toolbar-title>
    </v-toolbar>
    <v-card class="pa-5">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="name" :rules="nameRules" label="Name" required></v-text-field>
        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
        <v-text-field
          :type="'password'"
          v-model="password"
          :rules="passwordRules"
          label="Password"
          required
        ></v-text-field>

        <v-layout row>
          <v-btn :disabled="!valid" color="success" @click="validate">Sign Up</v-btn>
          <v-spacer></v-spacer>
          <span @click="switchForm">
            <a>Already have an account?</a>
          </span>
        </v-layout>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      valid: true,
      name: "",
      email: "",
      password: "",
      nameRules: [v => !!v || "Name is required"],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [v => !!v || "Password is required"],
      select: null
    };
  },
  methods: {
    ...mapActions(["setToken", "setUser"]),
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        let name = this.name;
        let email = this.email;
        let password = this.password;
        axios
          .post("users", {
            name,
            email,
            password
          })
          .then(response => {
            console.log(response.data);
            this.setUser(response.data.user);
            this.setToken(response.data.token);
            this.$router.push("/dashboard");
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    switchForm() {
      this.$emit("switchToLogin", "LoginForm");
    }
  }
};
</script>

<style>
</style>
