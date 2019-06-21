<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-tooltip top>
          <v-icon small class="mt-2" v-on="on" slot="activator">edit</v-icon>
          <span>Edit Task</span>
        </v-tooltip>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Edit Task</span>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-textarea v-model="description" label="Description"></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="saveTask">Save</v-btn>
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
  created() {
    this.description = this.$props.task.description;
  },
  props: ["task"],
  methods: {
    ...mapActions(["fetchIncompleteTasks"]),
    async saveTask() {
      let description = this.description;
      let taskId = this.$props.task._id;
      try {
        await axios.patch(`tasks/${taskId}`, { description });
        await this.fetchIncompleteTasks();
        this.dialog = false;
        this.description = "";
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>