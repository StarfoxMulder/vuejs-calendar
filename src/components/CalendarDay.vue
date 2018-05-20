<template>
    <div :class="classObject" @click="captureClick">{{ day.format('D') }}</div>
</template>
<script>
export default {
  props: ["day"],
  computed: {
    classObject() {
      let today = this.day.isSame(this.$moment(), "day");
      return {
        // including the class day on all instances of CalendarDay, but conditionally adding the classes 'today' and 'past' based on their relation to the current day/month
        day: true,
        today,
        past: this.day.isSameOrBefore(this.$moment(), "day") && !today
      };
    }
  },
  methods: {
    captureClick(e) {
      this.$store.commit("eventFormPos", { x: e.clientX, y: e.clientY });
      this.$store.commit("eventFormActive", true);
    }
  }
};
</script>
