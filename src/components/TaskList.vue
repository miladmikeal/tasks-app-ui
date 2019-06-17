<template>
  <v-container class="mt-0 pt-0">
    <v-card flat v-for="task in tasks" :key="task.id">
      <v-layout row wrap class="pa-3">
        <v-flex xs12 md8>
          <div class="caption grey--text">Task:</div>
          <div>{{task.description}}</div>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs12 md2>
          <div class="caption grey--text">Created</div>
          <div>{{ formattedDate(task.createdAt) }}</div>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs12 md2>
          <div class="caption grey--text">Mark Complete</div>
          <v-btn fab dark small color="success">
            <v-icon dark>done</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
    </v-card>
  </v-container>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      moment
    };
  },
  props: ["tasks"],
  methods: {
    formattedDate(date) {
      date = date
        .split("")
        .splice(0, 10)
        .join("");
      return moment(date).format("MM-DD-YYYY");
    }
  }
};
</script>

<style>
</style>
