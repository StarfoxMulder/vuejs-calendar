import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import moment from "moment-timezone";
import axios from "axios";

export default new Vuex.Store({
  state: {
    currentYear: parseInt(moment().format("YYYY")),
    currentMonth: parseInt(moment().format("MM")),
    eventFormPosX: 0,
    eventFormPosY: 0,
    eventFormActive: false,
    events: [
      {
        description: "Dinner with Brianna",
        date: moment("2018-05-17", "YYYY-MM-DD")
      },
      {
        description: "Interview with Cody",
        date: moment("2018-05-20", "YYYY-MM-DD")
      },
      {
        description: "Dentist appointment",
        date: moment("2018-05-22", "YYYY-MM-DD")
      }
    ],
    eventFormDate: moment()
  },
  mutations: {
    setCurrentMonth(state, payload) {
      state.currentMonth = payload;
    },
    setCurrentYear(state, payload) {
      state.currentYear = payload;
    },
    eventFormPos(state, payload) {
      state.eventFormPosX = payload.x;
      state.eventFormPosY = payload.y;
    },
    eventFormActive(state, payload) {
      state.eventFormActive = payload;
    },
    addEvent(state, payload) {
      let obj = {
        description: payload,
        date: state.eventFormDate
      };
      state.events.push(obj);
      axios.post("/add_event", obj);
    },
    eventFormDate(state, payload) {
      state.eventFormDate = payload;
    }
  }
});
