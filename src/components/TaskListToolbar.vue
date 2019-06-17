<template>
  <v-container class="mb-0 pb-0">
    <v-toolbar dark color="primary">
      <v-toolbar-title>Incomplete Tasks</v-toolbar-title>
      <v-spacer></v-spacer>
      <add-task-form></add-task-form>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>View Completed</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-container>
</template>

<script>
import AddTaskForm from "../components/AddTaskForm";
export default {
  components: {
    AddTaskForm
  }
};
</script>

<style>
</style>
