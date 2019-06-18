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
import TaskListIncomplete from "../components/TaskListIncomplete";
import TaskListComplete from "../components/TaskListComplete";
import TaskListToolbar from "../components/TaskListToolbar";
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
      console.log("ChangeTasks hit");
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
