<template>
  <v-container>
    <v-list>
      <v-list-tile v-for="task in getTasks" :key="task.id">
        <v-list-tile-content>{{task.description}}</v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
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
