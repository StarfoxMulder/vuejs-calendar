<template>

  <div>
    <div id="header">
      <div><h1>Vue.js Calendar</h1></div>
      <div><current-month></current-month></div>
    </div>
    <div id="day-bar">
      <div>Mon</div>
      <div>Tue</div>
      <div>Wed</div>
      <div>Thu</div>
      <div>Fri</div>
      <div>Sat</div>
      <div>Sun</div>
    </div>
    <div id="calendar">    
      <div v-for="week in weeks" class="calendar-week">
        <!-- Remeber, : is shorthand for v-bind -->
        <calendar-day v-for="day in week" :day="day"></calendar-day>
      </div>
    </div>
    <event-form></event-form>
  </div>

</template>
<script>
import CalendarDay from "./CalendarDay.vue";
import CurrentMonth from "./CurrentMonth.vue";
import EventForm from "./EventForm.vue";
export default {
  computed: {
    month() {
      return this.$store.state.currentMonth;
    },
    year() {
      return this.$store.state.currentYear;
    },
    days() {
      let days = [];
      // using moment to create the current day in a specific format
      let currentDay = this.$moment(`${this.year}-${this.month}-1`, "YYYY-M-D");
      do {
        // incrementing currentDay until we are no longer within the current month, each time pushing it to days.  Afterward days should be a single instance of moment containing each day within the current month.
        days.push(currentDay);
        currentDay = this.$moment(currentDay).add(1, "days");
      } while (currentDay.month() + 1 === this.month);
      // the month() method is 0 based (January == 0, February == 1, etc) so we need to increase the value by 1 so it corresponds to the human calendar numbering convention

      // We need to add 'buffer days' to the calendar for prev/next month in order to fill the standard 5x7 calendar template

      // resetting currentDay to be the first day of the current month, then subtracting until the first day of the calendar is a Monday.  The day() method is 0 based on Sunday, so Monday == 1
      currentDay = this.$moment(days[0]);

      if (currentDay.day() !== 1) {
        do {
          currentDay = this.$moment(currentDay).subtract(1, "days");
          days.unshift(currentDay);
        } while (currentDay.day() !== 1);
      }

      currentDay = this.$moment(days[days.length - 1]);

      if (currentDay.day() !== 0) {
        do {
          currentDay = this.$moment(currentDay).add(1, "days");
          days.push(currentDay);
        } while (currentDay.day() !== 0);
      }
      return days;
    },
    weeks() {
      // creating a multi-dimensional 5x7 array by pushing days into the week array until wee.length === 7, then pushing week into weeks[] and emptying week[] to start the next week.
      let weeks = [];
      let week = [];

      for (let day of this.days) {
        week.push(day);
        if (week.length === 7) {
          weeks.push(week);
          week = [];
        }
      }
      return weeks;
    }
  },
  components: {
    CalendarDay,
    CurrentMonth,
    EventForm
  }
};
</script>
