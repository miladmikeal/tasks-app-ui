<template>
  <v-container>
    <task-list-toolbar @switchTaskList="changeTasks($event)"></task-list-toolbar>
    <transition name="fade-transition" mode="out-in">
      <component :is="selectedComponent"></component>
    </transition>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TaskListIncomplete from "../components/tasks/TaskListIncomplete";
import TaskListComplete from "../components/tasks/TaskListComplete";
import TaskListToolbar from "../components/tasks/TaskListToolbar";
export default {
  data() {
    return {
      selectedComponent: "TaskListIncomplete"
    };
  },
  components: {
    TaskListIncomplete,
    TaskListComplete,
    TaskListToolbar
  },
  computed: {
    ...mapGetters(["getIncompleteTasks", "getCompleteTasks"])
  },
  methods: {
    ...mapActions(["fetchIncompleteTasks", "fetchCompleteTasks"]),
    changeTasks(tasks) {
      if (tasks === "TaskListIncomplete") {
        this.fetchIncompleteTasks();
        this.selectedComponent = tasks;
      } else {
        this.fetchCompleteTasks();
        this.selectedComponent = tasks;
      }
    }
  },
  created() {
    this.fetchIncompleteTasks();
    this.fetchCompleteTasks();
  }
};
</script>
