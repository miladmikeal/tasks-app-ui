<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-tooltip top>
          <v-btn small fab color="white" dark v-on="on" slot="activator">
            <v-icon color="primary">add</v-icon>
          </v-btn>
          <span>Add Task</span>
        </v-tooltip>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add Task</span>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-textarea v-model="description" label="Description"></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="addTask">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    dialog: false,
    description: ""
  }),
  methods: {
    ...mapActions(["fetchIncompleteTasks"]),
    addTask() {
      let description = this.description;
      axios
        .post("tasks", { description })
        .then(response => {
          this.fetchIncompleteTasks();
          this.dialog = false;
        })
        .catch(err => console.log(err));
    }
  }
};
</script>