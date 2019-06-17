<template>
  <v-container>
    <task-list-toolbar></task-list-toolbar>
    <task-list :tasks="getTasks"></task-list>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TaskList from "../components/TaskList";
import TaskListToolbar from "../components/TaskListToolbar";
export default {
  components: {
    TaskList,
    TaskListToolbar
  },
  computed: {
    ...mapGetters(["getTasks", "getLoggedStatus"])
  },
  methods: {
    ...mapActions(["fetchTasks"])
  },
  created() {
    this.fetchTasks();
  }
};
</script>
