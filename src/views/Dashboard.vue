<template>
  <v-container>
    <task-list :tasks="getTasks"></task-list>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TaskList from "../components/TaskList";
export default {
  components: {
    TaskList
  },
  computed: {
    ...mapGetters(["getTasks"])
  },
  methods: {
    ...mapActions(["fetchTasks"])
  },
  created() {
    this.fetchTasks();
  }
};
</script>
