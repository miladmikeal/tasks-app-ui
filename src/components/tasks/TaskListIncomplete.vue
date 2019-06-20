<template>
  <v-container class="mt-0 pt-0">
    <v-card flat v-for="task in getIncompleteTasks" :key="task.id" :class="`${dueDate(task)}`">
      <v-layout row wrap class="pa-3">
        <v-flex xs12 md6>
          <div class="caption grey--text">Task:</div>
          <div>{{task.description}}</div>
        </v-flex>
        <v-flex xs12 md1 class="text-sm-center">
          <div class="caption grey--text">Edit</div>
          <v-icon small class="mt-2" @click="editItem(props.item)">edit</v-icon>
        </v-flex>
        <v-flex xs12 md1 class="text-sm-center">
          <div class="caption grey--text">Delete</div>
          <v-icon small class="mt-2" @click="deleteItem(task._id)">delete</v-icon>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs12 md2>
          <div class="caption grey--text text-sm-center">Created</div>
          <div class="text-sm-center">
            <v-chip :class="`${dueDate(task)}`">{{ formattedDate(task.createdAt) }}</v-chip>
          </div>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs12 md2>
          <div class="text-sm-center">
            <div class="caption grey--text">Mark Complete</div>
            <v-btn @click="markComplete(task._id)" fab dark small color="success">
              <v-icon dark>done</v-icon>
            </v-btn>
          </div>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
    </v-card>
  </v-container>
</template>

<script>
import moment from "moment";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      moment
    };
  },
  computed: {
    ...mapGetters(["getIncompleteTasks"])
  },
  methods: {
    ...mapActions(["fetchIncompleteTasks", "deleteTask"]),
    formattedDate(date) {
      date = date
        .split("")
        .splice(0, 10)
        .join("");
      return moment(date).format("MM-DD-YYYY");
    },
    dueDate(task) {
      let date = new Date(task.createdAt);
      let diff = Date.now() - date;
      if (diff <= 86400000) {
        return "day";
      } else if (diff <= 604800000) {
        return "week";
      } else {
        return "over";
      }
    },
    async markComplete(id) {
      await axios.patch(`tasks/${id}`, { completed: true });
      await this.fetchIncompleteTasks();
    },
    async deleteItem(taskId) {
      await this.deleteTask(taskId);
      await this.fetchIncompleteTasks();
    }
  }
};
</script>

<style scoped>
.day {
  border-left: 4px solid lime;
}

.week {
  border-left: 4px solid yellow;
}

.over {
  border-left: 4px solid red;
}
</style>
