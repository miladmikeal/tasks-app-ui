<template>
  <v-container class="mt-5">
    <v-layout row justify-center>
      <v-flex xs12 md6>
        <component
          :is="selectedComponent"
          @switchToLogin="selectedComponent = $event"
          @switchToSignup="selectedComponent = $event"
          class="mt-5"
        ></component>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import "../plugins/axios";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
export default {
  data() {
    return {
      selectedComponent: "LoginForm"
    };
  },
  components: {
    LoginForm,
    SignupForm
  }
};
</script>

<style>
</style>
