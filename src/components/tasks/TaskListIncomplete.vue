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
          <edit-task-form :task="task"></edit-task-form>
        </v-flex>
        <v-flex xs12 md1 class="text-sm-center">
          <div class="caption grey--text">Delete</div>
          <v-icon small class="mt-2" @click="deleteItem(task._id)">delete</v-icon>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs12 md2>
          <div class="caption grey--text text-sm-center">Created</div>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <div class="text-sm-center">
                <v-chip
                  v-on="on"
                  slot="activator"
                  :class="`${dueDate(task)} white--text`"
                >{{ formattedDate(task.createdAt) }}</v-chip>
              </div>
            </template>
            <span v-if="dueDate(task) === 'over'">More Than Week Old</span>
            <span v-else-if="dueDate(task) === 'week'">Less Than Week Old</span>
            <span v-else>Less Than Day Old</span>
          </v-tooltip>
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
import EditTaskForm from "./EditTaskForm";
export default {
  data() {
    return {
      moment
    };
  },
  components: {
    EditTaskForm
  },
  computed: {
    ...mapGetters(["getIncompleteTasks"])
  },
  methods: {
    ...mapActions(["fetchIncompleteTasks", "deleteTask"]),
    formattedDate(date) {
      if ((date = moment(date).format("MM-DD-YYYY"))) {
        return date;
      } else {
        date = date
          .split("")
          .splice(0, 10)
          .join("");
        return moment(date).format("MM-DD-YYYY");
      }
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
.v-card.day {
  border-left: 4px solid lightgreen;
}

.v-card.week {
  border-left: 4px solid orange;
}

.v-card.over {
  border-left: 4px solid tomato;
}

.v-chip.day {
  background: lightgreen;
}

.v-chip.week {
  background: orange;
}

.v-chip.over {
  background: tomato;
}
</style>
