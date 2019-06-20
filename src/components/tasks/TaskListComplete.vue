<template>
  <v-container class="mt-0 pt-0">
    <v-card flat v-for="task in getCompleteTasks" :key="task.id">
      <v-layout row wrap class="pa-3">
        <v-flex xs12 md6>
          <div class="caption grey--text">Task:</div>
          <div>{{task.description}}</div>
        </v-flex>
        <v-flex xs12 md2>
          <div class="caption grey--text text-sm-center">Created</div>
          <div class="text-sm-center">
            <v-chip>{{ formattedDate(task.createdAt) }}</v-chip>
          </div>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs12 md2>
          <div class="caption grey--text text-sm-center">Completed</div>
          <div class="text-sm-center">
            <v-chip>{{ formattedDate(task.updatedAt) }}</v-chip>
          </div>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs12 md2>
          <div class="text-sm-center">
            <div class="caption grey--text">Mark Incomplete</div>
            <v-btn @click="markIncomplete(task._id)" fab dark small color="error">
              <v-icon dark>undo</v-icon>
            </v-btn>
          </div>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
export default {
  data() {
    return {
      moment
    };
  },
  bforeCreate() {
    let tasks = this.getCompleteTasks;
    tasks.forEach(task => {
      let date = new Date(task.updatedAt);
      if (Date.now() - date >= 604800000) {
        this.deleteTask(task._id);
      }
    });
  },
  computed: {
    ...mapGetters(["getCompleteTasks"])
  },
  methods: {
    ...mapActions(["fetchCompleteTasks", "deleteTask"]),
    formattedDate(date) {
      date = date
        .split("")
        .splice(0, 10)
        .join("");
      return moment(date).format("MM-DD-YYYY");
    },
    async markIncomplete(id) {
      await axios.patch(`tasks/${id}`, { completed: false });
      await this.fetchCompleteTasks();
    }
  }
};
</script>

<style>
</style>
