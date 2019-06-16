<template>
  <v-container class="my-5">
    <v-card flat v-for="task in tasks" :key="task.id">
      <v-layout row wrap class="pa-3">
        <v-flex xs12 md11>
          <div class="caption grey--text">Task:</div>
          <div>{{task.description}}</div>
        </v-flex>
        <v-flex xs12 md1>
          <div class="caption grey--text">Mark Complete</div>
          <v-btn fab dark small color="primary">
            <v-icon dark>check_circle</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: ["tasks"]
};
</script>

<style>
</style>
