<template>
  <v-container class="mt-5">
    <v-layout row justify-center>
      <v-flex xs12 md6>
        <transition name="fade-transition" mode="out-in">
          <component
            :is="selectedComponent"
            @switchToLogin="selectedComponent = $event"
            @switchToSignup="selectedComponent = $event"
            class="mt-5"
          ></component>
        </transition>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import "../plugins/axios";
import LoginForm from "../components/user/LoginForm";
import SignupForm from "../components/user/SignupForm";
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
