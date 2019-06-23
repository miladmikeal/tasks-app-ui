<template>
  <v-container class="mb-0 pb-0">
    <v-toolbar dark color="primary">
      <v-toolbar-title v-if="taskList === true">Incomplete Tasks</v-toolbar-title>
      <v-toolbar-title v-else>Complete Tasks</v-toolbar-title>
      <v-spacer></v-spacer>
      <add-task-form></add-task-form>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-if="taskList === true" @click="getCompleted" flat>
          <span>View Completed</span>
          <v-icon right>exit_to_app</v-icon>
        </v-btn>
        <v-btn v-else @click="getIncomplete" flat>
          <span>View Incomplete</span>
          <v-icon right>exit_to_app</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-container>
</template> 

<script>
import AddTaskForm from "./AddTaskForm";
export default {
  data() {
    return {
      taskList: true
    };
  },
  components: {
    AddTaskForm
  },
  methods: {
    getIncomplete() {
      this.$emit("switchTaskList", "TaskListIncomplete");
      this.taskList = true;
    },
    getCompleted() {
      this.$emit("switchTaskList", "TaskListComplete");
      this.taskList = false;
    }
  }
};
</script>

<style>
</style>
